import { ArrowRight, Zap, Shield, Smartphone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/shared/ProductCard';
import { useProducts } from '../context/ProductContext';
import Card from '../components/ui/Card';

const HomePage = () => {
    const { products, loading } = useProducts();
    // const heroProduct = products.find(p => p.title.includes("God of War")) || products[0]; // Unused for now
    const newReleases = products.filter(p => p.isNew && !p.isPreorder).slice(0, 4);

    return (
        <div className="pb-12">

            {/* SECCIÓN HÉROE - Ancho Completo */}
            <div className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover object-center opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-4 z-10 relative">
                    <div className="max-w-2xl space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-accent)]/20 border border-[var(--color-accent)] text-[var(--color-accent)] font-bold text-xs uppercase tracking-widest rounded-full">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                            Disponible Ahora
                        </div>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-none">
                            NEXT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">LEVEL</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                            Descubre la nueva generación de juegos digitales y físicos. Entrega inmediata y precios imbatibles.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/catalog">
                                <Button size="lg" className="flex items-center gap-2 px-8 text-lg">
                                    Ver Catálogo <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg" className="px-8 text-lg">
                                    Sobre Nosotros
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE CATEGORÍAS */}
            <div className="container mx-auto px-4 mb-20">
                <h2 className="text-2xl font-display font-bold mb-8 text-center uppercase tracking-widest text-gray-400">Explora por Plataforma</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PlatformCard name="PlayStation 5" image="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400" url="/catalog?filter=PS5" />
                    <PlatformCard name="Xbox Series" image="https://static.independentespanol.com/2020/10/16/11/newFile-2.jpg?width=1200" url="/catalog?filter=Xbox" />
                    <PlatformCard name="Nintendo Switch" image="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=400" url="/catalog?filter=Switch" />
                    <PlatformCard name="PC Gaming" image="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400" url="/catalog?filter=PC" />
                </div>
            </div>

            {/* GRID DE NUEVOS LANZAMIENTOS (Sección de Fondo Oscuro) */}
            <section className="bg-[#1e293b]/30 py-16 mb-20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-[var(--color-accent)] font-bold tracking-wider uppercase text-sm">Novedades</span>
                            <h2 className="text-4xl font-display font-bold text-white mt-2">Últimos Lanzamientos</h2>
                        </div>
                        <Link to="/catalog">
                            <Button variant="secondary" className="flex items-center gap-2">
                                Ver todo <ChevronRight size={16} />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading
                            ? Array(4).fill(0).map((_, i) => <ProductCard key={i} loading />)
                            : newReleases.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* CARACTERÍSTICAS / POR QUÉ NOSOTROS */}
            <div className="container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureItem
                        icon={<Zap size={40} />}
                        title="Entrega Digital Flash"
                        desc="Recibe tus códigos en segundos. Sin esperas, sin costos de envío. Juega al instante."
                    />
                    <FeatureItem
                        icon={<Shield size={40} />}
                        title="Garantía Oficial"
                        desc="Todos nuestros productos son 100% oficiales y cuentan con garantía de por vida."
                    />
                    <FeatureItem
                        icon={<Smartphone size={40} />}
                        title="Soporte Gamer"
                        desc="¿Problemas? Nuestro equipo de soporte está disponible 24/7 para ayudarte."
                    />
                </div>
            </div>

            {/* BANNER PROMOCIONAL */}
            <section className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-purple-900 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">¿Listo para la próxima aventura?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Únete a miles de gamers que ya confían en GameShop para sus compras digitales.
                        </p>
                        <Link to="/catalog">
                            <Button variant="secondary" size="lg" className="px-12 py-6 text-xl">
                                Explorar Catálogo
                            </Button>
                        </Link>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </div>
            </section>
        </div>
    );
};

const PlatformCard = ({ name, image, url }: { name: string, image: string, url: string }) => (
    <Link to={url} className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-lg">
        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider group-hover:scale-105 transition-transform">{name}</h3>
        </div>
    </Link>
);

const FeatureItem = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <Card className="p-8 hover:border-[var(--color-accent)] transition-all group text-center">
        <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-[var(--color-accent)] mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400">{desc}</p>
    </Card>
);

export default HomePage;
