import heroImg from '../../assets/images/Foto bersama.png';
import kakAna from '../../assets/images/kak Ana.png';
import kakAlipAtala from '../../assets/images/Kak alip dan atala.png';
import kakNopal from '../../assets/images/Kak nopal.png';
import kakAqilNala from '../../assets/images/kak Aqil dan nala.png';
import kakCila from '../../assets/images/kak Cila.png';
import kakRasya from '../../assets/images/kak rasya.png';
import kakRedho from '../../assets/images/Kak Redho.png';
import cloud1 from '../../assets/elemen/Cloud1.png';
import cloudGroup from '../../assets/elemen/group cloud.png';

// Shared hover zoom class for all crew cutout photos
export const HOVER_ZOOM = 'transition-transform duration-500 ease-out hover:scale-110';

// Hero section background
export const HERO_BG = heroImg;

// Stats section — crew cutout photos flanking the stats grid
// Layout: top = behind (lower z), bottom = front (higher z, overlaps top)
export const STATS_PHOTOS = {
  left: {
    back: { src: kakNopal, alt: 'Kak Nopal — Kru Fattah WO' },
    front: { src: kakAna, alt: 'Kak Ana — Kru Fattah WO' },
  },
  right: {
    back: { src: kakRedho, alt: 'Kak Redho — Kru Fattah WO' },
    front: { src: kakAlipAtala, alt: 'Kak Alip & Atala — Kru Fattah WO' },
  },
};

export const FEATURES_PHOTOS = {
  left: { src: kakAqilNala, alt: 'Kak Aqil & Nala — Kru Fattah WO' },
  right: { src: kakRasya, alt: 'Kak Rasya — Kru Fattah WO' },
};

export const CTA_PHOTO = { src: kakCila, alt: 'Kak Cila — Hubungi Kami' };

export const CREW_CLOUDS = {
  ana: cloud1,
  alipAtala: cloudGroup,
  aqilNala: cloudGroup,
  rasya: cloud1,
};
