import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { gamesList, storeGames, achievementsList, friendsList, defaultNotifications, weeklyActivity, statsConfig, sidebarItems } from "./dashboardData";
import { ChatModal, EditProfileModal, AddFriendModal, DeleteAccountModal, GameLaunchToast } from "./DashboardModals";
import "remixicon/fonts/remixicon.css";

function Dashboard() {
    const { user, logout, updateProfile, deleteAccount } = useAuth();
    const navigate = useNavigate();

    // Core state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Data state
    const [notifications, setNotifications] = useState(defaultNotifications);
    const [ownedGames, setOwnedGames] = useState(gamesList);
    const [achievements, setAchievements] = useState(achievementsList);
    const [friends, setFriends] = useState(friendsList);
    const [preferences, setPreferences] = useState({ emailNotifications: true, friendRequests: true, onlineStatus: true, gameActivity: true });

    // Modal state
    const [chatFriend, setChatFriend] = useState(null);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [launchingGame, setLaunchingGame] = useState(null);
    const [libraryFilter, setLibraryFilter] = useState("all");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const player = {
        name: user?.username || "Player",
        avatar: user?.avatar || "🎮",
        level: user?.level || 42,
        xp: user?.xp || 7850,
        xpNext: user?.xpNext || 10000,
        rank: user?.rank || "Diamond",
        email: user?.email || "",
        joinDate: user?.joinDate || "Jan 2024",
    };

    // Stats computed from state
    const statsValues = { games: ownedGames.length, achievements: achievements.filter(a => a.unlocked).length, hours: "1,247", friends: friends.filter(f => f.status === 'online').length };
    const statsChanges = { games: "+3", achievements: "+12", hours: "+48", friends: `+${friends.filter(f => f.status === 'online').length}` };
    const maxHours = Math.max(...weeklyActivity.map(d => d.hours));
    const unreadCount = notifications.filter(n => !n.read).length;

    // Handlers
    const handleLogout = () => { logout(); navigate("/"); };
    const handleLaunchGame = (title) => { setLaunchingGame(title); setTimeout(() => setLaunchingGame(null), 3000); };
    const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const handleDismissNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
    const handleTogglePref = (key) => setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    const handleRemoveGame = (id) => setOwnedGames(prev => prev.filter(g => g.id !== id));
    const handleRemoveFriend = (id) => setFriends(prev => prev.filter(f => f.id !== id));
    const handleBuyGame = (game) => {
        if (ownedGames.find(g => g.title === game.title)) return;
        setOwnedGames(prev => [...prev, { ...game, lastPlayed: "Just added", hours: "0h", progress: 0 }]);
        setNotifications(prev => [{ id: Date.now(), text: `${game.title} added to library!`, time: "Just now", icon: "ri-shopping-bag-fill", iconColor: "text-green-500", read: false }, ...prev]);
    };
    const handleAddFriend = (tag) => {
        setFriends(prev => [...prev, { id: Date.now(), name: tag, status: "offline", game: "Invite sent", avatar: "👋" }]);
        setNotifications(prev => [{ id: Date.now(), text: `Friend request sent to ${tag}`, time: "Just now", icon: "ri-user-add-fill", iconColor: "text-green-500", read: false }, ...prev]);
    };
    const handleDeleteAccount = () => { deleteAccount(); navigate("/"); };
    const handleSaveProfile = (data) => { updateProfile(data); };
    const switchTab = (tab) => { setActiveTab(tab); setSidebarOpen(false); setShowProfile(false); setShowNotif(false); };

    // Search filter
    const filteredGames = ownedGames.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Library filter
    const libraryGames = filteredGames.filter(g => {
        if (libraryFilter === "all") return true;
        if (libraryFilter === "recent") return g.lastPlayed.includes("ago") || g.lastPlayed === "Yesterday";
        if (libraryFilter === "completed") return g.progress >= 90;
        return true;
    });

    return (
        <div className="dashboard-page min-h-screen w-full bg-[#0a0a0a] text-white flex overflow-hidden">
            {/* SIDEBAR */}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-black/90 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/50 hover:text-white"><i className="ri-close-line text-xl"></i></button>
                    </div>
                </div>

                {/* Player Card */}
                <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">{player.avatar}</div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{player.name}</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-400 text-[10px] uppercase tracking-wider">Online</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] text-white/40 mb-1">
                            <span>Level {player.level}</span><span>{player.xp}/{player.xpNext} XP</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-1000" style={{ width: `${(player.xp / player.xpNext) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
                    {sidebarItems.map(item => (
                        <button key={item.id} onClick={() => switchTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 group
                ${activeTab === item.id ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/10 text-orange-500 border border-orange-500/20 shadow-lg shadow-orange-500/5' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                            <i className={`${item.icon} text-lg ${activeTab === item.id ? 'text-orange-500' : 'group-hover:text-orange-500'} transition-colors`}></i>
                            <span className="font-medium">{item.label}</span>
                            {item.id === "friends" && friends.filter(f => f.status === 'online').length > 0 && (
                                <span className="ml-auto text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">{friends.filter(f => f.status === 'online').length}</span>
                            )}
                            {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300">
                        <i className="ri-logout-box-r-line text-lg"></i><span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-4 md:px-8 py-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white/60 hover:text-white"><i className="ri-menu-2-line text-2xl"></i></button>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold capitalize">{activeTab === "overview" ? "Dashboard" : activeTab}</h1>
                                <p className="text-white/40 text-xs">Welcome back, {player.name}</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md mx-4 md:mx-8">
                            <div className="relative">
                                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search games, friends..." className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.07] transition-all duration-300" />
                                {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"><i className="ri-close-line"></i></button>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <div className="relative">
                                <button onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 relative">
                                    <i className="ri-notification-3-line text-lg text-white/70"></i>
                                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-[10px] font-bold flex items-center justify-center animate-pulse">{unreadCount}</span>}
                                </button>
                                {showNotif && (
                                    <div className="absolute right-0 top-14 w-80 bg-[#141414] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="font-bold text-sm">Notifications ({unreadCount})</h3>
                                            <button onClick={handleMarkAllRead} className="text-xs text-orange-500 hover:text-orange-400">Mark all read</button>
                                        </div>
                                        {notifications.length === 0 ? (
                                            <div className="p-6 text-center text-white/30 text-sm">No notifications</div>
                                        ) : notifications.map(n => (
                                            <div key={n.id} className={`px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3 border-b border-white/5 last:border-0 ${n.read ? 'opacity-50' : ''}`}>
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><i className={`${n.icon} ${n.iconColor}`}></i></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-white/80 leading-tight">{n.text}</p>
                                                    <p className="text-[10px] text-white/30 mt-1">{n.time}</p>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); handleDismissNotif(n.id); }} className="text-white/20 hover:text-red-400 flex-shrink-0"><i className="ri-close-line text-sm"></i></button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-sm">{player.avatar}</div>
                                    <span className="hidden md:block text-sm font-medium">{player.name}</span>
                                    <i className={`ri-arrow-down-s-line text-white/40 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`}></i>
                                </button>
                                {showProfile && (
                                    <div className="absolute right-0 top-14 w-64 bg-[#141414] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="p-4 border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl">{player.avatar}</div>
                                                <div><h4 className="font-bold text-sm">{player.name}</h4><p className="text-[10px] text-white/40">Level {player.level} · {player.rank}</p></div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <button onClick={() => { setShowEditProfile(true); setShowProfile(false); }} className="w-full px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                                <i className="ri-user-line"></i> Edit Profile
                                            </button>
                                            <button onClick={() => { switchTab("settings"); }} className="w-full px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
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

                {/* TAB CONTENT */}
                <div className="p-4 md:p-8 space-y-8">

                    {/* OVERVIEW */}
                    {activeTab === "overview" && (<>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {statsConfig.map((stat, i) => (
                                <div key={i} onClick={() => switchTab(i === 0 ? 'library' : i === 1 ? 'achievements' : i === 3 ? 'friends' : 'overview')}
                                    className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}><i className={`${stat.icon} text-lg`}></i></div>
                                            <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full">{statsChanges[stat.key]}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black mb-1">{statsValues[stat.key]}</h3>
                                        <p className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activity + Quick Actions */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <div><h3 className="font-bold text-lg">Weekly Activity</h3><p className="text-white/40 text-xs mt-1">Your gaming hours this week</p></div>
                                    <div className="flex items-center gap-2 text-xs text-white/40"><span className="w-2 h-2 rounded-full bg-orange-500"></span>Hours Played</div>
                                </div>
                                <div className="flex items-end justify-between gap-2 md:gap-4 h-[200px] px-2">
                                    {weeklyActivity.map((day, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <span className="text-xs text-white/60 font-medium">{day.hours}h</span>
                                            <div className="w-full relative flex-1 flex items-end">
                                                <div className="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-pink-500 transition-all duration-700 hover:from-orange-400 hover:to-pink-400 cursor-pointer group relative"
                                                    style={{ height: `${(day.hours / maxHours) * 100}%` }}>
                                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-white/40 uppercase tracking-wider">{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Resume Playing", sub: ownedGames[0]?.title || "No games", icon: "ri-play-fill", gradient: "from-orange-500 to-pink-500", action: () => handleLaunchGame(ownedGames[0]?.title) },
                                        { label: "Downloads", sub: "2 updates pending", icon: "ri-download-2-fill", gradient: "from-blue-500 to-cyan-500", action: () => switchTab("library") },
                                        { label: "Friend Requests", sub: `${friends.length} friends`, icon: "ri-user-add-fill", gradient: "from-green-500 to-emerald-500", action: () => switchTab("friends") },
                                        { label: "Visit Store", sub: "New deals available", icon: "ri-store-2-fill", gradient: "from-purple-500 to-indigo-500", action: () => switchTab("store") },
                                    ].map((item, i) => (
                                        <button key={i} onClick={item.action} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center`}><i className={`${item.icon} text-lg`}></i></div>
                                            <div className="text-left"><p className="text-sm font-semibold">{item.label}</p><p className="text-[10px] text-white/40">{item.sub}</p></div>
                                            <i className="ri-arrow-right-s-line ml-auto text-white/30 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recently Played */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div><h3 className="font-bold text-lg">Recently Played</h3><p className="text-white/40 text-xs mt-1">Pick up where you left off</p></div>
                                <button onClick={() => switchTab("library")} className="text-orange-500 text-sm hover:text-orange-400 flex items-center gap-1 transition-colors">View All <i className="ri-arrow-right-line"></i></button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {filteredGames.slice(0, 6).map(game => (
                                    <div key={game.id} className="group cursor-pointer" onClick={() => handleLaunchGame(game.title)}>
                                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-[3/4]">
                                            <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                                <div className="w-12 h-12 rounded-full bg-orange-500/90 backdrop-blur flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg"><i className="ri-play-fill text-xl"></i></div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-r-full" style={{ width: `${game.progress}%` }}></div></div>
                                        </div>
                                        <h4 className="font-semibold text-sm truncate group-hover:text-orange-500 transition-colors">{game.title}</h4>
                                        <p className="text-white/40 text-xs mt-0.5">{game.lastPlayed} · {game.hours}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* GTA VI Banner */}
                        <div className="relative rounded-2xl overflow-hidden p-8 md:p-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-red-600/20 to-pink-600/30"></div>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]"></div>
                            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">🔥 Pre-Order Now</span>
                                    <h2 className="text-3xl md:text-4xl font-black mb-3">GTA <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">VI</span> is Coming</h2>
                                    <p className="text-white/50 text-sm max-w-md mb-6">Be the first to experience the next chapter. Pre-order now and get exclusive in-game bonuses.</p>
                                    <div className="flex flex-wrap gap-3">
                                        <button onClick={() => handleBuyGame({ id: 999, title: "GTA VI", price: 69.99 })} className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                                            {ownedGames.find(g => g.title === "GTA VI") ? "✓ Pre-Ordered" : "Pre-Order $69.99"}
                                        </button>
                                        <button onClick={() => window.open("https://www.youtube.com/watch?v=QdBZY2fkU-0", "_blank")} className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 font-medium text-sm hover:bg-white/15 transition-all duration-300 flex items-center gap-2">
                                            <i className="ri-play-circle-line"></i> Watch Trailer
                                        </button>
                                    </div>
                                </div>
                                <div className="text-8xl md:text-[10rem] font-black opacity-10 select-none">VI</div>
                            </div>
                        </div>
                    </>)}

                    {/* LIBRARY */}
                    {activeTab === "library" && (<>
                        <div className="flex items-center justify-between mb-6">
                            <div><h2 className="text-2xl font-black">My Game Library</h2><p className="text-white/40 text-sm">{libraryGames.length} games</p></div>
                            <div className="flex items-center gap-3 relative">
                                <div className="relative">
                                    <button onClick={() => setShowFilterMenu(!showFilterMenu)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
                                        <i className="ri-filter-3-line mr-2"></i>{libraryFilter === "all" ? "All" : libraryFilter === "recent" ? "Recent" : "Completed"}
                                    </button>
                                    {showFilterMenu && (
                                        <div className="absolute right-0 top-12 w-40 bg-[#141414] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                                            {["all", "recent", "completed"].map(f => (
                                                <button key={f} onClick={() => { setLibraryFilter(f); setShowFilterMenu(false); }}
                                                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors capitalize ${libraryFilter === f ? 'text-orange-500' : 'text-white/60'}`}>{f}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                            {libraryGames.map(game => (
                                <div key={game.id} className="group cursor-pointer relative">
                                    <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[3/4] shadow-lg">
                                        <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                                            <button onClick={() => handleLaunchGame(game.title)} className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl"><i className="ri-play-fill text-2xl"></i></button>
                                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Play Now</span>
                                            <button onClick={(e) => { e.stopPropagation(); handleRemoveGame(game.id); }} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/40">
                                                <i className="ri-delete-bin-line text-red-400 text-sm"></i>
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <div className="flex items-center justify-between"><span className="text-[10px] text-white/50">{game.hours}</span><span className="text-[10px] text-orange-400">{game.progress}%</span></div>
                                            <div className="w-full h-0.5 bg-white/10 rounded-full mt-1"><div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" style={{ width: `${game.progress}%` }}></div></div>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-sm truncate group-hover:text-orange-500 transition-colors">{game.title}</h4>
                                    <p className="text-white/30 text-xs">{game.lastPlayed}</p>
                                </div>
                            ))}
                        </div>
                    </>)}

                    {/* ACHIEVEMENTS */}
                    {activeTab === "achievements" && (<>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {[
                                { val: achievements.filter(a => a.unlocked).length, label: "Unlocked", color: "text-orange-500" },
                                { val: achievements.filter(a => a.rarity === "Legendary").length, label: "Legendary", color: "text-yellow-500" },
                                { val: achievements.filter(a => a.rarity === "Epic").length, label: "Epic", color: "text-purple-500" },
                                { val: `${Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%`, label: "Completion", color: "text-green-500" },
                            ].map((s, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                    <h4 className={`text-3xl font-black ${s.color}`}>{s.val}</h4>
                                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <h3 className="font-bold text-lg mb-4">All Achievements</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map(ach => (
                                <div key={ach.id} className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${ach.unlocked ? 'bg-white/[0.03] border-white/5 hover:border-white/15' : 'bg-white/[0.01] border-white/5 opacity-50'}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${ach.unlocked ? 'bg-gradient-to-br from-orange-500/20 to-pink-500/10' : 'bg-white/5'} ${ach.color}`}><i className={ach.icon}></i></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1"><h4 className="font-bold text-sm">{ach.title}</h4>{ach.unlocked && <i className="ri-check-double-line text-green-500 text-sm"></i>}</div>
                                            <p className="text-white/40 text-xs mb-2">{ach.desc}</p>
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider
                        ${ach.rarity === 'Common' ? 'bg-green-500/10 text-green-400' : ''} ${ach.rarity === 'Rare' ? 'bg-blue-500/10 text-blue-400' : ''}
                        ${ach.rarity === 'Epic' ? 'bg-purple-500/10 text-purple-400' : ''} ${ach.rarity === 'Legendary' ? 'bg-orange-500/10 text-orange-400' : ''}`}>{ach.rarity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>)}

                    {/* FRIENDS */}
                    {activeTab === "friends" && (<>
                        <div className="flex items-center justify-between mb-6">
                            <div><h2 className="text-2xl font-black">Friends</h2><p className="text-white/40 text-sm">{friends.filter(f => f.status === 'online').length} online · {friends.length} total</p></div>
                            <button onClick={() => setShowAddFriend(true)} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2">
                                <i className="ri-user-add-line"></i> Add Friend
                            </button>
                        </div>
                        <div className="space-y-2">
                            {filteredFriends.map(friend => (
                                <div key={friend.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">{friend.avatar}</div>
                                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'away' ? 'bg-yellow-500' : 'bg-white/30'}`}></span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm group-hover:text-orange-500 transition-colors">{friend.name}</h4>
                                        <p className="text-white/40 text-xs flex items-center gap-1.5">{friend.status === 'online' && <i className="ri-gamepad-line text-green-400"></i>}{friend.game}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setChatFriend(friend)} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-500 transition-all opacity-0 group-hover:opacity-100" title="Message"><i className="ri-message-3-line"></i></button>
                                        <button onClick={() => handleRemoveFriend(friend.id)} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100" title="Remove"><i className="ri-user-unfollow-line"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>)}

                    {/* STORE */}
                    {activeTab === "store" && (<>
                        <div className="flex items-center justify-between mb-6">
                            <div><h2 className="text-2xl font-black">Game Store</h2><p className="text-white/40 text-sm">Browse and buy games</p></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {storeGames.map(game => {
                                const owned = ownedGames.find(g => g.title === game.title);
                                return (
                                    <div key={game.id} className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
                                        <div className="relative aspect-[3/4]">
                                            <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${game.tag === 'Sale' ? 'bg-red-500' : game.tag === 'New' ? 'bg-blue-500' : 'bg-orange-500'}`}>{game.tag}</span>
                                            </div>
                                            {game.discount > 0 && <div className="absolute top-3 right-3 bg-green-500 px-2 py-1 rounded-lg text-[10px] font-bold">-{game.discount}%</div>}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-sm mb-2">{game.title}</h4>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {game.discount > 0 && <span className="text-white/30 text-xs line-through mr-2">${game.price}</span>}
                                                    <span className="text-orange-500 font-bold">${(game.price * (1 - game.discount / 100)).toFixed(2)}</span>
                                                </div>
                                                <button onClick={() => !owned && handleBuyGame(game)} disabled={!!owned}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${owned ? 'bg-green-500/20 text-green-400' : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:scale-105'}`}>
                                                    {owned ? "✓ Owned" : "Buy"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>)}

                    {/* SETTINGS */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-black mb-6">Settings</h2>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">Profile</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-3xl">{player.avatar}</div>
                                        <div><h4 className="font-bold">{player.name}</h4><p className="text-white/40 text-sm">{player.email}</p><p className="text-white/30 text-xs">Member since {player.joinDate}</p></div>
                                        <button onClick={() => setShowEditProfile(true)} className="ml-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">Edit</button>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">Preferences</h3>
                                    {[
                                        { key: "emailNotifications", label: "Email Notifications", desc: "Get updates about games and events", icon: "ri-mail-line" },
                                        { key: "friendRequests", label: "Friend Requests", desc: "Allow others to send friend requests", icon: "ri-user-add-line" },
                                        { key: "onlineStatus", label: "Online Status", desc: "Show when you're online", icon: "ri-wifi-line" },
                                        { key: "gameActivity", label: "Game Activity", desc: "Share what you're playing", icon: "ri-gamepad-line" },
                                    ].map(pref => (
                                        <div key={pref.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <i className={`${pref.icon} text-lg text-white/40`}></i>
                                                <div><p className="text-sm font-medium">{pref.label}</p><p className="text-[11px] text-white/30">{pref.desc}</p></div>
                                            </div>
                                            <button onClick={() => handleTogglePref(pref.key)} className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${preferences[pref.key] ? 'bg-orange-500' : 'bg-white/20'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${preferences[pref.key] ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10">
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-red-400/60 mb-4">Danger Zone</h3>
                                    <div className="flex items-center justify-between">
                                        <div><p className="text-sm font-medium">Delete Account</p><p className="text-[11px] text-white/30">Permanently remove your account and data</p></div>
                                        <button onClick={() => setShowDeleteAccount(true)} className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* MODALS */}
            <ChatModal open={!!chatFriend} onClose={() => setChatFriend(null)} friend={chatFriend} />
            <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} user={user} onSave={handleSaveProfile} />
            <AddFriendModal open={showAddFriend} onClose={() => setShowAddFriend(false)} onAdd={handleAddFriend} />
            <DeleteAccountModal open={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} onDelete={handleDeleteAccount} />
            <GameLaunchToast game={launchingGame} onClose={() => setLaunchingGame(null)} />

            <style>{`
        @keyframes slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes loadBar { 0% { width: 0; } 100% { width: 100%; } }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-loadBar { animation: loadBar 3s ease-in-out; }
      `}</style>
        </div>
    );
}

export default Dashboard;
