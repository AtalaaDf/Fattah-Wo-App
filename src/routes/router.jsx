import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import WorkerLayout from '../layouts/WorkerLayout'
import ClientLayout from '../layouts/ClientLayout'

// Public Pages
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import RegisterPage from '../pages/public/RegisterPage'

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminWorkerPage from '../pages/admin/AdminWorkerPage'
import AdminSchedulePage from '../pages/admin/AdminSchedulePage'
import AdminBundlePage from '../pages/admin/AdminBundlePage'
import AdminFeedbackPage from '../pages/admin/AdminFeedbackPage'

// Worker Pages
import WorkerDashboardPage from '../pages/worker/WorkerDashboardPage'
import WorkerProfilePage from '../pages/worker/WorkerProfilePage'
import WorkerListPage from '../pages/worker/WorkerListPage'
import WorkerSchedulePage from '../pages/worker/WorkerSchedulePage'

// Client Pages
import ClientReservationPage from '../pages/client/ClientReservationPage'
import ClientNewReservationPage from '../pages/client/ClientNewReservationPage'
import ClientBundlePage from '../pages/client/ClientBundlePage'
import ClientSchedulePage from '../pages/client/ClientSchedulePage'
import ClientPaymentPage from '../pages/client/ClientPaymentPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'worker', element: <AdminWorkerPage /> },
      { path: 'schedule', element: <AdminSchedulePage /> },
      { path: 'bundle', element: <AdminBundlePage /> },
      { path: 'feedback', element: <AdminFeedbackPage /> },
    ],
  },
  {
    path: '/worker',
    element: <WorkerLayout />,
    children: [
      { index: true, element: <Navigate to="/worker/dashboard" replace /> },
      { path: 'dashboard', element: <WorkerDashboardPage /> },
      { path: 'profile', element: <WorkerProfilePage /> },
      { path: 'list', element: <WorkerListPage /> },
      { path: 'schedule', element: <WorkerSchedulePage /> },
    ],
  },
  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { index: true, element: <Navigate to="/client/reservation" replace /> },
      { path: 'reservation', element: <ClientReservationPage /> },
      { path: 'reservation/new', element: <ClientNewReservationPage /> },
      { path: 'bundle', element: <ClientBundlePage /> },
      { path: 'schedule', element: <ClientSchedulePage /> },
      { path: 'payment/:reservationId', element: <ClientPaymentPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router
