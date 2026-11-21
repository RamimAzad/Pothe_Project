import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, MockAuthService, DEMO_USERS } from '@pothe/mock-data';

interface AuthContextType {
  user: User | null;
  role: 'gov' | 'owner' | null;
  isAuthenticated: boolean;
  login: (role: 'gov' | 'owner', idOrEmail: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'gov' | 'owner') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'pothe_admin_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.role === 'gov' || parsed.role === 'owner') {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    // Default to Government user for easy demo experience
    return DEMO_USERS.gov;
  });

  const role = (user?.role === 'gov' || user?.role === 'owner') ? user.role : null;
  const isAuthenticated = Boolean(user && (user.role === 'gov' || user.role === 'owner'));

  useEffect(() => {
    if (user) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [user]);

  const login = async (selectedRole: 'gov' | 'owner', _idOrEmail: string): Promise<boolean> => {
    // Mock authentication: accepts any password for demo credentials
    const targetUser = DEMO_USERS[selectedRole];
    setUser(targetUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  const switchRole = (newRole: 'gov' | 'owner') => {
    const targetUser = DEMO_USERS[newRole];
    setUser(targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        switchRole,
      }}
    >
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
