import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { X } from 'lucide-react';

const ProfilePage = () => {
    const { currentUser, logout, toggleWishlist, updateProfile } = useAuth();
    const { products } = useProducts();
    const navigate = useNavigate();

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(currentUser?.displayName || '');
    const [editEmail, setEditEmail] = useState(currentUser?.email || '');
    const [editPassword, setEditPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editPassword && editPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        setLoadingUpdate(true);
        try {
            await updateProfile({
                displayName: editName,
                email: editEmail,
                password: editPassword || undefined
            });
            setIsEditing(false);
            setEditPassword('');
            setConfirmPassword('');
        } catch (error) {
            // Already handled in context
        } finally {
            setLoadingUpdate(false);
        }
    };

    // Extraer todos los ítems digitales de todos los pedidos
    const digitalGames = currentUser?.orders?.flatMap(order =>
        order.items.filter(item => item.type === 'Digital' && item.digitalCode)
    ) || [];

    // Resolver Ítems de la Lista de Deseos
    const wishlistIds = currentUser?.wishlist || [];
    const wishlistItems = products.filter(p => wishlistIds.includes(p.id));

    // Resolver Reservas
    const reservationIds = currentUser?.reservations || [];
    const reservedItems = products.filter(p => reservationIds.includes(p.id));

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <h1 className="text-3xl font-display mb-8">Mi Perfil</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Barra Lateral de Información */}
                <div className="md:col-span-1">
                    <Card className="p-6 sticky top-24">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-black uppercase shadow-lg shadow-[var(--color-accent)]/20">
                                {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-lg truncate" title={currentUser?.displayName || 'Usuario'}>
                                    {currentUser?.displayName || 'Usuario'}
                                </p>
                                <p className="text-sm text-gray-400 truncate" title={currentUser?.email}>
                                    {currentUser?.email}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase mt-1 inline-block ${currentUser?.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                    {currentUser?.role || 'User'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button variant="secondary" onClick={() => setIsEditing(true)} className="w-full">
                                Editar Perfil
                            </Button>
                            <Button variant="danger" onClick={handleLogout} className="w-full">
                                Cerrar Sesión
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Contenido Principal: Pedidos & Keys */}
                <div className="md:col-span-2 space-y-6">
                    {/* Sección Mis Keys */}
                    <section>
                        <h2 className="text-2xl font-display mb-4 text-[var(--color-neon-blue)] flex items-center gap-2">
                            Mis Keys Digitales
                        </h2>

                        {digitalGames.length > 0 ? (
                            <div className="space-y-4">
                                {digitalGames.map((game, index) => (
                                    <Card key={`${game.id}-${index}`} className="p-6 border-dashed border-2 border-gray-700 bg-gray-900/50">
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                            <div className="flex items-center gap-3 w-full">
                                                <div className="w-12 h-12 bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                                                    <img src={game.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{game.title}</p>
                                                    <p className="text-xs text-gray-400">{game.platforms.join(', ')} | Digital Edition</p>
                                                </div>
                                            </div>
                                            <div className="text-center md:text-right w-full md:w-auto">
                                                <p className="text-xs text-gray-400 mb-1">Tu Clave de Activación:</p>
                                                <code className="bg-black px-4 py-2 rounded text-[var(--color-accent)] text-lg tracking-widest font-mono border border-gray-600 block whitespace-nowrap select-all cursor-pointer hover:bg-gray-900 transition-colors">
                                                    {game.digitalCode}
                                                </code>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-8 text-center border-gray-800 border-dashed">
                                <p className="text-gray-400">No tienes juegos digitales comprados aún.</p>
                            </Card>
                        )}
                    </section>

                    {/* Historial de Pedidos */}
                    <section>
                        <h2 className="text-2xl font-display mb-4">Historial de Pedidos</h2>
                        <Card className="p-0 overflow-hidden">
                            {currentUser?.orders && currentUser.orders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="bg-[#1e293b] text-xs uppercase text-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 whitespace-nowrap">ID Pedido</th>
                                                <th className="px-6 py-3 whitespace-nowrap">Fecha</th>
                                                <th className="px-6 py-3 whitespace-nowrap">Items</th>
                                                <th className="px-6 py-3 text-right whitespace-nowrap">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUser.orders.map(order => (
                                                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{order.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                                    <td className="px-6 py-4 max-w-xs truncate" title={order.items.map(i => i.title).join(', ')}>
                                                        {order.items.map(i => i.title).join(', ')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-bold text-[var(--color-accent)] whitespace-nowrap">
                                                        ${order.total.toLocaleString('es-CL')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-400">
                                    Sin historial de pedidos.
                                </div>
                            )}
                        </Card>
                    </section>

                    {/* Sección Mis Reservas */}
                    <section>
                        <h2 className="text-2xl font-display mb-4 text-purple-400">Mis Reservas 🚀</h2>
                        {reservedItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {reservedItems.map(product => (
                                    <Card key={product.id} className="p-4 flex gap-4 items-center group border-purple-500/30 hover:border-purple-500/60 transition-colors">
                                        <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative">
                                            <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white truncate">{product.title}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded font-bold">RESERVADO</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button size="sm" onClick={() => navigate(`/product/${product.id}`)}>Ver</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-8 text-center border-gray-800 border-dashed">
                                <p className="text-gray-400">No tienes reservas activas.</p>
                            </Card>
                        )}
                    </section>

                    {/* Sección Lista de Deseos */}
                    <section>
                        <h2 className="text-2xl font-display mb-4 text-pink-500">Mi Lista de Deseos ❤️</h2>
                        {wishlistItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {wishlistItems.map(product => (
                                    <Card key={product.id} className="p-4 flex gap-4 items-center group hover:border-pink-500/30 transition-colors">
                                        <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                            <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white truncate">{product.title}</h4>
                                            <p className="text-[var(--color-accent)] font-bold text-sm">${product.price.toLocaleString('es-CL')}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button size="sm" onClick={() => navigate(`/product/${product.id}`)}>Ver</Button>
                                            <button
                                                onClick={() => toggleWishlist(product.id)}
                                                className="text-xs text-red-400 hover:text-red-300 underline"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-8 text-center border-gray-800 border-dashed">
                                <p className="text-gray-400">Tu lista de deseos está vacía.</p>
                            </Card>
                        )}
                    </section>
                </div>
            </div>

            {/* Modal de Edición */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <Card className="w-full max-w-md p-6 bg-[#1e293b] border-gray-700 shadow-2xl relative">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-display font-bold mb-6 text-white text-center">Editar Perfil</h2>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <Input
                                label="Nombre de Usuario"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Tu nombre público"
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                placeholder="nuevo@email.com"
                            />

                            <div className="border-t border-gray-700 pt-4 mt-4">
                                <p className="text-xs text-gray-500 mb-3 uppercase font-bold tracking-wider">Cambiar Contraseña (Opcional)</p>
                                <div className="space-y-4">
                                    <Input
                                        label="Nueva Contraseña"
                                        type="password"
                                        value={editPassword}
                                        onChange={(e) => setEditPassword(e.target.value)}
                                        placeholder="Dejar en blanco para no cambiar"
                                    />

                                    {editPassword && (
                                        <Input
                                            label="Confirmar Contraseña"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Repite la contraseña"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary" className="flex-1" isLoading={loadingUpdate}>
                                    Guardar Cambios
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
