import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "remixicon/fonts/remixicon.css";

function Login() {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [forgotModal, setForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotSent, setForgotSent] = useState(false);
    const navigate = useNavigate();

    // If already logged in, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // Load remembered email
    useEffect(() => {
        const remembered = localStorage.getItem("gta_hub_remember");
        if (remembered) {
            setEmail(remembered);
            setRememberMe(true);
        }
    }, []);

    // Floating particles effect
    useEffect(() => {
        const container = document.querySelector('.login-particles');
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 1;
            particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,107,53,0.6) 0%, rgba(255,107,53,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        box-shadow: 0 0 ${size * 3}px rgba(255,107,53,0.3);
        animation: floatUp ${Math.random() * 6 + 4}s linear forwards;
      `;
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 10000);
        };

        const interval = setInterval(createParticle, 200);
        return () => clearInterval(interval);
    }, []);

    const validateForm = () => {
        if (!email.trim()) { setError("Please enter your email address."); return false; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return false; }
        if (!password) { setError("Please enter your password."); return false; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return false; }
        return true;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const result = login(email, password, rememberMe);
            setIsLoading(false);
            if (result.success) {
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => navigate("/dashboard"), 800);
            } else {
                setError(result.error);
            }
        }, 1200);
    };

    const handleSocialLogin = (provider) => {
        setError("");
        setSuccess(`Signing in with ${provider}...`);
        setTimeout(() => {
            // Auto-create a social login user
            const socialEmail = `user@${provider.toLowerCase()}.com`;
            const existingUsers = JSON.parse(localStorage.getItem("gta_hub_users") || "[]");
            if (!existingUsers.find(u => u.email === socialEmail)) {
                existingUsers.push({ email: socialEmail, password: "social123", username: `${provider}Player`, id: Date.now().toString() });
                localStorage.setItem("gta_hub_users", JSON.stringify(existingUsers));
            }
            const result = login(socialEmail, "social123", false);
            if (result.success) {
                navigate("/dashboard");
            }
        }, 1500);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) return;
        setForgotSent(true);
        setTimeout(() => {
            setForgotModal(false);
            setForgotSent(false);
            setForgotEmail("");
            setSuccess("Password reset link sent! Check your inbox.");
        }, 2000);
    };

    return (
        <div className="login-page min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,68,68,0.1),transparent_50%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMyAxLjM0MyAzIDNzLTEuMzQzIDMtMyAzLTMtMS4zNDMtMy0zIDEuMzQzLTMgMy0zeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            </div>

            {/* Animated Glow Orbs */}
            <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

            {/* Particles */}
            <div className="login-particles absolute inset-0 pointer-events-none overflow-hidden"></div>

            {/* Back to Home */}
            <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all duration-300 group">
                <i className="ri-arrow-left-line text-xl group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span className="text-sm uppercase tracking-wider">Back</span>
            </Link>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="absolute -inset-[1px] bg-gradient-to-b from-orange-500/30 via-white/10 to-orange-500/10 rounded-3xl blur-[1px]"></div>

                <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-orange-500/20">
                            <i className="ri-gamepad-fill text-3xl text-white"></i>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">
                            Welcome <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Back</span>
                        </h1>
                        <p className="text-white/40 text-sm">Sign in to access your gaming dashboard</p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                            <i className="ri-error-warning-fill text-red-500"></i>
                            <p className="text-red-400 text-sm flex-1">{error}</p>
                            <button onClick={() => setError("")} className="text-red-400/50 hover:text-red-400"><i className="ri-close-line"></i></button>
                        </div>
                    )}
                    {success && (
                        <div className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                            <i className="ri-check-double-line text-green-500"></i>
                            <p className="text-green-400 text-sm flex-1">{success}</p>
                        </div>
                    )}

                    {/* Social Login */}
                    <div className="flex gap-3 mb-6">
                        <button onClick={() => handleSocialLogin("Google")} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                            <i className="ri-google-fill text-lg text-white/70 group-hover:text-orange-500 transition-colors"></i>
                            <span className="text-white/70 text-sm group-hover:text-white transition-colors">Google</span>
                        </button>
                        <button onClick={() => handleSocialLogin("Discord")} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                            <i className="ri-discord-fill text-lg text-white/70 group-hover:text-indigo-400 transition-colors"></i>
                            <span className="text-white/70 text-sm group-hover:text-white transition-colors">Discord</span>
                        </button>
                        <button onClick={() => handleSocialLogin("Steam")} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                            <i className="ri-steam-fill text-lg text-white/70 group-hover:text-blue-400 transition-colors"></i>
                            <span className="text-white/70 text-sm group-hover:text-white transition-colors">Steam</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10"></div>
                        <span className="text-white/30 text-xs uppercase tracking-wider">or continue with email</span>
                        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="group">
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Email Address</label>
                            <div className="relative">
                                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    placeholder="player@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">Password</label>
                            <div className="relative">
                                <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-orange-500 transition-colors">
                                    <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
                                <div className={`w-4 h-4 rounded border transition-all duration-300 flex items-center justify-center ${rememberMe ? 'bg-orange-500 border-orange-500' : 'border-white/20 hover:border-orange-500/50'}`}>
                                    {rememberMe && <i className="ri-check-line text-[10px] text-white"></i>}
                                </div>
                                <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">Remember me</span>
                            </label>
                            <button type="button" onClick={() => setForgotModal(true)} className="text-orange-500/70 text-sm hover:text-orange-500 transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group">
                            <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <i className="ri-login-box-line"></i> Sign In
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-8">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors relative group">
                            Create Account
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </p>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {forgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => { setForgotModal(false); setForgotSent(false); }}>
                    <div className="relative w-full max-w-sm mx-4 bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { setForgotModal(false); setForgotSent(false); }} className="absolute top-4 right-4 text-white/40 hover:text-white">
                            <i className="ri-close-line text-xl"></i>
                        </button>
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                                <i className="ri-lock-unlock-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white">Reset Password</h3>
                            <p className="text-white/40 text-sm mt-1">Enter your email and we'll send you a reset link</p>
                        </div>
                        {!forgotSent ? (
                            <form onSubmit={handleForgotPassword}>
                                <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 mb-4 text-sm"
                                    required
                                />
                                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                                    Send Reset Link
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <i className="ri-mail-check-line text-2xl text-green-500"></i>
                                </div>
                                <p className="text-green-400 text-sm">Reset link sent to {forgotEmail}</p>
                                <p className="text-white/30 text-xs mt-1">Check your inbox and spam folder</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

export default Login;
