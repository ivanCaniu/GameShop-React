import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-display font-bold mb-2 text-center">Centro de Ayuda</h1>
            <p className="text-gray-400 text-center mb-12 text-lg">Estamos aquí para ayudarte con cualquier duda o problema.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Form */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
                    <Card className="p-8">
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensaje enviado con éxito. Te responderemos pronto."); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Nombre" placeholder="Tu nombre" required />
                                <Input label="Email" type="email" placeholder="tucorreo@ejemplo.com" required />
                            </div>
                            <Input label="Asunto" placeholder="Ej: Problema con una Key" required />
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-bold text-gray-300">Mensaje</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-700 text-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all min-h-[150px]"
                                    placeholder="Describe tu problema o consulta..."
                                    required
                                />
                            </div>
                            <Button variant="primary" className="w-full flex justify-center items-center gap-2">
                                <Send size={18} /> Enviar Mensaje
                            </Button>
                        </form>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <Card className="p-4 flex flex-col items-center text-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                            <Mail className="text-[var(--color-accent)]" />
                            <span className="text-sm font-bold">soporte@gameshop.com</span>
                        </Card>
                        <Card className="p-4 flex flex-col items-center text-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                            <MessageCircle className="text-[var(--color-accent)]" />
                            <span className="text-sm font-bold">Chat en Vivo</span>
                        </Card>
                        <Card className="p-4 flex flex-col items-center text-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                            <MapPin className="text-[var(--color-accent)]" />
                            <span className="text-sm font-bold">Santiago, Chile</span>
                        </Card>
                    </div>
                </div>

                {/* FAQ */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes (FAQ)</h2>
                    <div className="space-y-4">
                        <FAQItem
                            question="¿Cuánto tardan en llegar los juegos digitales?"
                            answer="¡Es instantáneo! Una vez procesado el pago, recibirás el código en tu correo y aparecerá automáticamente en tu perfil."
                        />
                        <FAQItem
                            question="¿Son juegos originales?"
                            answer="Sí, todas nuestras keys provienen de distribuidores autorizados. Son 100% legales y permanentes en tu cuenta."
                        />
                        <FAQItem
                            question="¿Puedo pedir un reembolso?"
                            answer="Para juegos digitales, si la key no ha sido revelada o canjeada, podemos procesar devoluciones. Una vez vista la clave, no hay reembolsos por seguridad."
                        />
                        <FAQItem
                            question="¿Hacen envíos de juegos físicos?"
                            answer="Sí, realizamos envíos a todo Chile a través de BlueExpress. Los tiempos varían de 24 a 72 horas hábiles."
                        />
                        <FAQItem
                            question="¿Qué medios de pago aceptan?"
                            answer="Aceptamos tarjetas de crédito, débito, y transferencias bancarias a través de WebPay Plus."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="border-b border-gray-700 pb-4">
        <h3 className="font-bold text-lg text-white mb-2">{question}</h3>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
    </div>
);

export default ContactPage;
