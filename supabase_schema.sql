-- ==========================================
-- Fattah Wedding Organizer - Supabase Setup Script
-- Paste dan Run script ini di Supabase SQL Editor
-- ==========================================

-- 1. ENUM TYPES
create type user_role as enum ('admin', 'worker', 'client');
create type bundle_category as enum ('wedding', 'birthday', 'cultural', 'corporate');
create type reservation_type as enum ('wedding', 'birthday', 'cultural', 'corporate', 'other');
create type reservation_status as enum ('pending_staffing', 'confirmed', 'completed', 'cancelled');
create type payment_status as enum ('unpaid', 'dp_paid', 'paid');
create type assignment_status as enum ('assigned', 'removed_by_admin', 'cancel_requested');
create type payment_method as enum ('bank_transfer', 'e_wallet');
create type payment_type as enum ('dp', 'full');

-- 2. TABEL PROFILES (1:1 dengan auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'client',
  full_name text not null,
  username text unique,
  email text,
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_profiles_role on profiles (role);

-- 3. TABEL WORKER_DETAILS (Lengkap dengan Status ON/OFF Availability)
create table worker_details (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references profiles(id) on delete cascade,
  birth_date date,
  birth_place text,
  gender text check (gender in ('male', 'female')),
  last_education text,
  profile_photo_url text,
  contact_email text,
  contact_phone text,
  is_available boolean not null default true, -- Toggle Status ON (Available) / OFF (Unavailable)
  updated_at timestamptz not null default now()
);

-- 4. TABEL BUNDLES & BUNDLE_FEATURES
create table bundles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category bundle_category not null,
  price numeric(12,2) not null,
  description text,
  image_url text,
  is_popular boolean not null default false,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table bundle_features (
  id uuid primary key default gen_random_uuid(),
  bundle_id uuid not null references bundles(id) on delete cascade,
  label text not null,
  is_included boolean not null default true,
  display_order int not null default 0
);

-- 5. TABEL RESERVATIONS
create table reservations (
  id uuid primary key default gen_random_uuid(),
  ref_code text unique not null,
  client_id uuid references profiles(id),
  bundle_id uuid references bundles(id),
  full_name text not null,
  phone text not null,
  email text not null,
  reservation_type reservation_type not null,
  workers_needed int not null default 1,
  notes text,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  guest_count int,
  status reservation_status not null default 'pending_staffing',
  payment_status payment_status not null default 'unpaid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_reservations_event_date on reservations (event_date);
create index idx_reservations_client_id on reservations (client_id);

-- 6. TABEL EVENT_WORKERS
create table event_workers (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations(id) on delete cascade,
  worker_id uuid not null references profiles(id) on delete cascade,
  role_needed text,
  status assignment_status not null default 'assigned',
  assigned_at timestamptz not null default now(),
  removed_by uuid references profiles(id),
  removed_reason text,
  unique (reservation_id, worker_id)
);

-- 7. TABEL PAYMENTS (Manual Photo Proof & Admin Notes)
create table payments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations(id) on delete cascade,
  total_amount numeric(12,2) not null,
  dp_amount numeric(12,2),
  payment_type payment_type,
  method payment_method,
  is_postponed boolean not null default false,
  dp_due_date date,
  full_due_date date,
  paid_at timestamptz,
  proof_url text,                     -- URL foto/screenshot bukti pembayaran
  admin_notes text,                   -- Catatan verifikasi admin
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_payments_reservation_id on payments (reservation_id);

-- 8. TABEL FEEDBACK
create table feedback (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id),
  reservation_id uuid references reservations(id),
  message text not null,
  rating int check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

-- 9. HELPER FUNCTIONS & RPC
create or replace function is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Trigger Otomatis buat Profile saat User SignUp Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'client'),
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RPC Function: claim_event (Validasi bentrok tanggal 1 worker 1 event)
create or replace function claim_event(
  p_reservation_id uuid,
  p_worker_id uuid,
  p_role_needed text default null
)
returns event_workers
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_date date;
  v_conflict_count int;
  v_slots_taken int;
  v_slots_needed int;
  v_result event_workers;
begin
  if auth.uid() is distinct from p_worker_id then
    raise exception 'not_allowed: cannot claim on behalf of another worker';
  end if;

  select event_date into v_event_date
  from reservations
  where id = p_reservation_id;

  if v_event_date is null then
    raise exception 'reservation_not_found';
  end if;

  select count(*) into v_conflict_count
  from event_workers ew
  join reservations r on r.id = ew.reservation_id
  where ew.worker_id = p_worker_id
    and ew.status = 'assigned'
    and r.event_date = v_event_date
    and ew.reservation_id <> p_reservation_id;

  if v_conflict_count > 0 then
    raise exception 'schedule_conflict: worker already assigned on this date';
  end if;

  select workers_needed into v_slots_needed
  from reservations where id = p_reservation_id;

  select count(*) into v_slots_taken
  from event_workers
  where reservation_id = p_reservation_id and status = 'assigned';

  if v_slots_taken >= v_slots_needed then
    raise exception 'event_full: no slots remaining';
  end if;

  insert into event_workers (reservation_id, worker_id, role_needed, status)
  values (p_reservation_id, p_worker_id, p_role_needed, 'assigned')
  returning * into v_result;

  return v_result;
end;
$$;

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
alter table profiles enable row level security;
alter table worker_details enable row level security;
alter table bundles enable row level security;
alter table bundle_features enable row level security;
alter table reservations enable row level security;
alter table event_workers enable row level security;
alter table payments enable row level security;
alter table feedback enable row level security;

-- Profiles Policies
create policy "Public read profiles" on profiles for select using (true);
create policy "User edit self or admin edit all" on profiles for update using (auth.uid() = id or is_admin());
create policy "Admin insert profiles" on profiles for insert with check (is_admin() or auth.uid() = id);

-- Worker Details Policies
create policy "Worker read self or admin read all" on worker_details for select using (is_admin() or profile_id = auth.uid());
create policy "Worker update self" on worker_details for update using (profile_id = auth.uid());
create policy "Worker insert self" on worker_details for insert with check (profile_id = auth.uid());

-- Bundles & Features Policies
create policy "Public read active bundles" on bundles for select using (true);
create policy "Admin manage bundles" on bundles for all using (is_admin());
create policy "Public read bundle features" on bundle_features for select using (true);
create policy "Admin manage bundle features" on bundle_features for all using (is_admin());

-- Reservations Policies
create policy "Admin full access reservations" on reservations for all using (is_admin());
create policy "Client view own reservations" on reservations for select using (client_id = auth.uid());
create policy "Client insert reservation" on reservations for insert with check (client_id = auth.uid());
create policy "Worker view reservations" on reservations for select using (true);

-- Event Workers Policies
create policy "Admin full access event_workers" on event_workers for all using (is_admin());
create policy "Worker view event_workers" on event_workers for select using (worker_id = auth.uid() or is_admin());
create policy "Worker update own status" on event_workers for update using (worker_id = auth.uid());

-- Payments & Feedback Policies
create policy "Admin full access payments" on payments for all using (is_admin());
create policy "Client view payments" on payments for select using (exists (select 1 from reservations r where r.id = payments.reservation_id and r.client_id = auth.uid()));
create policy "Client insert/update payments" on payments for update using (exists (select 1 from reservations r where r.id = payments.reservation_id and r.client_id = auth.uid()));

create policy "Admin view all feedback" on feedback for select using (is_admin());
create policy "Client create feedback" on feedback for insert with check (client_id = auth.uid());
