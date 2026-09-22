# Fattah Wedding Organizer

Platform manajemen wedding organizer berbasis web yang menghubungkan tiga pihak utama dalam satu sistem: admin, worker, dan client. Aplikasi ini dirancang untuk mempermudah pengelolaan jadwal, penugasan pekerja, reservasi acara, status pembayaran, dan pengelolaan bundle layanan.

Proyek ini dibuat sebagai final project Frontend Development dan dibuat dengan React + Vite, Tailwind CSS, Supabase, serta arsitektur modular agar mudah dikembangkan dan dimodifikasi secara mandiri.

---

## 1. Tujuan Proyek

Fattah Wedding Organizer hadir untuk mengatasi masalah umum yang sering terjadi pada wedding organizer, yaitu:

- admin kesulitan menghubungi worker satu per satu untuk mengecek ketersediaan
- jadwal kerja worker sering bentrok tanpa kontrol yang jelas
- client dapat melakukan reservasi secara online dan melihat bundle yang tersedia

Solusi dari aplikasi ini adalah sistem yang terintegrasi dan berbasis role, sehingga setiap pihak hanya melihat dan mengelola kebutuhan mereka masing-masing.

---

## 2. Fitur Utama

### Admin
- dashboard overview
- manajemen worker
- pencarian worker berdasarkan nama/username
- melihat status akun dan status ketersediaan kerja worker
- menambah worker baru
- melihat detail worker
- mengatur jadwal event dan penugasan pekerja
- memvalidasi bukti pembayaran client
- mengubah status pembayaran menjadi unpaid, dp_paid, atau paid
- mengelola bundle dan fitur paket
- melihat feedback dari client

### Worker
- dashboard personal
- update biodata dan kontak
- toggle status kerja ON/OFF (available / unavailable)
- melihat daftar pekerjaan yang tersedia
- mengklaim event sesuai ketersediaan jadwal
- melihat jadwal kerja sendiri

### Client
- registrasi dan login
- membuat reservasi acara baru
- memilih bundle layanan
- melihat status reservasi
- unggah bukti transfer pembayaran
- melihat status pembayaran secara real time
- melihat jadwal acara milik client sendiri

---

## 3. Teknologi yang Digunakan

- React 19
- Vite
- React Router
- Tailwind CSS
- Zustand
- TanStack Query
- React Hook Form + Zod
- Framer Motion
- Lucide React
- Supabase Auth, Database, Storage

---

## 4. Struktur Proyek

```bash
src/
├── assets/
├── components/
│   ├── common/
│   └── ui/
├── features/
│   ├── auth/
│   ├── bundle/
│   ├── feedback/
│   ├── payment/
│   ├── reservation/
│   ├── schedule/
│   ├── worker-management/
│   └── worker-profile/
├── hooks/
├── layouts/
├── lib/
│   └── supabase/
├── pages/
│   ├── admin/
│   ├── client/
│   ├── public/
│   └── worker/
├── routes/
├── store/
├── App.jsx
├── main.jsx
└── index.css
```

Penjelasan penting:
- folder features dipisah berdasarkan domain bisnis
- logic data disimpan di hooks dan lib/supabase/queries
- UI hanya fokus pada tampilan dan interaksi
- route dan guard role dikelola di src/routes/router.jsx

---

## 5. Persyaratan Sistem

Sebelum menjalankan proyek, pastikan perangkat sudah memiliki:

- Node.js 18+
- npm atau pnpm
- akun Supabase
- editor seperti VS Code

---

## 6. Setup Project

### 1. Clone repository

```bash
git clone <url-repository>
cd Fattah-Wo-App
```

### 2. Install dependency

```bash
npm install
```

### 3. Setup environment variable

Buat file .env di root project dengan isi berikut:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Contoh:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

> File .env wajib dibuat agar aplikasi dapat terhubung ke Supabase.

---

## 7. Menjalankan Aplikasi

### Mode development

```bash
npm run dev
```

Setelah itu, buka local URL yang muncul di terminal, biasanya:

```bash
http://localhost:5173
```

### Build production

```bash
npm run build
```

### Preview hasil build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 8. Konfigurasi Supabase

Project ini menggunakan Supabase untuk:
- autentikasi pengguna
- data profil user
- database transaksi reservasi
- storage foto bukti pembayaran
- storage foto profil dan bundle

Beberapa hal yang perlu dipersiapkan di Supabase:
- membuat project baru
- menambahkan tabel skema
- membuat storage bucket seperti avatars, bundle-images, payment-proofs
- mengaktifkan Auth dan mengatur role user
- memastikan RLS dan query sesuai kebutuhan aplikasi

---

## 9. Alur Penggunaan Website

### Client
1. Client membuka landing page lalu memilih menu login atau register.
2. Setelah berhasil daftar/login, client masuk ke halaman reservasi.
3. Client memilih paket bundle yang tersedia, kemudian mengisi data acara dan detail kebutuhan.
4. Setelah reservasi dibuat, client dapat melihat status reservasi di halaman jadwal atau halaman reservasi.
5. Client mengunggah bukti transfer pada halaman pembayaran.
6. Admin akan mengecek dan memvalidasi bukti pembayaran.
7. Client dapat melihat status pembayaran yang berubah menjadi unpaid, dp_paid, atau paid.

