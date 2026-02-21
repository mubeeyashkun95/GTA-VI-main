import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Password strength
    const getPasswordStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = getPasswordStrength(formData.password);
    const strengthLabels = ["", "Weak", "Fair", "Strong", "Very Strong"];
    const strengthColors = ["", "bg-red-500", "bg-yellow-500", "bg-green-500", "bg-emerald-400"];

    // Floating particles
    useEffect(() => {
        const container = document.querySelector('.signup-particles');
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
        animation: floatUpSignup ${Math.random() * 6 + 4}s linear forwards;
      `;
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 10000);
        };

        const interval = setInterval(createParticle, 200);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="signup-page min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,107,53,0.12),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMyAxLjM0MyAzIDNzLTEuMzQzIDMtMyAzLTMtMS4zNDMtMy0zIDEuMzQzLTMgMy0zeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            </div>

            {/* Glow Orbs */}
            <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-orange-500/8 rounded-full blur-[130px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[15%] right-[15%] w-[280px] h-[280px] bg-purple-500/8 rounded-full blur-[110px] animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

            {/* Particles */}
            <div className="signup-particles absolute inset-0 pointer-events-none overflow-hidden"></div>

            {/* Back */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/60 hover:text-orange-500 transition-all duration-300 group"
            >
                <i className="ri-arrow-left-line text-xl group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span className="text-sm uppercase tracking-wider">Back</span>
            </Link>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4 my-8">
                <div className="absolute -inset-[1px] bg-gradient-to-b from-orange-500/30 via-white/10 to-purple-500/20 rounded-3xl blur-[1px]"></div>

                <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-orange-500/20">
                            <i className="ri-user-add-fill text-3xl text-white"></i>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">
                            Join the <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Arena</span>
                        </h1>
                        <p className="text-white/40 text-sm">
                            Create your gaming profile and start playing
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-white/10'}`}></div>
                        <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/10'}`}></div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        {step === 1 && (
                            <>
                                {/* Username */}
                                <div className="group">
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <i className="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Choose a gamer tag"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 
                        focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="group">
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="player@example.com"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 
                        focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (formData.username && formData.email) setStep(2);
                                    }}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 font-bold uppercase tracking-wider text-sm
                    hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Continue
                                    <i className="ri-arrow-right-line"></i>
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Password */}
                                <div className="group">
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a strong password"
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

                                    {/* Strength Bar */}
                                    {formData.password && (
                                        <div className="mt-3">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`}></div>
                                                ))}
                                            </div>
                                            <p className={`text-xs ${strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                                                {strengthLabels[strength]}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="group">
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <i className="ri-lock-check-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-500 transition-colors"></i>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/25 
                        focus:outline-none focus:bg-white/[0.07] focus:ring-1 transition-all duration-300
                        ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                    : 'border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20'}`}
                                            required
                                        />
                                        {formData.confirmPassword && (
                                            <i className={`absolute right-4 top-1/2 -translate-y-1/2 ${formData.password === formData.confirmPassword ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
                                        )}
                                    </div>
                                </div>

                                {/* Terms */}
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div
                                        onClick={() => setAgreeTerms(!agreeTerms)}
                                        className={`w-4 h-4 mt-0.5 rounded border transition-all duration-300 flex items-center justify-center cursor-pointer flex-shrink-0
                      ${agreeTerms ? 'bg-orange-500 border-orange-500' : 'border-white/20 hover:border-orange-500/50'}`}
                                    >
                                        {agreeTerms && <i className="ri-check-line text-[10px] text-white"></i>}
                                    </div>
                                    <span className="text-white/40 text-sm leading-relaxed">
                                        I agree to the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
                                    </span>
                                </label>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-wider"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !agreeTerms || formData.password !== formData.confirmPassword}
                                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 font-bold uppercase tracking-wider text-sm
                      hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                                    >
                                        <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                            <i className="ri-rocket-2-fill"></i>
                                            Create Account
                                        </span>
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-white/40 text-sm mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors relative group">
                            Sign In
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes floatUpSignup {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

export default Signup;
