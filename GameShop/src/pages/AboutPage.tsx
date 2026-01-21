import { Rocket, ShieldCheck, Heart, Users } from 'lucide-react';
import Card from '../components/ui/Card';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    Pasión por el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-purple-500">Gaming</span>
                </h1>
                <p className="text-xl text-gray-400">
                    Nacimos con una misión simple: hacer que los videojuegos sean accesibles, seguros e instantáneos para todos los jugadores de Latinoamérica.
                </p>
            </div>

            {/* Stats / Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                <FeatureCard icon={<Rocket size={32} />} title="+50,000" description="Juegos Vendidos" />
                <FeatureCard icon={<Users size={32} />} title="+15,000" description="Clientes Felices" />
                <FeatureCard icon={<ShieldCheck size={32} />} title="100%" description="Seguro y Legal" />
                <FeatureCard icon={<Heart size={32} />} title="4.9/5" description="Valoración Promedio" />
            </div>

            {/* Story Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Nuestra Historia</h2>
                    <div className="prose prose-invert text-gray-400">
                        <p>
                            GameShop comenzó en 2024 como un pequeño proyecto de garaje. Frustrados por los altos precios y las esperas en los envíos de juegos físicos, decidimos apostar fuerte por la distribución digital.
                        </p>
                        <p>
                            Hoy, somos referentes en la venta de códigos digitales y hardware gamer. Trabajamos directamente con distribuidores oficiales para garantizarte siempre el mejor precio y total seguridad en tus compras.
                        </p>
                        <p>
                            No solo vendemos juegos; somos gamers como tú. Entendemos la emoción de un lanzamiento a medianoche y la frustración del lag. Por eso, nuestra plataforma está diseñada por y para jugadores.
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                    <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
                        alt="Oficina GameShop"
                        className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover h-[400px]"
                    />
                </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-12">Por qué elegirnos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="p-8 hover:border-[var(--color-accent)] transition-colors group">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-accent)] transition-colors">
                            <Rocket size={32} className="text-white group-hover:text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Entrega Flash ⚡</h3>
                        <p className="text-gray-400">Nuestro sistema automatizado envía tus códigos digitales en segundos, las 24 horas del día.</p>
                    </Card>
                    <Card className="p-8 hover:border-[var(--color-accent)] transition-colors group">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-accent)] transition-colors">
                            <ShieldCheck size={32} className="text-white group-hover:text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Garantía Total 🛡️</h3>
                        <p className="text-gray-400">Si algo sale mal con tu clave (lo cual es muy raro), te la reponemos o te devolvemos el dinero.</p>
                    </Card>
                    <Card className="p-8 hover:border-[var(--color-accent)] transition-colors group">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-accent)] transition-colors">
                            <Heart size={32} className="text-white group-hover:text-black" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Soporte Humano 🤝</h3>
                        <p className="text-gray-400">Nada de bots tontos. Nuestro equipo de soporte son gamers reales listos para ayudarte.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
    <Card className="p-6 text-center border-gray-800 bg-gray-900/50">
        <div className="text-[var(--color-accent)] flex justify-center mb-2">{icon}</div>
        <div className="text-2xl font-bold text-white mb-1">{title}</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">{description}</div>
    </Card>
);

export default AboutPage;
