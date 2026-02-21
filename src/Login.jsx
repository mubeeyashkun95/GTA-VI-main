import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

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

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard");
        }, 1500);
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
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all duration-300 group"
            >
                <i className="ri-arrow-left-line text-xl group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span className="text-sm uppercase tracking-wider">Back</span>
            </Link>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Card Glow Border */}
                <div className="absolute -inset-[1px] bg-gradient-to-b from-orange-500/30 via-white/10 to-orange-500/10 rounded-3xl blur-[1px]"></div>

                <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                    {/* Logo / Brand */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-orange-500/20">
                            <i className="ri-gamepad-fill text-3xl text-white"></i>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">
                            Welcome <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Back</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Sign in to access your gaming dashboard
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-3 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                            <i className="ri-google-fill text-lg text-white/70 group-hover:text-orange-500 transition-colors"></i>
                            <span className="text-white/70 text-sm group-hover:text-white transition-colors">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
                            <i className="ri-discord-fill text-lg text-white/70 group-hover:text-indigo-400 transition-colors"></i>
                            <span className="text-white/70 text-sm group-hover:text-white transition-colors">Discord</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
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
                        {/* Email */}
                        <div className="group">
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="player@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 
                    focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                Password
                            </label>
                            <div className="relative">
                                <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 
                    focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-orange-500 transition-colors"
                                >
                                    <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-4 h-4 rounded border transition-all duration-300 flex items-center justify-center cursor-pointer
                    ${rememberMe ? 'bg-orange-500 border-orange-500' : 'border-white/20 hover:border-orange-500/50'}`}
                                >
                                    {rememberMe && <i className="ri-check-line text-[10px] text-white"></i>}
                                </div>
                                <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-orange-500/70 text-sm hover:text-orange-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 font-bold uppercase tracking-wider text-sm
                hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                        >
                            <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <i className="ri-login-box-line"></i>
                                Sign In
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                            {/* Hover shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-white/40 text-sm mt-8">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors relative group">
                            Create Account
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </p>
                </div>
            </div>

            {/* CSS for float animation */}
            <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

export default Login;
