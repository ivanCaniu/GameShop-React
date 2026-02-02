import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, Product, Coupon } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    subtotal: number;
    cartCount: number;
    applyCoupon: (code: string) => void;
    removeCoupon: () => void;
    appliedCoupon: Coupon | null;
    discountAmount: number;
    couponError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Cupones de Mock
const AVAILABLE_COUPONS: Coupon[] = [
    { code: 'VERANO2026', type: 'percentage', value: 20, description: '20% OFF de Verano' },
    { code: 'GAMER10', type: 'percentage', value: 10, description: '10% para Gamers' },
    { code: 'WELCOME5000', type: 'fixed', value: 5000, minOrderValue: 20000, description: '$5.000 de descuento en compras sobre $20.000' }
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);

    // Intentar cargar desde localStorage al montar
    useEffect(() => {
        const savedCart = localStorage.getItem('gameshop_cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Migración simple: si el ítem no tiene plataformas pero tiene plataforma, arreglarlo
                const migratedCart = parsedCart.map((item: any) => ({
                    ...item,
                    platforms: item.platforms || (item.platform ? [item.platform] : ['PS5'])
                }));
                setCart(migratedCart);
            } catch (error) {
                console.error('Error al analizar carrito desde almacenamiento local');
                localStorage.removeItem('gameshop_cart'); // Limpiar datos corruptos
            }
        }
    }, []);

    // Guardar en localStorage cuando cambie el carrito
    useEffect(() => {
        localStorage.setItem('gameshop_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity = 1) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        setAppliedCoupon(null);
        setCouponError(null);
    };

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    // Lógica de Cupones
    const applyCoupon = (code: string) => {
        setCouponError(null);
        const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());

        if (!coupon) {
            setCouponError('Cupón inválido');
            return;
        }

        if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
            setCouponError(`El pedido mínimo es $${coupon.minOrderValue.toLocaleString('es-CL')}`);
            return;
        }

        setAppliedCoupon(coupon);
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponError(null);
    };

    // Calcular Descuento
    let discountAmount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            discountAmount = subtotal * (appliedCoupon.value / 100);
        } else {
            discountAmount = appliedCoupon.value;
        }
    }

    // Validar que el descuento no exceda el total
    if (discountAmount > subtotal) discountAmount = subtotal;

    const cartTotal = subtotal - discountAmount;

    // Re-validar cupón si subtotla baja del mínimo (ej. ítem removido)
    useEffect(() => {
        if (appliedCoupon && appliedCoupon.minOrderValue && subtotal < appliedCoupon.minOrderValue) {
            setAppliedCoupon(null);
            setCouponError(`Cupón removido: pedido mínimo $${appliedCoupon.minOrderValue.toLocaleString('es-CL')}`);
        }
    }, [subtotal, appliedCoupon]);


    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        subtotal,
        cartCount,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        discountAmount,
        couponError
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
