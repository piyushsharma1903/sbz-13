export interface Concert {
  id: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  description: string;
  genre: string;
  availableTickets: number;
}

export const concerts: Concert[] = [
  {
    id: '1',
    artist: 'Taylor Swift',
    date: '2025-06-15',
    time: '19:30',
    venue: 'Madison Square Garden',
    city: 'New York',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Taylor Swift brings her record-breaking Eras Tour to Madison Square Garden for an unforgettable night of music spanning her entire career.',
    genre: 'Pop',
    availableTickets: 250
  },
  {
    id: '2',
    artist: 'Kendrick Lamar',
    date: '2025-07-22',
    time: '20:00',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Pulitzer Prize-winning artist Kendrick Lamar performs his latest album along with classic hits in this highly anticipated show.',
    genre: 'Hip Hop',
    availableTickets: 180
  },
  {
    id: '3',
    artist: 'Billie Eilish',
    date: '2025-08-05',
    time: '19:00',
    venue: 'O2 Arena',
    city: 'London',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Grammy-winning artist Billie Eilish brings her unique sound and captivating performance to London in this worldwide tour.',
    genre: 'Alternative',
    availableTickets: 320
  },
  {
    id: '4',
    artist: 'The Weeknd',
    date: '2025-09-12',
    time: '20:30',
    venue: 'Scotiabank Arena',
    city: 'Toronto',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    description: 'Experience the cinematic world of The Weeknd as he performs his chart-topping hits in his hometown of Toronto.',
    genre: 'R&B',
    availableTickets: 200
  },
  {
    id: '5',
    artist: 'Coldplay',
    date: '2025-10-03',
    time: '19:30',
    venue: 'Allianz Parque',
    city: 'São Paulo',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Coldplay\'s Music of the Spheres World Tour continues with a spectacular show featuring their greatest hits and new material.',
    genre: 'Rock',
    availableTickets: 280
  },
  {
    id: '6',
    artist: 'Bad Bunny',
    date: '2025-11-18',
    time: '21:00',
    venue: 'Estadio Azteca',
    city: 'Mexico City',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Global superstar Bad Bunny returns to Mexico City for an electrifying performance of his latest hits.',
    genre: 'Reggaeton',
    availableTickets: 350
  }
];

export const marketTickets = [
  {
    id: 'm1',
    concertId: '1',
    seller: 'Alex Johnson',
    price: 220.00,
    section: 'Floor',
    row: 'C',
    seat: '15',
    listed: '2025-05-20'
  },
  {
    id: 'm2',
    concertId: '1',
    seller: 'Maria Garcia',
    price: 180.00,
    section: 'Lower Bowl',
    row: 'H',
    seat: '22',
    listed: '2025-05-22'
  },
  {
    id: 'm3',
    concertId: '3',
    seller: 'James Wilson',
    price: 145.00,
    section: 'Upper Level',
    row: 'B',
    seat: '8',
    listed: '2025-06-01'
  },
  {
    id: 'm4',
    concertId: '2',
    seller: 'Sarah Lee',
    price: 160.00,
    section: 'Floor',
    row: 'F',
    seat: '10',
    listed: '2025-06-05'
  }
];

export const userTickets = [
  {
    id: 'ut1',
    concertId: '5',
    purchaseDate: '2025-04-15',
    section: 'Floor',
    row: 'D',
    seat: '12',
    price: 139.99
  },
  {
    id: 'ut2',
    concertId: '3',
    purchaseDate: '2025-03-28',
    section: 'Lower Bowl',
    row: 'J',
    seat: '5',
    price: 129.99
  }
];