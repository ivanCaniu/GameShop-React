


import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useProducts } from '../context/ProductContext'; // Import context

const ReleasesPage = () => {
    const { products } = useProducts(); // Use hook

    // Filter Pre-order Products
    const upcomingGames = products.filter(p => p.isPreorder);

    const handlePreOrder = (gameTitle: string) => {
        alert(`¡Reserva de ${gameTitle} solicitada! Te notificaremos cuando esté disponible.`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 font-bold text-sm tracking-wider uppercase rounded-full mb-4">
                    Próximamente
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    Lanzamientos Futuros
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Asegura tu copia antes que nadie. Reserva ahora los títulos más esperados y recibe bonificaciones exclusivas.
                </p>
            </div>

            {upcomingGames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingGames.map(game => (
                        <Card key={game.id} className="group overflow-hidden border-purple-500/30 flex flex-col h-full">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                                    PRE-ORDEN
                                </div>

                                <div className="absolute bottom-4 left-4 flex gap-1 flex-wrap max-w-[90%]">
                                    {game.platforms.map(p => (
                                        <span key={p} className="text-xs font-bold px-2 py-1 rounded bg-black/50 text-white backdrop-blur-sm border border-white/10">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4 flex flex-col flex-1">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold font-display leading-tight mb-2 group-hover:text-purple-400 transition-colors">
                                        {game.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {game.description || 'Sin descripción disponible.'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-300 border-y border-gray-700/50 py-4 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} className="text-purple-400" />
                                        <span>{game.releaseDate || 'TBA'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 ml-auto">
                                        <span className="font-bold text-lg text-white">${game.price.toLocaleString('es-CL')}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full group-hover:bg-purple-600 group-hover:border-purple-600 transition-all mt-auto"
                                    onClick={() => handlePreOrder(game.title)}
                                >
                                    <Clock size={18} className="mr-2" />
                                    Reservar Ahora
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center border-dashed border-2 border-gray-800 bg-transparent">
                    <p className="text-xl text-gray-500">No hay lanzamientos futuros anunciados por el momento.</p>
                </Card>
            )}

            <div className="mt-16 p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-center">
                <h3 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
                <p className="text-gray-400 mb-6">Estamos actualizando nuestro calendario de lanzamientos constantemente.</p>
                <Link to="/catalog">
                    <Button variant="outline">
                        Ver Catálogo Disponible <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ReleasesPage;
