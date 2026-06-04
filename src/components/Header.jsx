import React, { useState, useEffect } from 'react'
import { Menu, X, MapPin, Shield, LogOut, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext.jsx'
import LoginModal from '@/components/LoginModal.jsx'

const navItems = [
  { label: 'Instalaciones', href: '#instalaciones' },
  { label: 'Planes',        href: '#planes' },
  { label: 'Clases',        href: '#clases' },
  { label: 'Contacto',      href: '#contacto' },
]

export default function Header() {
  const { user, profile, logout, isAdmin, isEditor, nombreCompleto } = useAuth()
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-[rgba(26,92,229,0.2)] shadow-[0_4px_30px_rgba(26,92,229,0.15)]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)' }}>
                  <span className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>SL</span>
                </div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: '0 0 20px rgba(26,92,229,0.6)' }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A5CE5]">Gimnasio</span>
                <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: 'Barlow Condensed' }}>
                  SANTA <span className="text-[#1A5CE5]">LUCÍA</span>
                </span>
              </div>
            </a>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <a key={item.label} href={item.href}
                  className="relative text-white/70 hover:text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all group">
                  {item.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#1A5CE5] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {(isAdmin || isEditor) && (
                    <a href="/admin"
                      className="hidden md:flex items-center gap-1.5 border border-[rgba(26,92,229,0.4)] text-[#1A5CE5] hover:bg-[#1A5CE5] hover:text-white text-sm font-bold px-3 py-2 rounded-lg transition-all">
                      <Shield className="w-4 h-4" />Admin
                    </a>
                  )}
                  <div className="hidden md:flex items-center gap-2 text-white/60 text-sm">
                    <User className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">{nombreCompleto}</span>
                  </div>
                  <button onClick={logout}
                    className="hidden md:flex items-center gap-1 text-white/40 hover:text-red-400 text-sm transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button onClick={() => setLoginOpen(true)}
                  className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold transition-all border border-white/10 hover:border-[rgba(26,92,229,0.5)] px-3 py-2 rounded-lg">
                  <User className="w-4 h-4" />Acceder
                </button>
              )}
              <a href="#planes"
                className="relative overflow-hidden font-black text-sm px-6 py-3 uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 15px rgba(26,92,229,0.4)' }}>
                ¡Inscríbete!
              </a>
              <button onClick={() => setMenuOpen(true)} className="lg:hidden text-white p-1">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-72 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: '#0F1420', borderLeft: '1px solid rgba(26,92,229,0.2)' }}>
          <div className="flex items-center justify-between p-5 border-b border-[rgba(26,92,229,0.2)]">
            <span className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>
              SANTA <span style={{ color: '#1A5CE5' }}>LUCÍA</span>
            </span>
            <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-5 flex flex-col gap-1">
            {navItems.map(item => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white hover:bg-[rgba(26,92,229,0.1)] py-3 px-3 text-lg font-semibold uppercase border-b border-white/5 transition-all rounded-lg">
                {item.label}
              </a>
            ))}
            {user ? (
              <>
                {(isAdmin || isEditor) && (
                  <a href="/admin" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-3 px-3 font-bold uppercase border-b border-white/5"
                    style={{ color: '#1A5CE5' }}>
                    <Shield className="w-4 h-4" />Panel Admin
                  </a>
                )}
                <button onClick={() => { logout(); setMenuOpen(false) }}
                  className="text-left py-3 px-3 text-red-400 font-semibold uppercase">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button onClick={() => { setLoginOpen(true); setMenuOpen(false) }}
                className="text-left py-3 px-3 text-white/60 font-semibold uppercase border-b border-white/5">
                Acceder
              </button>
            )}
            <a href="#planes" onClick={() => setMenuOpen(false)}
              className="mt-4 text-white font-black text-center py-3 uppercase tracking-widest transition-all hover:opacity-90 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 15px rgba(26,92,229,0.3)' }}>
              ¡Inscríbete ya!
            </a>
          </nav>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
