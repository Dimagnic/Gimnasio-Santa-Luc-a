import React, { useState } from 'react'
import { useCmsSection } from '@/hooks/useCmsContent'
import { Clock, Users, ArrowRight, Play } from 'lucide-react'

const classImages = {
  'Zumba':       'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
  'Smart Cross': 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
  'Body Combat': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  'Yoga':        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'Spinning':    'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&q=80',
  'GAP':         'https://images.unsplash.com/photo-1518644730709-0835105d9daa?w=800&q=80',
}

export default function ClassesSection() {
  const classes = useCmsSection('classes')
  const [active, setActive] = useState(0)
  if (!classes?.length) return null

  const activeClass = classes[active] || classes[0]
  const img = classImages[activeClass.name] || classImages['Zumba']

  return (
    <section id="clases" className="py-24 overflow-hidden" style={{ background: '#0F1420' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
              <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>Clases grupales</span>
            </div>
            <h2 className="font-black uppercase text-white leading-none"
              style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Las mejores<br /><span style={{ color: '#1A5CE5' }}>clases</span>
            </h2>
          </div>
          <a href="#contacto"
            className="inline-flex items-center gap-2 font-black uppercase tracking-widest py-4 px-6 rounded-xl text-white transition-all hover:scale-105 self-start lg:self-end"
            style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 20px rgba(26,92,229,0.35)' }}>
            ¡Inscríbete ya! <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Class list */}
          <div className="flex flex-col gap-2">
            {classes.map((cls, i) => (
              <button key={cls.name} onClick={() => setActive(i)}
                className="group flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: active === i ? 'linear-gradient(135deg, #1A5CE5, #0D3A99)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active === i ? 'rgba(26,92,229,0.6)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: active === i ? '0 4px 20px rgba(26,92,229,0.3)' : 'none',
                }}>
                <span className="font-black uppercase text-white text-xl"
                  style={{ fontFamily: 'Barlow Condensed' }}>{cls.name}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5"
                    style={{ color: active === i ? 'rgba(255,255,255,0.8)' : 'rgba(200,214,232,0.4)' }}>
                    <Clock className="w-4 h-4" />{cls.duration}
                  </span>
                  {active === i && (
                    <span className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <Play className="w-4 h-4 text-white fill-white" />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active class detail */}
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(26,92,229,0.2)' }}>
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img}
                  alt={activeClass.name}
                  key={activeClass.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{ filter: 'brightness(0.6) saturate(0.9)' }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(15,20,32,1) 0%, rgba(15,20,32,0.3) 60%, transparent 100%)' }} />
                {/* Blue accent */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(26,92,229,0.2) 0%, transparent 60%)' }} />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-black uppercase px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(26,92,229,0.3)', color: '#fff', border: '1px solid rgba(26,92,229,0.5)' }}>
                    {activeClass.level}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6" style={{ background: '#131825' }}>
                <h3 className="font-black uppercase text-white mb-3"
                  style={{ fontFamily: 'Barlow Condensed', fontSize: '2.5rem' }}>{activeClass.name}</h3>
                <div className="flex gap-5 mb-4">
                  <span className="flex items-center gap-1.5 text-sm" style={{ color: '#1A5CE5' }}>
                    <Clock className="w-4 h-4" />{activeClass.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(200,214,232,0.5)' }}>
                    <Users className="w-4 h-4" />{activeClass.level}
                  </span>
                </div>
                <p className="leading-relaxed mb-6" style={{ color: 'rgba(200,214,232,0.7)' }}>{activeClass.desc}</p>
                <a href="#contacto"
                  className="inline-flex items-center gap-2 font-black uppercase tracking-widest py-3 px-6 rounded-xl text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 15px rgba(26,92,229,0.3)' }}>
                  Únete ahora <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
