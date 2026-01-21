import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import Card from '../ui/Card';

const SearchBar = () => {
    const { products } = useProducts();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Filter products
    // Filter products
    const results = query.length >= 2
        ? products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) && !p.isPreorder).slice(0, 5)
        : [];

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (productId: string) => {
        setQuery('');
        setIsOpen(false);
        navigate(`/product/${productId}`);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-sm hidden md:block">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder-gray-500"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                {query && (
                    <button
                        onClick={() => { setQuery(''); setIsOpen(false); }}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in-up">
                    <Card className="p-0 overflow-hidden shadow-2xl border-gray-700 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {results.length > 0 ? (
                            <div>
                                <div className="p-2 text-xs font-bold text-gray-500 uppercase">Resultados</div>
                                {results.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelect(product.id)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-gray-800 last:border-0"
                                    >
                                        <img src={product.image} alt="" className="w-10 h-10 object-cover rounded bg-gray-800" />
                                        <div>
                                            <p className="text-sm font-bold text-white line-clamp-1">{product.title}</p>
                                            <p className="text-xs text-gray-400">
                                                {product.platforms.join(', ')} • ${product.price.toLocaleString('es-CL')}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No se encontraron juegos.
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
