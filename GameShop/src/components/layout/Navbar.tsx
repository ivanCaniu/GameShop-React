import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut, Shield, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import SearchBar from '../shared/SearchBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <Gamepad2 className="w-8 h-8 text-[var(--color-accent)] group-hover:animate-pulse" />
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            GAME<span className="text-[var(--color-accent)]">SHOP</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-[var(--color-accent)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
                            <Link to="/catalog" className="text-gray-300 hover:text-[var(--color-accent)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Catálogo</Link>
                            <Link to="/releases" className="text-gray-300 hover:text-[var(--color-accent)] px-3 py-2 rounded-md text-sm font-medium transition-colors">Lanzamientos</Link>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <SearchBar />

                        <Link to="/cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-[var(--color-accent)] rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {currentUser ? (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-white hover:text-[var(--color-accent)]">
                                    <UserIcon className="w-4 h-4" />
                                    <span>{currentUser.displayName || currentUser.email}</span>
                                </Link>
                                {currentUser.email === 'admin@gameshop.com' && (
                                    <Link to="/admin" title="Panel Admin">
                                        <Shield className="w-5 h-5 text-red-500 hover:text-red-400" />
                                    </Link>
                                )}
                                <Button variant="secondary" size="sm" onClick={handleLogout} className="p-2">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="outline" size="sm">
                                    <UserIcon className="w-4 h-4 mr-2" />
                                    Entrar
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[var(--color-bg-secondary)] border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
                        <Link to="/catalog" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Catálogo</Link>
                        <Link to="/cart" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Carrito</Link>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <Link to="/login" className="block w-full text-center">
                                <Button variant="primary" className="w-full">Iniciar Sesión</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
