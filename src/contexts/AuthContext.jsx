import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (uid) => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()
      return data
    } catch { return null }
  }

  useEffect(() => {
    let mounted = true
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!mounted) return
      if (session?.user) {
        setUser(session.user)
        const p = await fetchProfile(session.user.id)
        if (mounted) setProfile(p ?? { id: session.user.id, email: session.user.email, rol: 'admin', nombre_completo: session.user.email })
      }
      if (mounted) setLoading(false)
    }
    init()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!mounted) return
      if (session?.user) {
        setUser(session.user)
        const p = await fetchProfile(session.user.id)
        if (mounted) setProfile(p ?? { id: session.user.id, email: session.user.email, rol: 'admin', nombre_completo: session.user.email })
      } else {
        setUser(null); setProfile(null)
      }
      if (mounted) setLoading(false)
    })
    return () => { mounted = false; subscription.unsubscribe() }
  }, [])

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const register = async ({ email, password, nombreCompleto }) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nombre_completo: nombreCompleto } } })
    if (error) throw error
    return data
  }

  const logout = async () => { await supabase.auth.signOut(); setUser(null); setProfile(null) }

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      login, register, logout, resetPassword,
      isAdmin:  profile?.rol === 'admin',
      isEditor: profile?.rol === 'editor' || profile?.rol === 'admin',
      nombreCompleto: profile?.nombre_completo || user?.email || '',
    }}>
      {children}
    </AuthContext.Provider>
  )
}
