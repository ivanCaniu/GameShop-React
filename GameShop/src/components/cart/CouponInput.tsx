import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const CouponInput = () => {
    const { applyCoupon, removeCoupon, appliedCoupon, couponError } = useCart();
    const [code, setCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;
        applyCoupon(code);
    };

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-300">
                <Tag size={16} className="text-[var(--color-accent)]" />
                <span>¿Tienes un cupón?</span>
            </div>

            {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 p-3 rounded">
                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <div>
                            <span className="font-bold text-green-400 block">{appliedCoupon.code}</span>
                            <span className="text-xs text-green-300">{appliedCoupon.description}</span>
                        </div>
                    </div>
                    <button onClick={() => { removeCoupon(); setCode(''); }} className="text-gray-400 hover:text-white">
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Ingresa tu código"
                        className="w-full bg-black/20 border border-gray-700 rounded p-2 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none uppercase placeholder-gray-600"
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        className="absolute right-1 top-1 h-8 text-xs bg-gray-700 hover:bg-gray-600"
                        disabled={!code}
                    >
                        Aplicar
                    </Button>
                </form>
            )}

            {couponError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <X size={12} /> {couponError}
                </p>
            )}
        </div>
    );
};

export default CouponInput;
