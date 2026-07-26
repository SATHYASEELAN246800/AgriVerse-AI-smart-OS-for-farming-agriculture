import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check cached active session from localStorage
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('agriverse_auth_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.email === 'sathya.seelan@gmail.com') {
          parsed.email = 'sathyaseelan6381@gmail.com';
          localStorage.setItem('agriverse_auth_user', JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Failed loading cached auth user:", e);
    }
    return null; // Null means unauthenticated (SaaS Gate Enforced)
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('agriverse_auth_user');
  });

  const [showAuthModal, setShowAuthModal] = useState(() => {
    // If not authenticated, force open the Auth Modal / Sign In Gate
    return !localStorage.getItem('agriverse_auth_user');
  });

  // Sync state changes to localStorage cache
  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem('agriverse_auth_user', JSON.stringify(user));
    } else if (!isAuthenticated) {
      localStorage.removeItem('agriverse_auth_user');
    }
  }, [user, isAuthenticated]);

  // Decode JWT helper for Google Credential tokens
  const parseGoogleJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error('Failed parsing Google JWT:', err);
      return null;
    }
  };

  // Process Google OAuth Credential (Real Google Identity Services Callback)
  const handleGoogleCredentialResponse = (response) => {
    if (response?.credential) {
      const payload = parseGoogleJwt(response.credential);
      if (payload) {
        const updatedUser = {
          id: payload.sub || `usr_g_${Date.now()}`,
          displayName: payload.name || payload.given_name || payload.email.split('@')[0],
          fullName: payload.name || payload.email.split('@')[0],
          email: payload.email,
          photoUrl: payload.picture || `https://unavatar.io/${payload.email}?fallback=https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120`,
          provider: 'Google OAuth 2.0 (Verified)',
          role: 'Farmer / Enterprise Agronomist',
          title: 'Enterprise Farmer',
          badge: '👑 Elite Tier',
          subscriptionTier: 'Elite SaaS Tier',
          farmLocation: 'Tamil Nadu, India',
          farmSize: '10.0 Acres',
          cropPrimary: 'Paddy & Commercial Crops',
          aiTokens: '100,000 / 100,000',
          lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          online: true
        };
        setUser(updatedUser);
        setIsAuthenticated(true);
        setShowAuthModal(false);
        localStorage.setItem('agriverse_auth_user', JSON.stringify(updatedUser));
      }
    }
  };

  // Google OAuth Sign In / Custom Gmail Authentication
  const googleLogin = (customGmail = null, customName = null) => {
    const emailToUse = customGmail && customGmail.includes('@') 
      ? customGmail 
      : 'sathyaseelan6381@gmail.com';

    const namePart = emailToUse.split('@')[0];
    const defaultFormattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/\./g, ' ');
    const finalName = customName || defaultFormattedName;

    const isSathya = emailToUse.toLowerCase().includes('sathya') || finalName.toLowerCase().includes('sathya');
    const profilePhoto = isSathya 
      ? '/sathyaseelan_profile.jpg' 
      : `https://unavatar.io/${emailToUse}?fallback=/sathyaseelan_profile.jpg`;

    const updatedUser = {
      id: `usr_g_${Date.now()}`,
      displayName: finalName,
      fullName: finalName,
      email: emailToUse,
      photoUrl: profilePhoto,
      provider: 'Google OAuth 2.0',
      role: 'Farmer / Enterprise Agronomist',
      title: 'Enterprise Farmer',
      badge: '👑 Elite Tier',
      subscriptionTier: 'Elite SaaS Tier',
      farmLocation: 'Vellore, Tamil Nadu',
      farmSize: '12.45 Acres',
      cropPrimary: 'Paddy (Rice - ADT 54)',
      aiTokens: '95,000 / 100,000',
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      online: true
    };

    setUser(updatedUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('agriverse_auth_user', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  // General Email & Password Sign-In handler
  const login = (email, password, name = null) => {
    const namePart = email.split('@')[0];
    const defaultFormattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/\./g, ' ');
    const finalName = name || defaultFormattedName;
    
    const updatedUser = {
      id: `usr_${Date.now()}`,
      displayName: finalName,
      fullName: finalName,
      email: email,
      photoUrl: `https://unavatar.io/${email}?fallback=https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120`,
      provider: 'Email OAuth 2.0',
      role: 'Farmer / Enterprise Agronomist',
      title: 'Enterprise Agronomist',
      badge: '👑 Elite Tier',
      subscriptionTier: 'Elite SaaS Tier',
      farmLocation: 'Tamil Nadu, India',
      farmSize: '10.0 Acres',
      cropPrimary: 'Paddy (Rice - ADT 54)',
      aiTokens: '100,000 / 100,000',
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      online: true
    };

    setUser(updatedUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('agriverse_auth_user', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  // Logout & Clear Cached Session (Forces Auth Gate Modal)
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('agriverse_auth_user');
    setShowAuthModal(true);
  };

  // Update profile attributes dynamically
  const updateProfile = (updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem('agriverse_auth_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      showAuthModal,
      setShowAuthModal,
      login,
      googleLogin,
      handleGoogleCredentialResponse,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
