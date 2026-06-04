import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext.jsx'

const Spinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-white/40 text-sm">Cargando...</p>
    </div>
  </div>
)

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/" state={{ from: location }} replace />
  return children
}

export const AdminRoute = ({ children }) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/" state={{ from: location }} replace />

  // Si el usuario está logueado pero el profile aún no ha cargado, mostrar spinner
  if (user && profile === null) return <Spinner />

  if (profile?.rol !== 'admin' && profile?.rol !== 'editor') return <Navigate to="/" replace />
  return children
}

export default ProtectedRoute
