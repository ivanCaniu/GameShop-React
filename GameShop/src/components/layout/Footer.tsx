import { Facebook, MessageCircle, Instagram, CreditCard, Mail, ArrowRight, ShieldCheck, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] border-t border-white/10 pt-16 pb-8 mt-auto relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[128px]" />
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-600 rounded-full blur-[96px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

                    {/* Brand & Newsletter (Span 5 columns) */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link to="/" className="inline-block">
                            <span className="text-3xl font-display font-bold tracking-tighter text-white">
                                GAME<span className="text-[var(--color-accent)]">SHOP</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-md">
                            Tu destino definitivo para juegos digitales y físicos. Garantía oficial, entrega inmediata y soporte 24/7.
                        </p>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                <Mail size={18} className="text-[var(--color-accent)]" />
                                Suscríbete al Newsletter
                            </h4>
                            <p className="text-xs text-gray-400 mb-4">Recibe ofertas exclusivas y un 10% OFF en tu primera compra.</p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-accent)] flex-grow"
                                />
                                <Button size="sm" className="px-4">
                                    <ArrowRight size={18} />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="lg:col-span-2 lg:col-start-7">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Tienda</h3>
                        <ul className="space-y-4">
                            <li><Link to="/catalog" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Catálogo Completo</Link></li>
                            <li><Link to="/catalog?filter=PS5" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">PlayStation 5</Link></li>
                            <li><Link to="/catalog?filter=Xbox" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Xbox Series</Link></li>
                            <li><Link to="/catalog?filter=PC" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">PC Gaming</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Soporte</h3>
                        <ul className="space-y-4">
                            <li><Link to="/profile" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Mi Cuenta</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Centro de Ayuda</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Términos de Uso</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors text-sm">Privacidad</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3 (Social) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Comunidad</h3>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook size={18} />} color="hover:bg-[#1877F2]" />
                            <SocialIcon icon={<Instagram size={18} />} color="hover:bg-[#E1306C]" />
                            <SocialIcon icon={<Twitter size={18} />} color="hover:bg-[#1DA1F2]" />
                            <SocialIcon icon={<MessageCircle size={18} />} color="hover:bg-[#25D366]" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; 2026 GameShop Inc. Todos los derechos reservados.
                    </p>

                    {/* Payment Icons Simulation */}
                    <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-1 text-white text-xs font-bold border border-white/20 px-2 py-1 rounded">
                            <CreditCard size={14} /> VISA
                        </div>
                        <div className="flex items-center gap-1 text-white text-xs font-bold border border-white/20 px-2 py-1 rounded">
                            <CreditCard size={14} /> MC
                        </div>
                        <div className="flex items-center gap-1 text-white text-xs font-bold border border-white/20 px-2 py-1 rounded">
                            <ShieldCheck size={14} /> PayPal
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, color }: { icon: any, color: string }) => (
    <a href="#" className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white hover:-translate-y-1 ${color}`}>
        {icon}
    </a>
);

export default Footer;
