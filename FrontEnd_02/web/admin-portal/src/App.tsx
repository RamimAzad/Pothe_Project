import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLayout } from './components/AdminLayout';
import { LoginScreen } from './screens/LoginScreen';

// Government Views
import { GovOverviewScreen } from './screens/gov/GovOverviewScreen';
import { GovDemandAnalyticsScreen } from './screens/gov/GovDemandAnalyticsScreen';
import { GovOperatorMonitoringScreen } from './screens/gov/GovOperatorMonitoringScreen';
import { GovComplaintsScreen } from './screens/gov/GovComplaintsScreen';
import { GovExportReportsScreen } from './screens/gov/GovExportReportsScreen';

// Bus Owner Views
import { OwnerFleetScreen } from './screens/owner/OwnerFleetScreen';
import { OwnerBusDetailScreen } from './screens/owner/OwnerBusDetailScreen';
import { OwnerDemandTrendsScreen } from './screens/owner/OwnerDemandTrendsScreen';
import { OwnerComplaintsScreen } from './screens/owner/OwnerComplaintsScreen';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRole?: 'gov' | 'owner';
}> = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'gov' ? '/gov/overview' : '/owner/fleet'} replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

const RootRedirect: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={role === 'gov' ? '/gov/overview' : '/owner/fleet'} replace />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />

          {/* Government Routes */}
          <Route
            path="/gov/overview"
            element={
              <ProtectedRoute allowedRole="gov">
                <GovOverviewScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gov/demand"
            element={
              <ProtectedRoute allowedRole="gov">
                <GovDemandAnalyticsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gov/operators"
            element={
              <ProtectedRoute allowedRole="gov">
                <GovOperatorMonitoringScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gov/complaints"
            element={
              <ProtectedRoute allowedRole="gov">
                <GovComplaintsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gov/export"
            element={
              <ProtectedRoute allowedRole="gov">
                <GovExportReportsScreen />
              </ProtectedRoute>
            }
          />

          {/* Bus Owner Routes */}
          <Route
            path="/owner/fleet"
            element={
              <ProtectedRoute allowedRole="owner">
                <OwnerFleetScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/bus/:busId"
            element={
              <ProtectedRoute allowedRole="owner">
                <OwnerBusDetailScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/demand"
            element={
              <ProtectedRoute allowedRole="owner">
                <OwnerDemandTrendsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/complaints"
            element={
              <ProtectedRoute allowedRole="owner">
                <OwnerComplaintsScreen />
              </ProtectedRoute>
            }
          />

          {/* Default / Fallbacks */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
