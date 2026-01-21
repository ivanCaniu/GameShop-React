import type { Product } from '../types';

export const products: Product[] = [
    // --- PS5 ---
    {
        id: '1',
        title: 'God of War Ragnarök',
        price: 59990,
        originalPrice: 69990,
        platforms: ['PS5', 'PS4'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop', // Kratos-like vibe
        isNew: true,
        stock: 10,
        description: 'Kratos y Atreus deben viajar a cada uno de los Nueve Reinos en busca de respuestas.'
    },
    {
        id: '2',
        title: 'Spider-Man 2',
        price: 64990,
        platforms: ['PS5'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=800&auto=format&fit=crop', // Spider-like vibe
        stock: 99,
        isNew: true
    },
    {
        id: '3',
        title: 'Final Fantasy VII Rebirth',
        price: 54990,
        platforms: ['PS5'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1560252829-8432a2204c32?q=80&w=800&auto=format&fit=crop', // Fantasy sword
        stock: 5
    },
    {
        id: '4',
        title: 'Elden Ring: Shadow of the Erdtree',
        price: 35000,
        platforms: ['PS5', 'Xbox', 'PC'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop', // Dark fantasy
        stock: 50
    },
    // --- XBOX ---
    {
        id: '5',
        title: 'Halo Infinite',
        price: 29990,
        platforms: ['Xbox', 'PC'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1627856013091-fedf7bb0615b?q=80&w=800&auto=format&fit=crop', // Sci-fi armor
        stock: 8
    },
    {
        id: '6',
        title: 'Starfield',
        price: 45990,
        platforms: ['Xbox', 'PC'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', // Space
        stock: 99
    },
    // --- SWITCH ---
    {
        id: '7',
        title: 'Zelda: Tears of the Kingdom',
        price: 49990,
        platforms: ['Switch'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop', // Adventure
        stock: 12
    },
    {
        id: '8',
        title: 'Mario Kart 8 Deluxe',
        price: 39990,
        platforms: ['Switch'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=800&auto=format&fit=crop', // Racing
        stock: 99
    },
    // --- PC ---
    {
        id: '9',
        title: 'Cyberpunk 2077: Ultimate',
        price: 25000,
        platforms: ['PC', 'PS5', 'Xbox'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1533972724312-6a8506f478c5?q=80&w=800&auto=format&fit=crop', // Cyberpunk neon
        stock: 99,
        isNew: false
    },
    {
        id: '10',
        title: 'Baldur\'s Gate 3',
        price: 35000,
        platforms: ['PC', 'PS5', 'Xbox'],
        type: 'Digital',
        image: 'https://images.unsplash.com/photo-1642479755109-17387cc2694e?q=80&w=800&auto=format&fit=crop', // D&D dice/fantasy
        stock: 99
    },
    // --- PRE-ORDERS ---
    {
        id: '11',
        title: 'Resident Evil 9: Eclipse',
        price: 69990,
        platforms: ['PS5', 'Xbox', 'PC'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop', // Spooky
        stock: 999,
        isPreorder: true,
        releaseDate: '15 Oct 2026',
        description: 'La saga continúa en una isla remota donde el sol nunca sale.'
    },
    {
        id: '12',
        title: 'Grand Theft Auto VI',
        price: 79990,
        platforms: ['PS5', 'Xbox'],
        type: 'Physical',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=600&auto=format&fit=crop', // Miami
        stock: 999,
        isPreorder: true,
        releaseDate: 'Late 2026',
        description: 'Regresa a Vice City en la experiencia de mundo abierto más ambiciosa hasta la fecha.'
    }
];
