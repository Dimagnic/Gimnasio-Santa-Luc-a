import React from 'react'
import { ArrowRight, CheckCircle2, Dumbbell, Zap, Heart } from 'lucide-react'

const cards = [
  {
    icon: Dumbbell,
    title: 'Peso Libre Integrado',
    desc: 'Equipos de última generación para tu entrenamiento de fuerza e hipertrofia. Mancuernas, barras y máquinas profesionales.',
    num: '01',
  },
  {
    icon: Zap,
    title: 'Clases Grupales',
    desc: 'Más de 10 disciplinas con instructores certificados. Incluidas en tu plan sin costo adicional.',
    num: '02',
  },
  {
    icon: Heart,
    title: 'Área Funcional',
    desc: 'Espacios diseñados para entrenamiento funcional y cardiovascular. Cuerdas, kettlebells, TRX y más.',
    num: '03',
  },
]

const features = [
  'Estacionamiento gratuito',
  'Vestidores con regaderas',
  'Área de estiramientos',
  'Instructor disponible',
]

export default function ExperienceSection() {
  return (
    <section id="instalaciones" className="py-24 overflow-hidden" style={{ background: '#0F1420' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
              <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>Instalaciones</span>
            </div>
            <h2 className="font-black uppercase leading-none text-white"
              style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Vive la experiencia<br />
              <span style={{ color: '#1A5CE5' }}>Santa Lucía</span>
            </h2>
          </div>
          <p className="text-lg max-w-sm leading-relaxed" style={{ color: 'rgba(200,214,232,0.6)' }}>
            Disfruta de un ambiente agradable y seguro con las mejores instalaciones al mejor precio.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Image panel */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden group"
            style={{ height: '520px' }}>
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85"
              alt="Instalaciones Santa Lucía"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'brightness(0.7) saturate(0.9)' }}
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />
            {/* Blue accent overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(26,92,229,0.15) 0%, transparent 50%)' }} />

            {/* Features chips */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{ background: 'rgba(26,92,229,0.2)', border: '1px solid rgba(26,92,229,0.4)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#1A5CE5' }} />
                    <span className="text-white text-xs font-semibold">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cards column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon
              return (
                <div key={i}
                  className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(26,92,229,0.15)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(26,92,229,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,92,229,0.15)'}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(26,92,229,0.15)' }}>
                      <Icon className="w-6 h-6" style={{ color: '#1A5CE5' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-black text-white text-lg uppercase"
                          style={{ fontFamily: 'Barlow Condensed' }}>{card.title}</h3>
                        <span className="font-black text-4xl leading-none"
                          style={{ color: 'rgba(26,92,229,0.15)', fontFamily: 'Barlow Condensed' }}>{card.num}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,214,232,0.55)' }}>{card.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            <a href="#planes"
              className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest py-4 px-6 rounded-xl text-white transition-all hover:scale-105 hover:shadow-2xl mt-2"
              style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 20px rgba(26,92,229,0.35)' }}>
              Ver planes <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
