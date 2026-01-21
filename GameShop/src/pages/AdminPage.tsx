import { useState, type FormEvent } from 'react';
import { Package, Users, Settings, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../types';

const AdminPage = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        title: '',
        price: 0,
        platforms: ['PS5'],
        type: 'Physical',
        stock: 0,
        image: '',
        description: '',
        isNew: false,
        isPreorder: false,
        releaseDate: ''
    });

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({
                title: '',
                price: 0,
                platforms: ['PS5'],
                type: 'Physical',
                stock: 0,
                image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
                description: '',
                isNew: false,
                isPreorder: false,
                releaseDate: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.title || !formData.price || !formData.image) {
            alert("Por favor completa los campos obligatorios");
            return;
        }

        if (editingProduct) {
            updateProduct(editingProduct.id, formData);
        } else {
            addProduct(formData as Omit<Product, 'id'>);
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            deleteProduct(id);
        }
    };

    // Settings State
    const [siteName, setSiteName] = useState('GameShop');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-display font-bold mb-8 text-[var(--color-neon-purple)]">Panel de Administración</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <Card className="col-span-1 h-fit p-4 space-y-2 sticky top-24">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-[var(--color-accent)] text-black font-bold' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <Package size={20} /> Productos
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-[var(--color-accent)] text-black font-bold' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <Users size={20} /> Órdenes
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-[var(--color-accent)] text-black font-bold' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <Settings size={20} /> Configuración
                    </button>
                </Card>

                {/* Content */}
                <div className="md:col-span-3">
                    {activeTab === 'products' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Inventario ({products.length})</h2>
                                <Button variant="primary" size="sm" className="flex items-center gap-2" onClick={() => handleOpenModal()}>
                                    <Plus size={16} /> Nuevo Producto
                                </Button>
                            </div>

                            <Card className="overflow-hidden p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="bg-[#1e293b] text-gray-200 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Producto</th>
                                                <th className="px-4 py-3">Plataformas</th>
                                                <th className="px-4 py-3">Stock</th>
                                                <th className="px-4 py-3">Precio</th>
                                                <th className="px-4 py-3 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {products.map(product => (
                                                <tr key={product.id} className="hover:bg-gray-700/30">
                                                    <td className="px-4 py-3 font-medium text-white flex items-center gap-3">
                                                        <img src={product.image} className="w-10 h-10 rounded object-cover bg-gray-700" alt="" />
                                                        <span className="line-clamp-1">{product.title}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-0.5 rounded bg-gray-700 text-xs text-white">{product.platforms.join(', ')}</span>
                                                        <span className="ml-2 px-2 py-0.5 rounded bg-gray-800 text-xs border border-gray-600">{product.type}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={product.stock < 5 ? 'text-red-500 font-bold' : 'text-green-400'}>{product.stock}</span>
                                                    </td>
                                                    <td className="px-4 py-3">${product.price.toLocaleString('es-CL')}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleOpenModal(product)}
                                                                className="p-1.5 rounded hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="p-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Configuración de la Tienda</h2>
                            <Card className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold border-b border-gray-700 pb-2">General</h3>
                                    <Input
                                        label="Nombre del Sitio"
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                    />
                                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                                        <div>
                                            <p className="font-bold text-white">Modo Mantenimiento</p>
                                            <p className="text-sm text-gray-400">Desactiva el acceso público a la tienda.</p>
                                        </div>
                                        <div
                                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${maintenanceMode ? 'bg-[var(--color-accent)]' : 'bg-gray-600'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${maintenanceMode ? 'left-7' : 'left-1'}`} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button className="flex items-center gap-2" onClick={() => alert('Configuración guardada')}>
                                            <Save size={18} /> Guardar Cambios
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-400">Órdenes (Simulación)</h2>
                            <Card className="p-10 text-center">
                                <Users size={48} className="mx-auto text-gray-600 mb-4" />
                                <p className="text-xl">En este MVP, las órdenes se guardan en el perfil de cada usuario en localStorage.</p>
                                <p className="text-gray-400 mt-2">Para ver órdenes reales, inicia sesión como usuario y compra productos.</p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit/Add Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg-secondary)] border border-gray-700 shadow-2xl">
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                <h2 className="text-2xl font-bold text-white">
                                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Título"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ej: God of War"
                                        required
                                    />
                                    <label className="text-sm font-bold text-gray-300">Plataformas</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['PS5', 'PS4', 'Xbox', 'Switch', 'PC'].map(p => (
                                            <label key={p} className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-2 rounded cursor-pointer border border-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.platforms?.includes(p as any)}
                                                    onChange={e => {
                                                        const current = formData.platforms || [];
                                                        if (e.target.checked) {
                                                            setFormData({ ...formData, platforms: [...current, p as any] });
                                                        } else {
                                                            setFormData({ ...formData, platforms: current.filter(pl => pl !== p) });
                                                        }
                                                    }}
                                                    className="rounded bg-gray-700 border-gray-600 text-[var(--color-accent)]"
                                                />
                                                <span className="text-sm text-white">{p}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        label="Precio ($)"
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        required
                                    />
                                    <Input
                                        label="Stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        required
                                    />
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-bold text-gray-300">Tipo</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        >
                                            <option value="Physical">Físico</option>
                                            <option value="Digital">Digital</option>
                                        </select>
                                    </div>
                                </div>

                                <Input
                                    label="URL de Imagen"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                    required
                                />

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-bold text-gray-300">Descripción</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all min-h-[100px]"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Descripción detallada del producto..."
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="isNew"
                                        checked={formData.isNew}
                                        onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                                        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                                    />
                                    <label htmlFor="isNew" className="text-white cursor-pointer select-none">Marcar como "Nuevo Lanzamiento"</label>
                                </div>

                                <div className="flex flex-col gap-2 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isPreorder"
                                            checked={formData.isPreorder}
                                            onChange={e => setFormData({ ...formData, isPreorder: e.target.checked })}
                                            className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                                        />
                                        <label htmlFor="isPreorder" className="text-white cursor-pointer select-none font-bold text-purple-400">Es una Pre-orden / Lanzamiento Futuro</label>
                                    </div>

                                    {formData.isPreorder && (
                                        <div className="animate-fade-in-up mt-2">
                                            <Input
                                                label="Fecha de Lanzamiento"
                                                value={formData.releaseDate || ''}
                                                onChange={e => setFormData({ ...formData, releaseDate: e.target.value })}
                                                placeholder="Ej: 15 Oct 2026 o 'Late 2026'"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                                    <Button type="button" variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                                    <Button type="submit" variant="primary">Guardar Producto</Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
