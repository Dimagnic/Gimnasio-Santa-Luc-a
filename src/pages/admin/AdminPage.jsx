import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext.jsx'
import { supabase } from '@/lib/supabase'
import CmsPage   from './CmsPage.jsx'
import LeadsPage from './LeadsPage.jsx'
import GymsPage  from './GymsPage.jsx'
import UsersPage from './UsersPage.jsx'
import { LayoutDashboard, Settings, Users, ChevronRight, Shield, LogOut, Megaphone, MapPin } from 'lucide-react'

const MENU = [
  { path: '/admin',       label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/cms',   label: 'CMS',        icon: Settings },
  { path: '/admin/leads', label: 'Leads',      icon: Megaphone },
  { path: '/admin/gyms',  label: 'Gimnasios',  icon: MapPin },
  { path: '/admin/users', label: 'Usuarios',   icon: Users },
]

const AdminNav = () => {
  const location = useLocation()
  const { logout, nombreCompleto, profile } = useAuth()
  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path)
  return (
    <aside className="w-56 flex-shrink-0 hidden md:flex flex-col">
      <div className="sticky top-0 bg-gray-950 border-r border-white/10 min-h-screen flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#1A5CE5,#0D3A99)' }}>
              <span className="text-white font-black text-sm">SL</span>
            </div>
            <div>
              <p className="text-white font-black text-sm leading-none">Gym Santa Lucía</p>
              <p className="text-white/30 text-xs mt-0.5">Admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {MENU.map(({ path, label, icon: Icon, exact }) => (
            <Link key={path} to={path}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(path, exact)
                  ? 'text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={isActive(path, exact) ? { background: 'linear-gradient(135deg,#1A5CE5,#0D3A99)' } : {}}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {isActive(path, exact) && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <p className="text-white text-sm font-semibold truncate">{nombreCompleto}</p>
            <p className="text-xs capitalize" style={{ color: '#1A5CE5' }}>{profile?.rol}</p>
          </div>
          <button onClick={async () => { await logout(); window.location.href = '/' }}
            className="flex items-center gap-2 w-full px-3 py-2 text-white/40 hover:text-red-400 text-sm transition-colors rounded-lg hover:bg-white/5">
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  )
}

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-gray-900 rounded-xl p-5 border border-white/5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-3xl font-black text-white">{value ?? '—'}</p>
      <p className="text-white/40 text-sm">{label}</p>
    </div>
  </div>
)

const AdminDashboard = () => {
  const { profile } = useAuth()
  const [stats, setStats] = useState({})
  useEffect(() => {
    Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('estado', 'nuevo'),
      supabase.from('gimnasios').select('*', { count: 'exact', head: true }).eq('activo', true),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
    ]).then(([all, nuevos, gyms, users]) => {
      setStats({ total: all.count, nuevos: nuevos.count, gyms: gyms.count, users: users.count })
    })
  }, [])
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white">Bienvenido, {profile?.nombre_completo?.split(' ')[0] || 'Admin'} 👋</h2>
        <p className="text-white/40 text-sm mt-1">Panel de administración — Gym Santa Lucía</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total leads"          value={stats.total}  icon={Megaphone} color="bg-blue-500/10 text-blue-400" />
        <StatCard label="Leads nuevos"         value={stats.nuevos} icon={Megaphone} color="bg-indigo-500/10 text-indigo-400" />
        <StatCard label="Gimnasios activos"    value={stats.gyms}   icon={MapPin}    color="bg-green-500/10 text-green-400" />
        <StatCard label="Usuarios registrados" value={stats.users}  icon={Users}     color="bg-purple-500/10 text-purple-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MENU.filter(m => !m.exact).map(item => (
          <Link key={item.path} to={item.path}
            className="bg-gray-900 border border-white/5 rounded-xl p-5 group transition-all hover:border-blue-500/30 hover:shadow-lg">
            <item.icon className="w-6 h-6 mb-3" style={{ color: '#1A5CE5' }} />
            <p className="text-white font-bold group-hover:text-blue-400 transition-colors">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black flex">
      <AdminNav />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center gap-2 mb-6 text-sm text-white/30">
          <Shield className="w-4 h-4" style={{ color: '#1A5CE5' }} />
          <span className="font-medium" style={{ color: '#1A5CE5' }}>Panel Admin</span>
        </div>
        <Routes>
          <Route index        element={<AdminDashboard />} />
          <Route path="cms"   element={<CmsPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="gyms"  element={<GymsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*"     element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}
