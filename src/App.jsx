import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

// 設置 React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 60秒 快取資料的有效時間
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition={'bottom-left'}
        />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute redirect="/login" requireAuth={true}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route
              path="login"
              element={
                <ProtectedRoute redirect="/dashboard" requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            // Define default options
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
            // Default options for specific types
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
