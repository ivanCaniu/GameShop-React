import Card from '../components/ui/Card';

const TermsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-display font-bold mb-8 text-center">Términos y Condiciones</h1>

            <Card className="p-8 md:p-12 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">1. Introducción</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Bienvenido a GameShop. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones.
                        Estos términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el servicio.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">2. Compras y Pagos</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Al realizar una compra, garantizas que tienes la edad legal para formar un contrato vinculante.
                        Nos reservamos el derecho de rechazar o cancelar tu pedido en cualquier momento por razones que incluyen, pero no se limitan a:
                        disponibilidad del producto, errores en la descripción o precio del producto, o error en tu pedido.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">3. Productos Digitales y Entregas</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 ml-2">
                        <li>Las claves de producto (keys) se entregan de forma digital e inmediata tras la confirmación del pago.</li>
                        <li>Es responsabilidad del usuario verificar la región y plataforma del código antes de la compra.</li>
                        <li>GameShop no se hace responsable por incompatibilidades de hardware del usuario.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">4. Política de Reembolsos</h2>
                    <p className="text-gray-400 leading-relaxed">
                        <strong>Para productos digitales:</strong> Debido a la naturaleza de los productos digitales, no ofrecemos reembolsos una vez que la clave de activación ha sido revelada al usuario, a menos que la clave sea inválida probadamente.
                        <br /><br />
                        <strong>Para productos físicos:</strong> Aceptamos devoluciones dentro de los 10 días siguientes a la recepción, siempre que el producto esté sellado y en perfectas condiciones.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-3">5. Propiedad Intelectual</h2>
                    <p className="text-gray-400 leading-relaxed">
                        El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de GameShop y sus licenciantes.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-700">
                    <p className="text-sm text-gray-500 text-center">
                        Última actualización: 20 de Enero, 2026
                    </p>
                </section>
            </Card>
        </div>
    );
};

export default TermsPage;
