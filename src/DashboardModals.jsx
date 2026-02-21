import React, { useState } from "react";

// Generic Modal Wrapper
export function Modal({ open, onClose, children, wide }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className={`relative ${wide ? 'w-full max-w-lg' : 'w-full max-w-sm'} mx-4 bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white z-10"><i className="ri-close-line text-xl"></i></button>
                {children}
            </div>
        </div>
    );
}

// Chat Modal
export function ChatModal({ open, onClose, friend }) {
    const [messages, setMessages] = useState([
        { from: "them", text: "Hey! Want to play some GTA tonight? 🎮", time: "5:30 PM" },
        { from: "them", text: "I found a new heist mission", time: "5:31 PM" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { from: "me", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setInput("");
        // Auto reply
        setTimeout(() => {
            setMessages(prev => [...prev, { from: "them", text: "Sounds good! Let me finish this mission first 👍", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }, 1500);
    };

    if (!open || !friend) return null;
    return (
        <Modal open={open} onClose={onClose} wide>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-xl">{friend.avatar}</div>
                <div>
                    <h4 className="font-bold text-sm">{friend.name}</h4>
                    <span className={`text-[10px] ${friend.status === 'online' ? 'text-green-400' : 'text-white/30'}`}>{friend.status}</span>
                </div>
            </div>
            <div className="h-64 overflow-y-auto space-y-3 mb-4 pr-1">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${msg.from === 'me' ? 'bg-orange-500/20 text-white' : 'bg-white/5 text-white/80'}`}>
                            <p>{msg.text}</p>
                            <p className="text-[9px] text-white/30 mt-1">{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/40" />
                <button onClick={sendMessage} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold text-sm hover:shadow-lg transition-all">
                    <i className="ri-send-plane-fill"></i>
                </button>
            </div>
        </Modal>
    );
}

// Edit Profile Modal
export function EditProfileModal({ open, onClose, user, onSave }) {
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const avatars = ["🎮", "🎯", "🔫", "💀", "🏎️", "🎬", "🎲", "⚡", "🔥", "👾", "🎪", "🦊"];
    const [avatar, setAvatar] = useState(user?.avatar || "🎮");

    const handleSave = () => {
        if (!username.trim()) return;
        onSave({ username, email, avatar });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} wide>
            <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Avatar</label>
                    <div className="flex flex-wrap gap-2">
                        {avatars.map(a => (
                            <button key={a} onClick={() => setAvatar(a)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${avatar === a ? 'bg-orange-500/30 border border-orange-500 scale-110' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                                {a}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50" />
                </div>
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50" />
                </div>
                <button onClick={handleSave} className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 font-semibold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                    Save Changes
                </button>
            </div>
        </Modal>
    );
}

// Add Friend Modal
export function AddFriendModal({ open, onClose, onAdd }) {
    const [tag, setTag] = useState("");
    const [sent, setSent] = useState(false);

    const handleAdd = () => {
        if (!tag.trim()) return;
        onAdd(tag);
        setSent(true);
        setTimeout(() => { setSent(false); setTag(""); onClose(); }, 1500);
    };

    return (
        <Modal open={open} onClose={() => { onClose(); setSent(false); setTag(""); }}>
            <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <i className="ri-user-add-fill text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold">Add Friend</h3>
                <p className="text-white/40 text-sm mt-1">Enter their gamer tag</p>
            </div>
            {!sent ? (
                <>
                    <input value={tag} onChange={e => setTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        placeholder="Enter gamer tag..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/50 mb-4" />
                    <button onClick={handleAdd} className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-semibold text-sm uppercase tracking-wider hover:shadow-lg transition-all">
                        Send Request
                    </button>
                </>
            ) : (
                <div className="text-center py-4">
                    <i className="ri-check-double-line text-3xl text-green-500 mb-2"></i>
                    <p className="text-green-400 text-sm">Friend request sent to {tag}!</p>
                </div>
            )}
        </Modal>
    );
}

// Confirm Delete Modal
export function DeleteAccountModal({ open, onClose, onDelete }) {
    const [typed, setTyped] = useState("");
    return (
        <Modal open={open} onClose={() => { onClose(); setTyped(""); }}>
            <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <i className="ri-error-warning-fill text-2xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-bold text-red-400">Delete Account</h3>
                <p className="text-white/40 text-sm mt-1">This action cannot be undone. Type <strong className="text-red-400">DELETE</strong> to confirm.</p>
            </div>
            <input value={typed} onChange={e => setTyped(e.target.value)} placeholder='Type "DELETE"'
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-red-500/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-red-500/50 mb-4" />
            <button onClick={() => { if (typed === "DELETE") onDelete(); }} disabled={typed !== "DELETE"}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-sm uppercase tracking-wider hover:bg-red-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                Permanently Delete
            </button>
        </Modal>
    );
}

// Game Launch Toast
export function GameLaunchToast({ game, onClose }) {
    if (!game) return null;
    return (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#1a1a1a] border border-orange-500/20 rounded-2xl p-4 shadow-2xl shadow-orange-500/10 flex items-center gap-4 animate-slideUp min-w-[300px]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <i className="ri-play-fill text-xl"></i>
            </div>
            <div className="flex-1">
                <p className="font-bold text-sm">Launching {game}</p>
                <p className="text-white/40 text-xs">Starting game...</p>
                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-loadBar"></div>
                </div>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white"><i className="ri-close-line"></i></button>
        </div>
    );
}
