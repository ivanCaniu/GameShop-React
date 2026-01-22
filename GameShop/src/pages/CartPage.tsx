import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CouponInput from '../components/cart/CouponInput';

const CartPage = () => {
    const { cart, removeFromCart, cartTotal, subtotal, discountAmount } = useCart();
    // Simplified for MVP: No quantity update logic yet, just removing.
    // handleQuantityChange logic would go here.

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-400 mb-8">Parece que aún no has agregado juegos.</p>
                <Link to="/catalog">
                    <Button variant="primary">Explorar Catálogo</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-display font-bold mb-8">Carrito de Compras</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <Card key={item.id} className="p-4 flex gap-4 items-center">
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />

                            <div className="flex-grow">
                                <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-[var(--color-accent)]">
                                    {item.title}
                                </Link>
                                <div className="text-sm text-gray-400">
                                    {item.platforms.join(', ')} • {item.type}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="font-bold text-lg">
                                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                                </span>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400">Cant: {item.quantity}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Resumen</h3>

                        <div className="mb-6">
                            <CouponInput />
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>Descuento</span>
                                    <span>- ${discountAmount.toLocaleString('es-CL')}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-400">
                                <span>Envío estimado</span>
                                <span>Gratis (Digital)</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-gray-700">
                                <span>Total</span>
                                <span className="text-[var(--color-accent)]">${cartTotal.toLocaleString('es-CL')}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="block w-full">
                            <Button variant="primary" className="w-full flex justify-center items-center gap-2">
                                Ir a Pagar <ArrowRight size={20} />
                            </Button>
                        </Link>

                        <div className="mt-4 flex gap-2 justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-70" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
