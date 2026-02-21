import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState(3);
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    // Player profile data
    const player = {
        name: "ViceCity_Player",
        level: 42,
        xp: 7850,
        xpNext: 10000,
        rank: "Diamond",
        avatar: "🎮",
        joinDate: "Jan 2024",
        totalPlaytime: "1,247h",
        gamesOwned: 24,
        achievements: 156,
        friends: 89,
    };

    // Stats data
    const stats = [
        { icon: "ri-gamepad-fill", label: "Games Owned", value: "24", change: "+3", color: "from-orange-500 to-pink-500" },
        { icon: "ri-trophy-fill", label: "Achievements", value: "156", change: "+12", color: "from-yellow-500 to-orange-500" },
        { icon: "ri-time-fill", label: "Hours Played", value: "1,247", change: "+48", color: "from-blue-500 to-cyan-500" },
        { icon: "ri-group-fill", label: "Friends Online", value: "23", change: "+5", color: "from-green-500 to-emerald-500" },
    ];

    // Recent games
    const recentGames = [
        { id: 1, title: "GTA V Online", lastPlayed: "2 hours ago", hours: "342h", progress: 78, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg" },
        { id: 2, title: "Red Dead Redemption 2", lastPlayed: "Yesterday", hours: "186h", progress: 92, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg" },
        { id: 3, title: "Cyberpunk 2077", lastPlayed: "3 days ago", hours: "124h", progress: 65, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg" },
        { id: 4, title: "Elden Ring", lastPlayed: "1 week ago", hours: "210h", progress: 88, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg" },
        { id: 5, title: "Call of Duty: MW3", lastPlayed: "5 days ago", hours: "89h", progress: 45, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_600x900.jpg" },
        { id: 6, title: "EA FC 25", lastPlayed: "4 days ago", hours: "67h", progress: 55, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2669320/library_600x900.jpg" },
    ];

    // Achievements
    const achievements = [
        { id: 1, title: "First Blood", desc: "Win your first match", icon: "ri-sword-fill", rarity: "Common", unlocked: true, color: "text-green-400" },
        { id: 2, title: "Road Warrior", desc: "Drive 1000 miles total", icon: "ri-roadster-fill", rarity: "Rare", unlocked: true, color: "text-blue-400" },
        { id: 3, title: "Headhunter", desc: "100 headshots in multiplayer", icon: "ri-crosshair-fill", rarity: "Epic", unlocked: true, color: "text-purple-400" },
        { id: 4, title: "Legend Status", desc: "Reach level 100", icon: "ri-vip-crown-fill", rarity: "Legendary", unlocked: false, color: "text-orange-400" },
        { id: 5, title: "Social Butterfly", desc: "Add 100 friends", icon: "ri-heart-fill", rarity: "Rare", unlocked: true, color: "text-pink-400" },
        { id: 6, title: "Completionist", desc: "100% any game", icon: "ri-medal-fill", rarity: "Epic", unlocked: false, color: "text-yellow-400" },
    ];

    // Friends
    const friends = [
        { name: "TommyVercetti", status: "online", game: "GTA V Online", avatar: "🎯" },
        { name: "CJ_GroveStreet", status: "online", game: "Red Dead Online", avatar: "🔫" },
        { name: "NikoBellic_IV", status: "away", game: "Cyberpunk 2077", avatar: "🎲" },
        { name: "TrevorPhilips", status: "online", game: "Elden Ring", avatar: "💀" },
        { name: "FranklinClinton", status: "offline", game: "Last seen 3h ago", avatar: "🏎️" },
        { name: "MichaelDeSanta", status: "online", game: "GTA V Online", avatar: "🎬" },
    ];

    // Notifications data
    const notifList = [
        { id: 1, text: "GTA VI Pre-order is now available!", time: "5 min ago", icon: "ri-fire-fill", iconColor: "text-orange-500" },
        { id: 2, text: "TommyVercetti sent you a friend request", time: "1 hour ago", icon: "ri-user-add-fill", iconColor: "text-blue-400" },
        { id: 3, text: "New achievement unlocked: Road Warrior", time: "3 hours ago", icon: "ri-trophy-fill", iconColor: "text-yellow-500" },
    ];

    // Weekly activity data
    const weeklyActivity = [
        { day: "Mon", hours: 4.5 },
        { day: "Tue", hours: 6.2 },
        { day: "Wed", hours: 3.8 },
        { day: "Thu", hours: 7.1 },
        { day: "Fri", hours: 8.3 },
        { day: "Sat", hours: 10.5 },
        { day: "Sun", hours: 9.2 },
    ];
    const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

    // Sidebar nav items
    const sidebarItems = [
        { id: "overview", icon: "ri-dashboard-fill", label: "Overview" },
        { id: "library", icon: "ri-gamepad-fill", label: "Game Library" },
        { id: "achievements", icon: "ri-trophy-fill", label: "Achievements" },
        { id: "friends", icon: "ri-group-fill", label: "Friends" },
        { id: "store", icon: "ri-shopping-bag-fill", label: "Store" },
        { id: "settings", icon: "ri-settings-3-fill", label: "Settings" },
    ];

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="dashboard-page min-h-screen w-full bg-[#0a0a0a] text-white flex overflow-hidden">
            {/* ================== SIDEBAR ================== */}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-black/90 backdrop-blur-xl border-r border-white/5 
        flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* Sidebar Header */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                                <i className="ri-gamepad-fill text-xl text-white"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-black tracking-wider">GTA <span className="text-orange-500">HUB</span></h2>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest">Gaming Dashboard</p>
                            </div>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/50 hover:text-white">
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Player Card */}
                <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">
                            {player.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{player.name}</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-400 text-[10px] uppercase tracking-wider">Online</span>
                            </div>
                        </div>
                    </div>
                    {/* Level Progress */}
                    <div>
                        <div className="flex justify-between text-[10px] text-white/40 mb-1">
                            <span>Level {player.level}</span>
                            <span>{player.xp}/{player.xpNext} XP</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-1000"
                                style={{ width: `${(player.xp / player.xpNext) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 group
                ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/10 text-orange-500 border border-orange-500/20 shadow-lg shadow-orange-500/5'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                        >
                            <i className={`${item.icon} text-lg ${activeTab === item.id ? 'text-orange-500' : 'group-hover:text-orange-500'} transition-colors`}></i>
                            <span className="font-medium">{item.label}</span>
                            {activeTab === item.id && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                        <i className="ri-logout-box-r-line text-lg"></i>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Sidebar Overlay (mobile) */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* ================== MAIN CONTENT ================== */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {/* TOP NAVBAR */}
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-4 md:px-8 py-4">
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white/60 hover:text-white">
                                <i className="ri-menu-2-line text-2xl"></i>
                            </button>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
                                <p className="text-white/40 text-xs">Welcome back, {player.name}</p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-4 md:mx-8">
                            <div className="relative">
                                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search games, friends..."
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30
                    focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.07] transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 relative"
                                >
                                    <i className="ri-notification-3-line text-lg text-white/70"></i>
                                    {notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-[10px] font-bold flex items-center justify-center animate-pulse">
                                            {notifications}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Dropdown */}
                                {showNotif && (
                                    <div className="absolute right-0 top-14 w-80 bg-[#141414] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="font-bold text-sm">Notifications</h3>
                                            <button onClick={() => setNotifications(0)} className="text-xs text-orange-500 hover:text-orange-400">Mark all read</button>
                                        </div>
                                        {notifList.map((n) => (
                                            <div key={n.id} className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3 border-b border-white/5 last:border-0">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    <i className={`${n.icon} ${n.iconColor}`}></i>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-white/80 leading-tight">{n.text}</p>
                                                    <p className="text-[10px] text-white/30 mt-1">{n.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-sm">
                                        {player.avatar}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium">{player.name}</span>
                                    <i className={`ri-arrow-down-s-line text-white/40 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`}></i>
                                </button>

                                {showProfile && (
                                    <div className="absolute right-0 top-14 w-64 bg-[#141414] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl">
                                                    {player.avatar}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">{player.name}</h4>
                                                    <p className="text-[10px] text-white/40">Level {player.level} · {player.rank}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <button className="w-full px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                                <i className="ri-user-line"></i> Profile
                                            </button>
                                            <button className="w-full px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                                <i className="ri-settings-3-line"></i> Settings
                                            </button>
                                            <button onClick={handleLogout} className="w-full px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                                                <i className="ri-logout-box-r-line"></i> Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* ================== MAIN DASHBOARD CONTENT ================== */}
                <div className="p-4 md:p-8 space-y-8">

                    {/* ===== OVERVIEW TAB ===== */}
                    {activeTab === "overview" && (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-2px]">
                                        {/* Glow on hover */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                                    <i className={`${stat.icon} text-lg`}></i>
                                                </div>
                                                <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black mb-1">{stat.value}</h3>
                                            <p className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Activity Chart + Quick Actions */}
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Weekly Activity */}
                                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="font-bold text-lg">Weekly Activity</h3>
                                            <p className="text-white/40 text-xs mt-1">Your gaming hours this week</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                            Hours Played
                                        </div>
                                    </div>

                                    {/* Bar Chart */}
                                    <div className="flex items-end justify-between gap-2 md:gap-4 h-[200px] px-2">
                                        {weeklyActivity.map((day, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <span className="text-xs text-white/60 font-medium">{day.hours}h</span>
                                                <div className="w-full relative flex-1 flex items-end">
                                                    <div
                                                        className="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-pink-500 transition-all duration-700 hover:from-orange-400 hover:to-pink-400 cursor-pointer group relative"
                                                        style={{
                                                            height: `${(day.hours / maxHours) * 100}%`,
                                                            animationDelay: `${i * 100}ms`
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-white/40 uppercase tracking-wider">{day.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                                                <i className="ri-play-fill text-lg"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold">Resume Playing</p>
                                                <p className="text-[10px] text-white/40">GTA V Online</p>
                                            </div>
                                            <i className="ri-arrow-right-s-line ml-auto text-white/30 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"></i>
                                        </button>

                                        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                                <i className="ri-download-2-fill text-lg"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold">Downloads</p>
                                                <p className="text-[10px] text-white/40">2 updates pending</p>
                                            </div>
                                            <i className="ri-arrow-right-s-line ml-auto text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"></i>
                                        </button>

                                        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                                <i className="ri-user-add-fill text-lg"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold">Friend Requests</p>
                                                <p className="text-[10px] text-white/40">5 pending</p>
                                            </div>
                                            <i className="ri-arrow-right-s-line ml-auto text-white/30 group-hover:text-green-400 group-hover:translate-x-1 transition-all"></i>
                                        </button>

                                        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                                <i className="ri-store-2-fill text-lg"></i>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold">Visit Store</p>
                                                <p className="text-[10px] text-white/40">New deals available</p>
                                            </div>
                                            <i className="ri-arrow-right-s-line ml-auto text-white/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recently Played */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-bold text-lg">Recently Played</h3>
                                        <p className="text-white/40 text-xs mt-1">Pick up where you left off</p>
                                    </div>
                                    <button onClick={() => setActiveTab("library")} className="text-orange-500 text-sm hover:text-orange-400 flex items-center gap-1 transition-colors">
                                        View All <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {recentGames.map((game) => (
                                        <div key={game.id} className="group cursor-pointer">
                                            <div className="relative rounded-xl overflow-hidden mb-3 aspect-[3/4]">
                                                <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                                    <div className="w-12 h-12 rounded-full bg-orange-500/90 backdrop-blur flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                                                        <i className="ri-play-fill text-xl"></i>
                                                    </div>
                                                </div>
                                                {/* Progress indicator */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                                    <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-r-full" style={{ width: `${game.progress}%` }}></div>
                                                </div>
                                            </div>
                                            <h4 className="font-semibold text-sm truncate group-hover:text-orange-500 transition-colors">{game.title}</h4>
                                            <p className="text-white/40 text-xs mt-0.5">{game.lastPlayed} · {game.hours}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* GTA VI Pre-order Banner */}
                            <div className="relative rounded-2xl overflow-hidden p-8 md:p-12">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-red-600/20 to-pink-600/30"></div>
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>

                                <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                    <div className="flex-1">
                                        <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                                            🔥 Pre-Order Now
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-black mb-3">
                                            GTA <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">VI</span> is Coming
                                        </h2>
                                        <p className="text-white/50 text-sm max-w-md mb-6">
                                            Be the first to experience the next chapter. Pre-order now and get exclusive in-game bonuses, early access perks, and more.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                                                Pre-Order $69.99
                                            </button>
                                            <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 font-medium text-sm hover:bg-white/15 transition-all duration-300">
                                                Watch Trailer
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-8xl md:text-[10rem] font-black opacity-10 select-none" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                                        VI
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ===== LIBRARY TAB ===== */}
                    {activeTab === "library" && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-black">My Game Library</h2>
                                    <p className="text-white/40 text-sm">{recentGames.length} games owned</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
                                        <i className="ri-filter-3-line mr-2"></i>Filter
                                    </button>
                                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                                        <i className="ri-add-line mr-2"></i>Add Game
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                                {recentGames.map((game) => (
                                    <div key={game.id} className="group cursor-pointer">
                                        <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[3/4] shadow-lg">
                                            <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                                                <button className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl hover:shadow-orange-500/30">
                                                    <i className="ri-play-fill text-2xl"></i>
                                                </button>
                                                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Play Now</span>
                                            </div>

                                            {/* Bottom info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] text-white/50">{game.hours}</span>
                                                    <span className="text-[10px] text-orange-400">{game.progress}%</span>
                                                </div>
                                                <div className="w-full h-0.5 bg-white/10 rounded-full mt-1">
                                                    <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" style={{ width: `${game.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-sm truncate group-hover:text-orange-500 transition-colors">{game.title}</h4>
                                        <p className="text-white/30 text-xs">{game.lastPlayed}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ===== ACHIEVEMENTS TAB ===== */}
                    {activeTab === "achievements" && (
                        <>
                            {/* Achievement Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                    <h4 className="text-3xl font-black text-orange-500">156</h4>
                                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Total Unlocked</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                    <h4 className="text-3xl font-black text-yellow-500">12</h4>
                                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Legendary</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                    <h4 className="text-3xl font-black text-purple-500">34</h4>
                                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Epic</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                    <h4 className="text-3xl font-black text-green-500">78%</h4>
                                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Completion</p>
                                </div>
                            </div>

                            {/* Achievement List */}
                            <h3 className="font-bold text-lg mb-4">Recent Achievements</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer
                      ${ach.unlocked
                                                ? 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                                                : 'bg-white/[0.01] border-white/5 opacity-50'}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                        ${ach.unlocked ? 'bg-gradient-to-br from-orange-500/20 to-pink-500/10' : 'bg-white/5'}
                        ${ach.color} transition-colors`}
                                            >
                                                <i className={ach.icon}></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-sm">{ach.title}</h4>
                                                    {ach.unlocked && <i className="ri-check-double-line text-green-500 text-sm"></i>}
                                                </div>
                                                <p className="text-white/40 text-xs mb-2">{ach.desc}</p>
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider
                          ${ach.rarity === 'Common' ? 'bg-green-500/10 text-green-400' : ''}
                          ${ach.rarity === 'Rare' ? 'bg-blue-500/10 text-blue-400' : ''}
                          ${ach.rarity === 'Epic' ? 'bg-purple-500/10 text-purple-400' : ''}
                          ${ach.rarity === 'Legendary' ? 'bg-orange-500/10 text-orange-400' : ''}
                        `}>
                                                    {ach.rarity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ===== FRIENDS TAB ===== */}
                    {activeTab === "friends" && (
                        <>
                            {/* Friends Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-black">Friends</h2>
                                    <p className="text-white/40 text-sm">{friends.filter(f => f.status === 'online').length} online · {friends.length} total</p>
                                </div>
                                <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2">
                                    <i className="ri-user-add-line"></i> Add Friend
                                </button>
                            </div>

                            <div className="space-y-2">
                                {friends.map((friend, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
                                                {friend.avatar}
                                            </div>
                                            <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a]
                        ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'away' ? 'bg-yellow-500' : 'bg-white/30'}`}
                                            ></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm group-hover:text-orange-500 transition-colors">{friend.name}</h4>
                                            <p className="text-white/40 text-xs flex items-center gap-1.5">
                                                {friend.status === 'online' && <i className="ri-gamepad-line text-green-400"></i>}
                                                {friend.game}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all opacity-0 group-hover:opacity-100">
                                                <i className="ri-message-3-line"></i>
                                            </button>
                                            <button className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 transition-all opacity-0 group-hover:opacity-100">
                                                <i className="ri-user-follow-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ===== STORE TAB ===== */}
                    {activeTab === "store" && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                                <i className="ri-store-2-fill text-4xl"></i>
                            </div>
                            <h2 className="text-3xl font-black mb-3">
                                Game <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Store</span>
                            </h2>
                            <p className="text-white/40 max-w-md mx-auto mb-8">
                                Browse thousands of games, DLCs, and in-game items. Special deals and new releases updated daily.
                            </p>
                            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                                Coming Soon
                            </button>
                        </div>
                    )}

                    {/* ===== SETTINGS TAB ===== */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-black mb-6">Settings</h2>

                            <div className="space-y-4">
                                {/* Profile Section */}
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">Profile</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-3xl">
                                            {player.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{player.name}</h4>
                                            <p className="text-white/40 text-sm">Member since {player.joinDate}</p>
                                        </div>
                                        <button className="ml-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                {/* Preferences */}
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">Preferences</h3>

                                    {[
                                        { label: "Email Notifications", desc: "Get updates about games and events", icon: "ri-mail-line" },
                                        { label: "Friend Requests", desc: "Allow others to send friend requests", icon: "ri-user-add-line" },
                                        { label: "Online Status", desc: "Show when you're online", icon: "ri-wifi-line" },
                                        { label: "Game Activity", desc: "Share what you're playing", icon: "ri-gamepad-line" },
                                    ].map((pref, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <i className={`${pref.icon} text-lg text-white/40`}></i>
                                                <div>
                                                    <p className="text-sm font-medium">{pref.label}</p>
                                                    <p className="text-[11px] text-white/30">{pref.desc}</p>
                                                </div>
                                            </div>
                                            <div className="w-11 h-6 rounded-full bg-orange-500 p-0.5 cursor-pointer">
                                                <div className="w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Danger Zone */}
                                <div className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-red-400/60 mb-4">Danger Zone</h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Delete Account</p>
                                            <p className="text-[11px] text-white/30">Permanently remove your account and data</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default Dashboard;
