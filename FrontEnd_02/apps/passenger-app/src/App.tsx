import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import { P01_SplashLanguageScreen } from './screens/P01_SplashLanguageScreen';
import { P02_RegistrationScreen } from './screens/P02_RegistrationScreen';
import { P03_OtpVerificationScreen } from './screens/P03_OtpVerificationScreen';
import { P04_LoginScreen } from './screens/P04_LoginScreen';
import { P05_HomeDestinationSearchScreen } from './screens/P05_HomeDestinationSearchScreen';
import { P06_RouteResultsScreen } from './screens/P06_RouteResultsScreen';
import { P07_BusesBehindMeScreen } from './screens/P07_BusesBehindMeScreen';
import { P08_BusDetailScreen } from './screens/P08_BusDetailScreen';
import { P09_RouteCrowdLevelScreen } from './screens/P09_RouteCrowdLevelScreen';
import { P10_CheckerCountsFeedScreen } from './screens/P10_CheckerCountsFeedScreen';
import { P11_SubmitComplaintScreen } from './screens/P11_SubmitComplaintScreen';
import { P12_MyComplaintsTrackingScreen } from './screens/P12_MyComplaintsTrackingScreen';
import { P13_NotificationsAlertsScreen } from './screens/P13_NotificationsAlertsScreen';
import { P14_ProfileSettingsScreen } from './screens/P14_ProfileSettingsScreen';

// Native Back Button Handler via Capacitor App Plugin
const BackButtonHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let handler: any;
    try {
      handler = CapApp.addListener('backButton', () => {
        if (location.pathname === '/home' || location.pathname === '/') {
          CapApp.exitApp();
        } else {
          navigate(-1);
        }
      });
    } catch {
      // Running in browser mode
    }

    return () => {
      if (handler && typeof handler.remove === 'function') {
        handler.remove();
      }
    };
  }, [location.pathname, navigate]);

  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <BackButtonHandler />
          <div className="max-w-md mx-auto min-h-screen bg-neutral-bg shadow-2xl relative font-sans">
            <Routes>
              <Route path="/" element={<P01_SplashLanguageScreen />} />
              <Route path="/register" element={<P02_RegistrationScreen />} />
              <Route path="/otp" element={<P03_OtpVerificationScreen />} />
              <Route path="/login" element={<P04_LoginScreen />} />
              <Route path="/home" element={<P05_HomeDestinationSearchScreen />} />
              <Route path="/route-results" element={<P06_RouteResultsScreen />} />
              <Route path="/buses-behind" element={<P07_BusesBehindMeScreen />} />
              <Route path="/bus-detail" element={<P08_BusDetailScreen />} />
              <Route path="/route-crowd" element={<P09_RouteCrowdLevelScreen />} />
              <Route path="/checker-counts" element={<P10_CheckerCountsFeedScreen />} />
              <Route path="/submit-complaint" element={<P11_SubmitComplaintScreen />} />
              <Route path="/complaints" element={<P12_MyComplaintsTrackingScreen />} />
              <Route path="/alerts" element={<P13_NotificationsAlertsScreen />} />
              <Route path="/profile" element={<P14_ProfileSettingsScreen />} />
              <Route path="*" element={<P05_HomeDestinationSearchScreen />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
