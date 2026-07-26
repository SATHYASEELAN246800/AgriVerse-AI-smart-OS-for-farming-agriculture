import React, { useState } from 'react';
import { X, Lock, Mail, Shield, LogOut, CheckCircle2, User, Globe, Sparkles, RefreshCw, Key, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, login, googleLogin, logout, updateProfile } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [editingName, setEditingName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    googleLogin(emailInput, editingName || null);
    onClose();
  };

  const handleGoogleSubmit = () => {
    googleLogin();
    onClose();
  };

  const handleSaveName = () => {
    if (editingName.trim()) {
      updateProfile({ displayName: editingName.trim(), fullName: editingName.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-emerald-500/30 p-6 shadow-2xl bg-slate-950/90 space-y-5">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Google Identity & Auth</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-amber-400 animate-pulse" /> Free Real-Time
              </span>
            </h3>
            <p className="text-xs text-slate-400">Persistent Returning User Session & Gmail Sync</p>
          </div>
        </div>

        {/* Active Profile Card if Authenticated */}
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 flex items-center gap-4">
              <div className="relative">
                <img 
                  src={user.photoUrl} 
                  alt={user.displayName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[9px] text-black font-bold">
                  ✓
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="px-2 py-1 rounded bg-black/60 border border-emerald-500/40 text-xs text-white focus:outline-none"
                    />
                    <button 
                      onClick={handleSaveName}
                      className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-100 truncate">{user.displayName}</h4>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-[10px] text-emerald-400 underline ml-2"
                    >
                      Edit
                    </button>
                  </div>
                )}
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {user.badge}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Session Cached
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Meta Details */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">FARM LOCATION</span>
                <strong className="text-slate-200">{user.farmLocation}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-slate-500 block text-[10px]">PRIMARY CROP</span>
                <strong className="text-emerald-400">{user.cropPrimary}</strong>
              </div>
            </div>

            {/* Switch Account / Google Sync Button */}
            <button
              onClick={handleGoogleSubmit}
              className="w-full h-11 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2.5 text-xs font-bold text-slate-100 transition shadow-md"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>Switch Google Account (1-Click OAuth Sync)</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => { logout(); onClose(); }}
              className="w-full h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center gap-2 text-xs font-bold text-rose-300 transition"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out & Clear Cached Session</span>
            </button>
          </div>
        ) : (
          /* Login Form if Unauthenticated */
          <div className="space-y-4">
            <button
              onClick={handleGoogleSubmit}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-black font-extrabold text-xs flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 transition"
            >
              <Globe className="w-4 h-4 text-black" />
              <span>Sign In with Google Account (1-Click OAuth)</span>
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-white/10 w-full" />
              <span className="absolute bg-slate-950 px-3 text-[10px] font-mono text-slate-500 uppercase">Or Enter Gmail Address</span>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Full Name / Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Sathya Seelan"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Gmail / Account Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="email"
                    required
                    placeholder="your.name@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Password (Optional)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition"
              >
                Sign In with Google Identity
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
