import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';
import { products as initialProducts } from '../services/mockData';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
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
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage or mockData
    useEffect(() => {
        const storedProducts = localStorage.getItem('gameshop_products');
        if (storedProducts) {
            try {
                setProducts(JSON.parse(storedProducts));
            } catch (e) {
                console.error("Failed to parse products", e);
                setProducts(initialProducts);
            }
        } else {
            setProducts(initialProducts);
            localStorage.setItem('gameshop_products', JSON.stringify(initialProducts));
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever products change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('gameshop_products', JSON.stringify(products));
        }
    }, [products, isInitialized]);

    const addProduct = (newProductData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: Date.now().toString(), // Simple ID generation
        };
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const getProduct = (id: string) => {
        return products.find(p => p.id === id);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
