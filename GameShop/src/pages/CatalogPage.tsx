import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../components/shared/ProductCard';
import { useProducts } from '../context/ProductContext';
import Button from '../components/ui/Button';

const CatalogPage = () => {
    const { products, loading } = useProducts();
    const [searchParams] = useSearchParams();
    const initialFilter = searchParams.get('filter') || 'All';
    const [filterPlatform, setFilterPlatform] = useState<string>(initialFilter);
    const [filterType, setFilterType] = useState<string>('All');

    // Update filter when URL param changes
    useEffect(() => {
        const filterParam = searchParams.get('filter');
        if (filterParam) {
            setFilterPlatform(filterParam);
        }
    }, [searchParams]);

    const filteredProducts = products.filter(product => {
        const platformMatch = filterPlatform === 'All' || product.platforms.includes(filterPlatform as any);
        const typeMatch = filterType === 'All' || product.type === filterType;
        // Don't show pre-orders in the main catalog
        const isAvailable = !product.isPreorder;

        return platformMatch && typeMatch && isAvailable;
    });

    const categories = ['All', 'PS5', 'Xbox', 'Switch', 'PC'];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-display font-bold mb-8">Catálogo Completo</h1>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter size={20} />
                    <span className="font-bold uppercase tracking-wider text-sm">Filtros:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterPlatform(cat)}
                            className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${filterPlatform === cat
                                ? 'bg-[var(--color-accent)] text-black'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType('All')}
                        className={`px-3 py-1 rounded text-xs uppercase font-bold border ${filterType === 'All' ? 'border-[var(--color-neon-blue)] text-[var(--color-neon-blue)]' : 'border-gray-600 text-gray-500'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilterType('Physical')}
                        className={`px-3 py-1 rounded text-xs uppercase font-bold border ${filterType === 'Physical' ? 'border-[var(--color-neon-blue)] text-[var(--color-neon-blue)]' : 'border-gray-600 text-gray-500'}`}
                    >
                        Físicos
                    </button>
                    <button
                        onClick={() => setFilterType('Digital')}
                        className={`px-3 py-1 rounded text-xs uppercase font-bold border ${filterType === 'Digital' ? 'border-[var(--color-neon-blue)] text-[var(--color-neon-blue)]' : 'border-gray-600 text-gray-500'}`}
                    >
                        Digitales
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading
                    ? Array(8).fill(0).map((_, i) => <ProductCard key={i} loading />)
                    : filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500">No se encontraron productos con estos filtros.</p>
                    <Button variant="outline" className="mt-4" onClick={() => { setFilterPlatform('All'); setFilterType('All'); }}>
                        Limpiar Filtros
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CatalogPage;
