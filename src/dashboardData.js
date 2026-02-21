// All dashboard data in one place
export const gamesList = [
    { id: 1, title: "GTA V Online", lastPlayed: "2 hours ago", hours: "342h", progress: 78, price: 29.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg" },
    { id: 2, title: "Red Dead Redemption 2", lastPlayed: "Yesterday", hours: "186h", progress: 92, price: 39.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg" },
    { id: 3, title: "Cyberpunk 2077", lastPlayed: "3 days ago", hours: "124h", progress: 65, price: 29.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg" },
    { id: 4, title: "Elden Ring", lastPlayed: "1 week ago", hours: "210h", progress: 88, price: 49.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg" },
    { id: 5, title: "Call of Duty: MW3", lastPlayed: "5 days ago", hours: "89h", progress: 45, price: 59.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_600x900.jpg" },
    { id: 6, title: "EA FC 25", lastPlayed: "4 days ago", hours: "67h", progress: 55, price: 49.99, image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2669320/library_600x900.jpg" },
];

export const storeGames = [
    { id: 101, title: "GTA VI", price: 69.99, discount: 0, tag: "Pre-Order", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg" },
    { id: 102, title: "Spider-Man 2", price: 49.99, discount: 20, tag: "New", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg" },
    { id: 103, title: "Starfield", price: 59.99, discount: 40, tag: "Sale", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg" },
    { id: 104, title: "Hogwarts Legacy", price: 39.99, discount: 50, tag: "Sale", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg" },
];

export const achievementsList = [
    { id: 1, title: "First Blood", desc: "Win your first match", icon: "ri-sword-fill", rarity: "Common", unlocked: true, color: "text-green-400" },
    { id: 2, title: "Road Warrior", desc: "Drive 1000 miles total", icon: "ri-roadster-fill", rarity: "Rare", unlocked: true, color: "text-blue-400" },
    { id: 3, title: "Headhunter", desc: "100 headshots in multiplayer", icon: "ri-crosshair-fill", rarity: "Epic", unlocked: true, color: "text-purple-400" },
    { id: 4, title: "Legend Status", desc: "Reach level 100", icon: "ri-vip-crown-fill", rarity: "Legendary", unlocked: false, color: "text-orange-400" },
    { id: 5, title: "Social Butterfly", desc: "Add 100 friends", icon: "ri-heart-fill", rarity: "Rare", unlocked: true, color: "text-pink-400" },
    { id: 6, title: "Completionist", desc: "100% any game", icon: "ri-medal-fill", rarity: "Epic", unlocked: false, color: "text-yellow-400" },
];

export const friendsList = [
    { id: 1, name: "TommyVercetti", status: "online", game: "GTA V Online", avatar: "🎯" },
    { id: 2, name: "CJ_GroveStreet", status: "online", game: "Red Dead Online", avatar: "🔫" },
    { id: 3, name: "NikoBellic_IV", status: "away", game: "Cyberpunk 2077", avatar: "🎲" },
    { id: 4, name: "TrevorPhilips", status: "online", game: "Elden Ring", avatar: "💀" },
    { id: 5, name: "FranklinClinton", status: "offline", game: "Last seen 3h ago", avatar: "🏎️" },
    { id: 6, name: "MichaelDeSanta", status: "online", game: "GTA V Online", avatar: "🎬" },
];

export const defaultNotifications = [
    { id: 1, text: "GTA VI Pre-order is now available!", time: "5 min ago", icon: "ri-fire-fill", iconColor: "text-orange-500", read: false },
    { id: 2, text: "TommyVercetti sent you a friend request", time: "1 hour ago", icon: "ri-user-add-fill", iconColor: "text-blue-400", read: false },
    { id: 3, text: "New achievement unlocked: Road Warrior", time: "3 hours ago", icon: "ri-trophy-fill", iconColor: "text-yellow-500", read: false },
];

export const weeklyActivity = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 6.2 },
    { day: "Wed", hours: 3.8 },
    { day: "Thu", hours: 7.1 },
    { day: "Fri", hours: 8.3 },
    { day: "Sat", hours: 10.5 },
    { day: "Sun", hours: 9.2 },
];

export const statsConfig = [
    { icon: "ri-gamepad-fill", label: "Games Owned", key: "games", color: "from-orange-500 to-pink-500" },
    { icon: "ri-trophy-fill", label: "Achievements", key: "achievements", color: "from-yellow-500 to-orange-500" },
    { icon: "ri-time-fill", label: "Hours Played", key: "hours", color: "from-blue-500 to-cyan-500" },
    { icon: "ri-group-fill", label: "Friends Online", key: "friends", color: "from-green-500 to-emerald-500" },
];

export const sidebarItems = [
    { id: "overview", icon: "ri-dashboard-fill", label: "Overview" },
    { id: "library", icon: "ri-gamepad-fill", label: "Game Library" },
    { id: "achievements", icon: "ri-trophy-fill", label: "Achievements" },
    { id: "friends", icon: "ri-group-fill", label: "Friends" },
    { id: "store", icon: "ri-shopping-bag-fill", label: "Store" },
    { id: "settings", icon: "ri-settings-3-fill", label: "Settings" },
];
