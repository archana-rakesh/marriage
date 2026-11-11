import type { WeddingConfig, GuestWish } from '../types/invitation';

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  groomName: 'Rakesh',
  brideName: 'Archana',
  groomTitle: 'Son of Mr. Murugan & Mrs. Sujatha',
  brideTitle: 'Daughter of Mr. Nadarajan & Mrs. Sushama',
  groomParents: 'Mr. Murugan & Mrs. Sujatha',
  brideParents: 'Mr. Nadarajan & Mrs. Sushama',
  weddingDate: '2026-11-29T10:30:00',
  weddingTimeFormatted: 'Sunday, November 29, 2026',
  tagline: 'Together With Their Families',
  welcomeMessage: 'We request the honour of your presence at the celebration of our sacred marriage union.',
  coupleBio: 'Two hearts, two souls, one beautiful journey starting forever.',
  howWeMet: 'With the blessings of our families, we take our step together into a lifetime of happiness, love, and togetherness.',
  groomBio: 'Gentle, loving, and ambitious.',
  brideBio: 'Graceful, creative, and joyful.',
  groomPhoto: 'images/groom.jpg',
  bridePhoto: 'images/bride.jpg',
  coupleHeroPhoto: 'images/couple-dark.jpg',
  events: [
    {
      id: 'muhurtham',
      title: 'Sacred Wedding Ceremony (Muhurtham)',
      subtitle: 'The Shubh Muhurtham',
      date: 'Sunday, November 29, 2026',
      time: '10:30 AM (Auspicious Muhurtham)',
      location: 'Siva Sakthi Auditorium',
      address: 'Kaliyakkavilai',
      mapUrl: 'https://maps.app.goo.gl/eRbNHjLbFMDdgQT49',
      dressCode: 'Royal Traditional Indian Attire',
      iconName: 'sparkles'
    },
    {
      id: 'reception',
      title: 'Grand Wedding Reception',
      subtitle: 'Evening Celebrations & Dinner',
      date: 'Sunday, November 29, 2026',
      time: '05:30 PM Onwards',
      location: 'The Nest & Meadows',
      address: 'Nagercoil',
      mapUrl: 'https://maps.app.goo.gl/ch3mG7PE8BH4AMnF9',
      dressCode: 'Formal Evening Wear / Festive Traditional',
      iconName: 'glass'
    }
  ],
  venue: {
    name: 'Siva Sakthi Auditorium (Wedding) & The Nest & Meadows (Reception)',
    address: 'Wedding: Kaliyakkavilai | Reception: Nagercoil',
    city: 'Kaliyakkavilai & Nagercoil, Tamil Nadu',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0!2d77.14!3d8.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMTknMTIuMCJOIDc3wrAwOCczNi4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
    directionsUrl: 'https://maps.app.goo.gl/eRbNHjLbFMDdgQT49',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rakesh+%26+Archana+Wedding&dates=20261129T050000Z/20261129T180000Z&details=Celebrating+the+marriage+of+Rakesh+and+Archana&location=Siva+Sakthi+Auditorium+Kaliyakkavilai'
  },
  gallery: [
    {
      id: 'g1',
      url: 'images/couple.jpg',
      caption: 'Rakesh & Archana • Together in Harmony'
    },
    {
      id: 'g2',
      url: 'images/groom.jpg',
      caption: 'Rakesh • The Groom'
    },
    {
      id: 'g3',
      url: 'images/bride.jpg',
      caption: 'Archana • The Bride'
    }
  ],
  theme: 'royal-gold',
  bgMusicUrl: 'music/pookal_pookum_flute.mp3'
};

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w1',
    name: 'Uncle & Family',
    relation: 'Family',
    wish: 'Wishing Rakesh & Archana a blessed marriage filled with love, laughter, and lifelong togetherness!',
    timestamp: '2026-09-19T10:00:00'
  }
];