### Untuk Worker
1. Worker login ke aplikasi melalui akun yang dibuat oleh admin.
2. Worker mengisi biodata dan mengatur status ketersediaan kerja.
3. Worker melihat daftar event atau pekerjaan yang tersedia.
4. Worker memilih event yang sesuai dengan jadwalnya.
5. Worker dapat melihat jadwal kerja sendiri dan memantau tugas yang sudah diterima.

### Untuk Admin
1. Admin login dan masuk ke dashboard utama.
2. Admin mengelola data worker, termasuk menambah, melihat detail, dan mengatur status aktif atau tidak aktif.
3. Admin meninjau reservasi dan mengelola jadwal event.
4. Admin menugaskan worker ke event tertentu dan memastikan tidak terjadi bentrok jadwal.
5. Admin mengecek bukti pembayaran dari client dan melakukan update status pembayaran.
6. Admin dapat mengelola bundle, mengelola feedback, dan memantau performa acara secara keseluruhan.

---

## 10. Role dan Alur Bisnis

### Client
Client dapat melakukan registrasi sendiri, lalu membuat reservasi baru. Setelah reservasi dibuat, client akan mengunggah bukti transfer pada halaman pembayaran. Status pembayaran akan diperiksa oleh admin.

### Worker
Worker dibuat oleh admin. Setelah login, worker bisa mengisi biodata, mengatur ketersediaan kerja, dan menerima event yang sesuai dengan jadwalnya. Sistem juga harus menjaga agar worker tidak bentrok pekerjaan di hari yang sama.

### Admin
Admin memiliki kendali penuh atas pengelolaan worker, jadwal, pembayaran, bundle, dan feedback. Admin menjadi titik verifikasi utama dalam proses bisnis.

---

## 11. Aturan Bisnis Penting

Beberapa aturan utama harus dipatuhi saat pengembangan lanjut:

1. Client tidak boleh mengubah status pembayaran sendiri.
2. Hanya admin yang dapat memverifikasi bukti transfer.
3. Worker tidak boleh memiliki tugas bentrok pada tanggal yang sama.
4. Semua data dari Supabase harus dikelola melalui query di lib/supabase/queries, bukan langsung dari komponen.
5. UI harus tetap mobile responsive.
6. Loading state harus menggunakan skeleton agar UX lebih rapi.

---

## 12. Panduan Modifikasi Mandiri

Project ini dibuat agar dapat dimodifikasi secara mandiri tanpa harus membongkar seluruh struktur. Berikut panduan pengembangannya:

### A. Jika ingin menambah fitur baru
- buat fitur baru di folder src/features/<nama-fitur>
- pisahkan komponen UI dan logic business
- gunakan hooks untuk query/mutation
- simpan data Supabase di lib/supabase/queries

### B. Jika ingin mengubah tampilan
- sesuaikan komponen di src/components/ui dan src/components/common
- cek file DESIGN.md untuk gaya visual yang telah ditetapkan
- hindari mengubah style global tanpa mempertimbangkan konsistensi tema

### C. Jika ingin menambah halaman baru
- buat page baru di src/pages/<role>/
- daftarkan route di src/routes/router.jsx
- sesuaikan ProtectedRoute sesuai role yang dibutuhkan

### D. Jika ingin menambah tabel/database baru
- update skema di SUPABASE.md
- buat migration/query di Supabase
- sesuaikan penggunaan data di frontend

### E. Jika ingin mengubah flow bisnis
- fokus pada aturan domain dan validasi di backend/database
- jangan hanya mengandalkan validasi di frontend, karena user bisa bypass UI
- pastikan logic penting seperti jadwal bentrok dan status pembayaran dipastikan aman di database

---

## 13. Catatan Pengembangan

- Proyek ini dibuat untuk kebutuhan final project, jadi struktur sudah dirancang agar mudah dipahami dan dikembangkan lebih lanjut.
- Dokumentasi ini berfungsi sebagai referensi awal ketika Anda ingin menyesuaikan fitur, memperbaiki flow, atau menambah modul baru.
- Setelah project berjalan, Anda bisa menambahkan fitur lanjutan seperti notifikasi, dashboard analitik, export laporan, atau integrasi external service.

---

## 14. Penutup

Fattah Wedding Organizer adalah project full-stack-like frontend yang kompleks namun tetap terstruktur dan mudah dikembangkan. Dengan arsitektur modular dan dokumentasi yang lengkap, project ini bisa terus dikembangkan secara mandiri tanpa kehilangan konsistensi fitur dan logika bisnis.

---

## 15. Quick Start

```bash
npm install
# isi variable Supabase di .env
npm run dev
```

Jika file .env belum dibuat, buat file .env sesuai format yang sudah dijelaskan di bagian setup.
