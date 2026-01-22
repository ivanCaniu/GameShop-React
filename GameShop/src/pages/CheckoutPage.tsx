import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const CheckoutPage = () => {
    const { cart, cartTotal, clearCart, subtotal, discountAmount } = useCart();
    const { currentUser, addOrder } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bank'>('bank');

    const handleDetailsSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };



    const handlePaymentSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 1. Process Order Mock
        const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const date = new Date().toLocaleDateString('es-CL');

        // 2. Generate Digital Codes
        const orderItems = cart.map(item => {
            if (item.type === 'Digital') {
                return {
                    ...item,
                    digitalCode: `${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
                };
            }
            return item;
        });

        const newOrder = {
            id: orderId,
            date,
            total: cartTotal,
            items: orderItems,
            status: 'completed' as const
        };

        // 3. Save to User Profile
        await addOrder(newOrder);

        // 4. Clear and Redirect
        setTimeout(() => {
            clearCart();
            setStep('success');
        }, 1500);
    };

    if (step === 'success') {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-lg">
                <Card className="p-10 border-green-500/50 bg-green-900/10">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-black" />
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-4">¡Pedido Confirmado!</h2>
                    <p className="text-gray-300 mb-8">
                        Gracias por tu compra. Hemos enviado los detalles (y tus keys digitales si corresponde) a tu correo:
                        <span className="block font-bold text-white mt-2">{currentUser?.email}</span>
                    </p>
                    <Link to="/profile">
                        <Button variant="primary">Ver mi Pedido</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-display font-bold mb-8">Finalizar Compra</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                    {step === 'details' && (
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-4">Datos de Envío / Facturación</h2>
                            <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Nombre" placeholder="Tu nombre" required defaultValue={currentUser?.displayName?.split(' ')[0] || ''} />
                                    <Input label="Apellido" placeholder="Tu apellido" required />
                                </div>
                                <Input label="Email" type="email" value={currentUser?.email || ''} readOnly className="opacity-50 cursor-not-allowed" />
                                <Input label="Teléfono" type="tel" placeholder="+56 9 1234 5678" required />
                                <Input label="Dirección (Solo productos físicos)" placeholder="Calle, Número, Depto" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Comuna" placeholder="Ej: Providencia" required />
                                    <Input label="Región" placeholder="Ej: Metropolitana" required />
                                </div>
                                <Button type="submit" className="w-full mt-4">Continuar al Pago</Button>
                            </form>
                        </Card>
                    )}

                    {step === 'payment' && (
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-6">Método de Pago</h2>
                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`p-4 rounded-lg border cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'bank' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-gray-700 hover:border-gray-500'}`}
                                >
                                    <Building size={24} className={paymentMethod === 'bank' ? 'text-[var(--color-accent)]' : 'text-gray-400'} />
                                    <div>
                                        <p className="font-bold">Transferencia Bancaria</p>
                                        <p className="text-xs text-gray-400">Banco Estado / Santander / Chile</p>
                                    </div>
                                    <div className="ml-auto w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center">
                                        {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />}
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`p-4 rounded-lg border cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-gray-500'}`}
                                >
                                    <CreditCard size={24} className={paymentMethod === 'paypal' ? 'text-blue-500' : 'text-gray-400'} />
                                    <div>
                                        <p className="font-bold">PayPal</p>
                                        <p className="text-xs text-gray-400">USD (Conversión automática)</p>
                                    </div>
                                    <div className="ml-auto w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center">
                                        {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-700">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg">Total a Pagar:</span>
                                        <span className="text-2xl font-bold text-[var(--color-accent)]">${cartTotal.toLocaleString('es-CL')}</span>
                                    </div>
                                    <Button type="submit" className="w-full" variant="primary">
                                        Confirmar Pedido
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep('details')}
                                        className="w-full mt-2 text-sm text-gray-400 hover:text-white"
                                    >
                                        Volver a datos
                                    </button>
                                </div>
                            </form>
                        </Card>
                    )}
                </div>

                {/* Summary Sidebar */}
                <div className="hidden md:block">
                    <Card className="p-6 sticky top-24">
                        <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Resumen de Compra</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 text-sm">
                                    <div className="w-12 h-12 bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold line-clamp-1">{item.title}</p>
                                        <p className="text-gray-400">x{item.quantity}</p>
                                    </div>
                                    <div className="font-medium">
                                        ${(item.price * item.quantity).toLocaleString('es-CL')}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 font-bold text-lg space-y-2">
                            <div className="flex justify-between text-sm text-gray-400 font-normal">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-sm text-green-400 font-normal">
                                    <span>Descuento</span>
                                    <span>- ${discountAmount.toLocaleString('es-CL')}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-gray-700">
                                <span>Total</span>
                                <span>${cartTotal.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
