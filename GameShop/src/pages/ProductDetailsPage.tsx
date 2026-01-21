import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getProduct, products } = useProducts();
    const product = getProduct(id || '');

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Producto no encontrado</h2>
                <Link to="/catalog">
                    <Button variant="primary">Volver al Catálogo</Button>
                </Link>
            </div>
        );
    }

    const { addToCart } = useCart();
    const { currentUser, toggleWishlist } = useAuth();

    const handleAddToCart = () => {
        addToCart(product);
        alert('¡Producto añadido al carrito!');
    };

    // Related Products Logic
    const relatedProducts = products
        .filter(p => p.id !== product.id && !p.isPreorder && (p.platforms.some(pl => product.platforms.includes(pl)) || p.type === product.type))
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/catalog" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Volver
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Section */}
                <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                    {product.isNew && (
                        <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-black font-bold px-3 py-1 rounded shadow-lg animate-pulse">
                            NUEVO LANZAMIENTO
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {product.platforms.map(p => (
                                <span key={p} className="px-2 py-0.5 rounded text-xs font-bold bg-gray-700 text-white">
                                    {p}
                                </span>
                            ))}
                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${product.type === 'Digital' ? 'bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)]' : 'bg-orange-500/20 text-orange-400'}`}>
                                {product.type}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-end gap-4 border-b border-gray-700 pb-6">
                        <div className="flex flex-col">
                            {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${product.originalPrice.toLocaleString('es-CL')}
                                </span>
                            )}
                            <span className="text-4xl font-bold text-[var(--color-accent)]">
                                ${product.price.toLocaleString('es-CL')}
                            </span>
                        </div>
                        {product.stock < 10 && (
                            <span className="text-red-500 font-bold mb-2 animate-bounce">
                                ¡Solo quedan {product.stock} unidades!
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {product.description || "Descripción no disponible para este producto. Próximamente más detalles."}
                        </p>
                    </div>

                    {/* Features Grid (Mock) */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check size={16} className="text-[var(--color-accent)]" />
                            Garantía Oficial
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check size={16} className="text-[var(--color-accent)]" />
                            Entrega Inmediata
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check size={16} className="text-[var(--color-accent)]" />
                            Soporte 24/7
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Check size={16} className="text-[var(--color-accent)]" />
                            Pago Seguro
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            size="lg"
                            className="flex-1 flex items-center justify-center gap-2 text-lg"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={24} />
                            Añadir al Carrito
                        </Button>
                        <div className="flex gap-4">
                            <Button
                                variant={currentUser?.wishlist?.includes(product.id) ? "primary" : "secondary"}
                                size="lg"
                                className="px-4"
                                onClick={() => currentUser ? toggleWishlist(product.id) : alert("Inicia sesión para guardar favoritos")}
                            >
                                <Heart size={24} fill={currentUser?.wishlist?.includes(product.id) ? "currentColor" : "none"} />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-4"
                                onClick={() => alert('¡Enlace copiado al portapapeles!')}
                            >
                                <Share2 size={24} />
                            </Button>
                        </div>
                    </div>

                    {product.type === 'Digital' && (
                        <Card className="bg-blue-900/20 border-blue-500/30 p-4">
                            <p className="text-sm text-blue-200">
                                <strong>⚡ Entrega Digital:</strong> Recibirás el código de activación en tu correo electrónico y perfil inmediatamente después de la compra.
                            </p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-800 pt-12 animate-fade-in-up">
                    <h2 className="text-3xl font-display font-bold mb-8 text-white">
                        Podría interesarte
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(related => (
                            <Card key={related.id} className="group overflow-hidden hover:border-[var(--color-accent)] transition-all">
                                <Link to={`/product/${related.id}`} className="block">
                                    <div className="aspect-square overflow-hidden rounded mb-3">
                                        <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={related.title} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 truncate text-white">{related.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[var(--color-accent)] font-bold">${related.price.toLocaleString('es-CL')}</p>
                                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{related.platforms.join(', ')}</span>
                                    </div>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
