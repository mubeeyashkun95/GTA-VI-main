import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("gta_hub_user");
        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch {
                localStorage.removeItem("gta_hub_user");
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("gta_hub_user", JSON.stringify(user));
        }
    }, [user]);

    const signup = (username, email, password) => {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("gta_hub_users") || "[]");
        const exists = existingUsers.find(u => u.email === email);
        if (exists) {
            return { success: false, error: "An account with this email already exists." };
        }

        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
            avatar: "🎮",
            level: 1,
            xp: 0,
            xpNext: 1000,
            rank: "Bronze",
            joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            gamesOwned: 0,
            achievements: 0,
            friends: 0,
            totalPlaytime: "0h",
            preferences: {
                emailNotifications: true,
                friendRequests: true,
                onlineStatus: true,
                gameActivity: true,
            },
        };

        // Store in users list
        existingUsers.push({ email, password, username, id: newUser.id });
        localStorage.setItem("gta_hub_users", JSON.stringify(existingUsers));

        // Set current session
        setUser(newUser);
        return { success: true };
    };

    const login = (email, password, remember) => {
        const existingUsers = JSON.parse(localStorage.getItem("gta_hub_users") || "[]");
        const found = existingUsers.find(u => u.email === email && u.password === password);

        if (!found) {
            // Check if email exists
            const emailExists = existingUsers.find(u => u.email === email);
            if (emailExists) {
                return { success: false, error: "Incorrect password. Please try again." };
            }
            return { success: false, error: "No account found with this email. Please sign up first." };
        }

        const userData = {
            id: found.id,
            username: found.username,
            email: found.email,
            avatar: "🎮",
            level: 42,
            xp: 7850,
            xpNext: 10000,
            rank: "Diamond",
            joinDate: "Jan 2024",
            gamesOwned: 24,
            achievements: 156,
            friends: 89,
            totalPlaytime: "1,247h",
            preferences: {
                emailNotifications: true,
                friendRequests: true,
                onlineStatus: true,
                gameActivity: true,
            },
        };

        if (remember) {
            localStorage.setItem("gta_hub_remember", email);
        } else {
            localStorage.removeItem("gta_hub_remember");
        }

        setUser(userData);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("gta_hub_user");
    };

    const updateProfile = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const deleteAccount = () => {
        if (user) {
            const existingUsers = JSON.parse(localStorage.getItem("gta_hub_users") || "[]");
            const filtered = existingUsers.filter(u => u.id !== user.id);
            localStorage.setItem("gta_hub_users", JSON.stringify(filtered));
        }
        setUser(null);
        localStorage.removeItem("gta_hub_user");
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        deleteAccount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
