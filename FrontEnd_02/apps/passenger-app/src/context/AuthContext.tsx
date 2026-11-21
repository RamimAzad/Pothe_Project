import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, MockAuthService } from '@pothe/mock-data';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (phoneOrEmail: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (name: string, email?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pothe_passenger_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem('pothe_passenger_guest') === 'true';
  });

  const login = async (phoneOrEmail: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!phoneOrEmail || !pass) {
      return { success: false, error: 'Please enter phone/email and password' };
    }
    // Demo validation
    if (pass.length < 4) {
      return { success: false, error: 'Incorrect phone or password. 2 attempts left.' };
    }

    const demoUser = MockAuthService.getDemoUser('passenger');
    setUser(demoUser);
    setIsGuest(false);
    localStorage.setItem('pothe_passenger_user', JSON.stringify(demoUser));
    localStorage.removeItem('pothe_passenger_guest');
    return { success: true };
  };

  const loginAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.removeItem('pothe_passenger_user');
    localStorage.setItem('pothe_passenger_guest', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('pothe_passenger_user');
    localStorage.removeItem('pothe_passenger_guest');
  };

  const updateProfile = (name: string, email?: string) => {
    if (user) {
      const updated = { ...user, name, email };
      setUser(updated);
      localStorage.setItem('pothe_passenger_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, loginAsGuest, logout, updateProfile }}>
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
