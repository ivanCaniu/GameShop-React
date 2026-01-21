import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loginWithGoogle, loading } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            await register(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Error al crear la cuenta.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Error con Google Login');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-md p-8 bg-[var(--color-bg-secondary)] relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]" />

                <h2 className="text-3xl font-display text-center mb-6 text-white">
                    Únete a <span className="text-[var(--color-accent)]">GameShop</span>
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4 text-xs text-gray-400 text-center bg-blue-900/20 p-2 rounded border border-blue-500/20">
                    <p>💡 Tip: Regístrate como <strong>admin@gameshop.com</strong> para obtener acceso de Super Admin.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="w-full" isLoading={loading} disabled={loading}>
                        Crear Cuenta
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[var(--color-bg-secondary)] text-gray-400">O regístrate con</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button variant="secondary" className="w-full" onClick={handleGoogleLogin}>
                            Google (Demo)
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-400">¿Ya tienes cuenta? </span>
                        <Link to="/login" className="text-[var(--color-accent)] hover:underline font-bold">
                            Inicia Sesión
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
