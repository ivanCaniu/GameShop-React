import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types';
import Card from '../ui/Card';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to details page
        addToCart(product);
        alert('¡Producto añadido al carrito!');
    };

    const platformColors = {
        'PS5': 'bg-blue-600',
        'PS4': 'bg-blue-800',
        'Xbox': 'bg-green-600',
        'Switch': 'bg-red-600',
        'PC': 'bg-gray-600'
    };

    const typeColor = product.type === 'Digital' ? 'text-[var(--color-neon-blue)]' : 'text-orange-400';

    const { currentUser, toggleWishlist } = useAuth();
    const isWishlisted = currentUser?.wishlist?.includes(product.id);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Inicia sesión para guardar favoritos ❤️");
            return;
        }
        toggleWishlist(product.id);
    };

    return (
        <Card className="h-full flex flex-col group relative" hoverEffect>
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Platform Badge */}
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap max-w-[80%]">
                    {product.platforms.map(p => (
                        <span key={p} className={`px-2 py-1 text-xs font-bold text-white rounded shadow-md ${platformColors[p] || 'bg-gray-500'}`}>
                            {p}
                        </span>
                    ))}
                </div>

                {/* New Badge */}
                {product.isNew && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold bg-[var(--color-accent)] text-black rounded shadow-md animate-pulse">
                        NUEVO
                    </span>
                )}

                {/* Quick Actions Overlay (Visible on Hover) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        className={`rounded-full p-3 transition-colors ${isWishlisted ? 'text-red-500 bg-white' : ''}`}
                        onClick={handleWishlist}
                    >
                        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        className="rounded-full p-3"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={20} />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${typeColor}`}>
                        {product.type === 'Digital' ? '⚡ Digital Key' : '📦 Físico'}
                    </span>
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="text-xs text-red-500 font-bold">¡Quedan {product.stock}!</span>
                    )}
                </div>

                <Link to={`/product/${product.id}`} className="hover:text-[var(--color-accent)] transition-colors">
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{product.title}</h3>
                </Link>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                                ${product.originalPrice.toLocaleString('es-CL')}
                            </span>
                        )}
                        <span className="text-xl font-bold text-white">
                            ${product.price.toLocaleString('es-CL')}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
