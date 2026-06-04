import React, { useState } from 'react'
import { footerLinks, countries } from '@/data/content'
import { Facebook, Instagram, Youtube, Twitter, MapPin, ChevronDown } from 'lucide-react'

const socialLinks = [
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube,   href: '#', label: 'YouTube' },
  { icon: Twitter,   href: '#', label: 'Twitter' },
]

export default function Footer() {
  const [countriesOpen, setCountriesOpen] = useState(false)

  return (
    <footer style={{ background: '#0F1420', borderTop: '1px solid rgba(26,92,229,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)' }}>
                <span className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>SL</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: '#1A5CE5' }}>Gimnasio</p>
                <p className="text-white font-black text-xl leading-none" style={{ fontFamily: 'Barlow Condensed' }}>
                  SANTA <span style={{ color: '#1A5CE5' }}>LUCÍA</span>
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(200,214,232,0.4)' }}>
              El gimnasio que te impulsa a ser más fuerte cada día. Instalaciones premium, instructores certificados y los mejores precios en Puebla.
            </p>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'rgba(200,214,232,0.3)' }}>Síguenos</p>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(26,92,229,0.1)', border: '1px solid rgba(26,92,229,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1A5CE5'; e.currentTarget.style.borderColor = '#1A5CE5' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,92,229,0.1)'; e.currentTarget.style.borderColor = 'rgba(26,92,229,0.2)' }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map(section => (
            <div key={section.title}>
              <h3 className="text-white font-black uppercase text-sm tracking-widest mb-5"
                style={{ fontFamily: 'Barlow Condensed' }}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(200,214,232,0.4)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1A5CE5'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,214,232,0.4)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div style={{ borderTop: '1px solid rgba(26,92,229,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <button onClick={() => setCountriesOpen(v => !v)}
            className="flex items-center gap-2 text-sm font-semibold transition-colors mb-3"
            style={{ color: 'rgba(200,214,232,0.4)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,214,232,0.4)'}
          >
            <MapPin className="w-4 h-4" />
            Nuestras sucursales
            <ChevronDown className={`w-4 h-4 transition-transform ${countriesOpen ? 'rotate-180' : ''}`} />
          </button>
          {countriesOpen && (
            <div className="flex flex-wrap gap-2">
              {countries.map(c => (
                <a key={c} href="#"
                  className="text-xs px-3 py-1 rounded-full transition-all"
                  style={{ color: 'rgba(200,214,232,0.4)', border: '1px solid rgba(26,92,229,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#1A5CE5'; e.currentTarget.style.borderColor = 'rgba(26,92,229,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,214,232,0.4)'; e.currentTarget.style.borderColor = 'rgba(26,92,229,0.2)' }}
                >
                  {c}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(26,92,229,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            *Consulte condiciones y reglamentos en términos y condiciones.
          </p>
          <div className="flex gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} Gimnasio Santa Lucía. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
