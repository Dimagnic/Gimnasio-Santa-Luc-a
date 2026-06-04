import React, { useState, memo, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext.jsx'
import { X, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'

const LoginModal = memo(({ open, onClose }) => {
  const { login, resetPassword } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [mode,     setMode]     = useState('login')

  const handleLogin = useCallback(async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Completa todos los campos'); return }
    setLoading(true); setError('')
    try {
      await login(email.trim(), password)
      onClose()
      setEmail(''); setPassword('')
      window.location.href = '/admin'
    } catch (err) {
      setError(err.message?.includes('Invalid') ? 'Email o contraseña incorrectos' : err.message)
    } finally { setLoading(false) }
  }, [email, password, login, onClose])

  const handleForgot = useCallback(async (e) => {
    e.preventDefault()
    if (!email) { setError('Ingresa tu correo'); return }
    setLoading(true); setError('')
    try { await resetPassword(email.trim()); setMode('sent') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }, [email, resetPassword])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-black text-lg">G</span>
            </div>
            <span className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>
              GYMFIT <span className="text-yellow-400">ADMIN</span>
            </span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {mode === 'sent' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-white font-bold text-lg mb-2">Correo enviado</p>
              <p className="text-white/50 text-sm mb-6">Revisa tu bandeja de entrada en <strong className="text-white">{email}</strong></p>
              <button onClick={() => { setMode('login'); setError('') }}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors">
                Volver al login
              </button>
            </div>
          ) : mode === 'forgot' ? (
            <form onSubmit={handleForgot} className="space-y-4">
              <p className="text-white/60 text-sm mb-4">Ingresa tu correo y te enviaremos un enlace para recuperar tu contraseña.</p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" placeholder="correo@ejemplo.com" value={email}
                  onChange={e => setEmail(e.target.value)} disabled={loading}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Enviar enlace
              </button>
              <button type="button" onClick={() => { setMode('login'); setError('') }}
                className="w-full text-white/40 hover:text-white text-sm transition-colors">
                Volver al login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" placeholder="correo@ejemplo.com" value={email}
                  onChange={e => setEmail(e.target.value)} disabled={loading} autoComplete="email"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors" />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type={showPass ? 'text' : 'password'} placeholder="Contraseña" value={password}
                  onChange={e => setPassword(e.target.value)} disabled={loading} autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-yellow-400 transition-colors" />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => { setMode('forgot'); setError('') }}
                  className="text-yellow-400 hover:text-yellow-300 text-xs transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Iniciar sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
})

export default LoginModal
