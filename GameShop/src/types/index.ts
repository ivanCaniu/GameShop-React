export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number; // For strikethrough logic
    platforms: Array<'PS5' | 'PS4' | 'Xbox' | 'Switch' | 'PC'>;
    type: 'Physical' | 'Digital';
    image: string;
    isNew?: boolean;
    isPreorder?: boolean;
    releaseDate?: string;
    stock: number;
    description?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface OrderItem extends CartItem {
    digitalCode?: string; // Generated code for digital items
}

export interface Order {
    id: string;
    date: string;
    total: number;
    items: OrderItem[];
    status: 'completed' | 'pending';
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role?: 'user' | 'admin';
    orders: Order[];
    wishlist?: string[]; // Array of product IDs
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    date: string;
}

export interface Coupon {
    code: string;
    type: 'percentage' | 'fixed';
    value: number; // e.g. 20 for 20% or 5000 for $5.000
    minOrderValue?: number;
    description: string;
}
