import React from 'react'
import { Smartphone, Star, Download, Dumbbell, TrendingUp, Apple, PlayCircle } from 'lucide-react'

const appFeatures = [
  { icon: Dumbbell,    label: 'Rutinas personalizadas', desc: 'Plan diseñado por tu coach' },
  { icon: TrendingUp,  label: 'Seguimiento de progreso', desc: 'Métricas detalladas' },
  { icon: Star,        label: 'Reserva de clases',       desc: 'En tiempo real' },
  { icon: Smartphone,  label: 'Nutrición',              desc: 'Guías y recetas' },
]

export default function AppSection() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: '#0F1420' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
              <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>App móvil</span>
            </div>
            <h2 className="font-black uppercase text-white leading-none mb-6"
              style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Santa Lucía App:<br /><span style={{ color: '#1A5CE5' }}>Entrena donde quieras</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(200,214,232,0.6)' }}>
              Una experiencia de entrenamiento completa dentro y fuera del gimnasio. Accede a rutinas, seguimiento y mucho más.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#1A5CE5]" style={{ color: '#1A5CE5' }} />
              ))}
              <span className="text-sm ml-2" style={{ color: 'rgba(200,214,232,0.5)' }}>4.8 · Más de 50k descargas</span>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {appFeatures.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(26,92,229,0.12)' }}>
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1A5CE5' }} />
                  <div>
                    <p className="text-white text-sm font-bold">{label}</p>
                    <p className="text-xs" style={{ color: 'rgba(200,214,232,0.4)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Apple className="w-6 h-6" />
                <div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Descarga en</p>
                  <p className="text-sm font-black">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <PlayCircle className="w-6 h-6" style={{ color: '#1A5CE5' }} />
                <div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Descarga en</p>
                  <p className="text-sm font-black">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              {/* Glow */}
              <div className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{ background: 'rgba(26,92,229,0.25)' }} />

              {/* Phone */}
              <div className="w-64 rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  border: '4px solid rgba(26,92,229,0.3)',
                  background: '#0A0A0F',
                  boxShadow: '0 0 60px rgba(26,92,229,0.3)',
                }}>
                {/* Status bar */}
                <div className="h-8 flex items-center justify-center"
                  style={{ background: 'rgba(26,92,229,0.1)' }}>
                  <div className="w-20 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </div>
                {/* App content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)' }}>
                      <span className="text-white font-black text-xs" style={{ fontFamily: 'Barlow Condensed' }}>SL</span>
                    </div>
                    <div>
                      <p className="text-white font-black text-sm" style={{ fontFamily: 'Barlow Condensed' }}>SANTA LUCÍA</p>
                      <p className="text-xs" style={{ color: 'rgba(200,214,232,0.4)' }}>Coach App</p>
                    </div>
                  </div>
                  {/* Progress ring placeholder */}
                  <div className="rounded-xl p-4 mb-3 text-center"
                    style={{ background: 'linear-gradient(135deg, rgba(26,92,229,0.2), rgba(13,58,153,0.15))', border: '1px solid rgba(26,92,229,0.2)' }}>
                    <p className="text-white font-black text-2xl" style={{ fontFamily: 'Barlow Condensed' }}>87%</p>
                    <p className="text-xs" style={{ color: 'rgba(200,214,232,0.5)' }}>Meta semanal</p>
                  </div>
                  {['Rutina de hoy', 'Progreso', 'Nutrición', 'Clases'].map((item, i) => (
                    <div key={item} className="flex justify-between items-center rounded-lg px-3 py-2.5 mb-1.5"
                      style={{ background: i === 0 ? 'rgba(26,92,229,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(26,92,229,0.3)' : 'rgba(255,255,255,0.05)'}` }}>
                      <span className="text-white text-xs font-semibold">{item}</span>
                      <span style={{ color: '#1A5CE5' }} className="text-xs">›</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
