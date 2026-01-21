import { Facebook, MessageCircle, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[var(--color-bg-secondary)] border-t border-white/10 pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            GAME<span className="text-[var(--color-accent)]">SHOP</span>
                        </span>
                        <p className="mt-4 text-sm text-gray-400">
                            Tu tienda digital favorita. Precios bajos, entrega rápida y la mejor atención para gamers.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-4">Tienda</h3>
                        <ul className="space-y-2">
                            <li><Link to="/catalog" className="text-gray-400 hover:text-[var(--color-accent)] text-sm">Catálogo Completo</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-[var(--color-accent)] text-sm">Quiénes Somos</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-4">Soporte</h3>
                        <ul className="space-y-2">
                            <li><Link to="/profile" className="text-gray-400 hover:text-[var(--color-accent)] text-sm">Mis Keys</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-[var(--color-accent)] text-sm">Centro de Ayuda</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-[var(--color-accent)] text-sm">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-[#E1306C] transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-[#25D366] transition-colors">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; 2026 GameShop. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
