import React from 'react'
import LeadForm from './LeadForm'
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react'
import { useCmsContent } from '@/hooks/useCmsContent'

export default function ContactSection() {
  const { content } = useCmsContent()
  const gym = content?.gym || {}

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,92,229,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
              <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>Únete hoy</span>
            </div>
            <h2 className="font-black uppercase text-white leading-none mb-6"
              style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Empieza<br /><span style={{ color: '#1A5CE5' }}>ahora</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(200,214,232,0.6)' }}>
              Déjanos tus datos y un asesor te contactará en menos de 24 horas. ¡Tu transformación comienza hoy!
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(26,92,229,0.15)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(26,92,229,0.15)' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#1A5CE5' }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ubicación</p>
                  <p className="text-sm" style={{ color: 'rgba(200,214,232,0.5)' }}>{gym.address || 'Puebla, México'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(26,92,229,0.15)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(26,92,229,0.15)' }}>
                  <Phone className="w-5 h-5" style={{ color: '#1A5CE5' }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Teléfono</p>
                  <p className="text-sm" style={{ color: 'rgba(200,214,232,0.5)' }}>{gym.phone || '+52 222 000 0000'}</p>
                </div>
              </div>
              {gym.hours && (
                <div className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(26,92,229,0.15)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(26,92,229,0.15)' }}>
                    <span className="text-sm" style={{ color: '#1A5CE5' }}>🕐</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Horarios</p>
                    <p className="text-sm" style={{ color: 'rgba(200,214,232,0.5)' }}>{gym.hours}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(26,92,229,0.15)', border: '1px solid rgba(26,92,229,0.3)' }}>
                <Instagram className="w-5 h-5" style={{ color: '#1A5CE5' }} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(26,92,229,0.15)', border: '1px solid rgba(26,92,229,0.3)' }}>
                <Facebook className="w-5 h-5" style={{ color: '#1A5CE5' }} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-7 md:p-8"
            style={{ background: '#131825', border: '1px solid rgba(26,92,229,0.2)', boxShadow: '0 8px 40px rgba(26,92,229,0.1)' }}>
            <h3 className="font-black text-white text-2xl uppercase mb-6" style={{ fontFamily: 'Barlow Condensed' }}>
              Contáctanos
            </h3>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
