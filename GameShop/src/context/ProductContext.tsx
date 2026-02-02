import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';
import { api } from '../services/api';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    // Obtener productos de la API al montar
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Usando API Helper (Más limpio!)
                const data = await api.get<any[]>('/products');

                // Asegurar mapeo de ID y campos (MongoDB uses _id, frontend uses isNew)
                const mappedProducts = data.map((p: any) => ({
                    ...p,
                    id: p.id || p._id,
                    isNew: p.isNewRelease ?? p.isNew // Map backend 'isNewRelease' to frontend 'isNew'
                }));

                setProducts(mappedProducts);
            } catch (err: any) {
                console.error("Error de API:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = async (newProductData: Omit<Product, 'id'>) => {
        try {
            // ¡No es necesario obtener manualmente el token o establecer encabezados!
            const newProduct = await api.post<any>('/products', newProductData);

            setProducts(prev => [...prev, { ...newProduct, id: newProduct.id || newProduct._id }]);
        } catch (err) {
            console.error("Error al Agregar Producto:", err);
            throw err;
        }
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        try {
            const updated = await api.put<any>(`/products/${id}`, updates);
            setProducts(prev => prev.map(p => p.id === id ? { ...updated, id: updated.id || updated._id } : p));
        } catch (err) {
            console.error("Error al Actualizar Producto:", err);
            throw err;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error("Error al Eliminar Producto:", err);
            throw err;
        }
    };

    const getProduct = (id: string) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
