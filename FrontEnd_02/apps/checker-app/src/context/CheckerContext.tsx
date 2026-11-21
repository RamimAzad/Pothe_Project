import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CheckerEntry, MockCheckerService, MockAuthService } from '@pothe/mock-data';

interface CheckerContextType {
  user: User;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  isInsideGeofence: boolean;
  setIsInsideGeofence: (inside: boolean) => void;
  largeTextMode: boolean;
  setLargeTextMode: (large: boolean) => void;
  language: 'en' | 'bn';
  toggleLanguage: () => void;
  pendingSyncCount: number;
  refreshCounts: () => Promise<void>;
  currentShift: {
    checkpointName: string;
    checkpointNameBn: string;
    route: string;
    shiftHours: string;
    progressPercent: number;
  };
}

const CheckerContext = createContext<CheckerContextType | undefined>(undefined);

export const CheckerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => MockAuthService.getDemoUser('checker'));
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isInsideGeofence, setIsInsideGeofence] = useState<boolean>(true);
  const [largeTextMode, setLargeTextMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('bn');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  const refreshCounts = async () => {
    const queue = await MockCheckerService.getOfflineQueue();
    setPendingSyncCount(queue.length);
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const currentShift = {
    checkpointName: 'Mirpur 10',
    checkpointNameBn: 'মিরপুর ১০',
    route: 'Mirpur 10 ↔ Motijheel',
    shiftHours: '6:00 AM – 2:00 PM',
    progressPercent: 65,
  };

  return (
    <CheckerContext.Provider
      value={{
        user,
        isOnline,
        setIsOnline,
        isInsideGeofence,
        setIsInsideGeofence,
        largeTextMode,
        setLargeTextMode,
        language,
        toggleLanguage,
        pendingSyncCount,
        refreshCounts,
        currentShift,
      }}
    >
      <div className={largeTextMode ? 'text-lg' : ''}>{children}</div>
    </CheckerContext.Provider>
  );
};

export const useChecker = () => {
  const context = useContext(CheckerContext);
  if (!context) {
    throw new Error('useChecker must be used within a CheckerProvider');
  }
  return context;
};
