import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { CheckerProvider } from './context/CheckerContext';

import { C01_CheckerLoginScreen } from './screens/C01_CheckerLoginScreen';
import { C02_ShiftDashboardScreen } from './screens/C02_ShiftDashboardScreen';
import { C03_SelectBusIdScreen } from './screens/C03_SelectBusIdScreen';
import { C04_EnterPassengerCountsScreen } from './screens/C04_EnterPassengerCountsScreen';
import { C05_EntrySubmittedSuccessScreen } from './screens/C05_EntrySubmittedSuccessScreen';
import { C06_EntryRejectedGeofenceErrorScreen } from './screens/C06_EntryRejectedGeofenceErrorScreen';
import { C07_EntryHistoryScreen } from './screens/C07_EntryHistoryScreen';
import { C08_CorrectOrVoidEntryScreen } from './screens/C08_CorrectOrVoidEntryScreen';
import { C09_OfflineQueueSyncScreen } from './screens/C09_OfflineQueueSyncScreen';
import { C10_CheckerProfileSettingsScreen } from './screens/C10_CheckerProfileSettingsScreen';

const CheckerBackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let handler: any;
    try {
      handler = CapApp.addListener('backButton', () => {
        if (location.pathname === '/shift' || location.pathname === '/' || location.pathname === '/login') {
          CapApp.exitApp();
        } else {
          navigate(-1);
        }
      });
    } catch {
      // browser mode
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
    <CheckerProvider>
      <BrowserRouter>
        <CheckerBackButton />
        <div className="max-w-md mx-auto min-h-screen bg-neutral-bg shadow-2xl relative font-sans">
          <Routes>
            <Route path="/" element={<C01_CheckerLoginScreen />} />
            <Route path="/login" element={<C01_CheckerLoginScreen />} />
            <Route path="/shift" element={<C02_ShiftDashboardScreen />} />
            <Route path="/select-bus" element={<C03_SelectBusIdScreen />} />
            <Route path="/enter-counts" element={<C04_EnterPassengerCountsScreen />} />
            <Route path="/entry-success" element={<C05_EntrySubmittedSuccessScreen />} />
            <Route path="/geofence-error" element={<C06_EntryRejectedGeofenceErrorScreen />} />
            <Route path="/history" element={<C07_EntryHistoryScreen />} />
            <Route path="/correct-entry" element={<C08_CorrectOrVoidEntryScreen />} />
            <Route path="/sync" element={<C09_OfflineQueueSyncScreen />} />
            <Route path="/profile" element={<C10_CheckerProfileSettingsScreen />} />
            <Route path="*" element={<C02_ShiftDashboardScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CheckerProvider>
  );
};

export default App;
