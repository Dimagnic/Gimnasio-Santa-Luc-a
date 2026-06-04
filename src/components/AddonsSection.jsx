import React from 'react'
import { useCmsSection } from '@/hooks/useCmsContent'
import { ArrowRight, UserCheck, BarChart3, Salad, Lock } from 'lucide-react'

const addonIcons = [UserCheck, BarChart3, Salad, Lock]

export default function AddonsSection() {
  const addons = useCmsSection('addons')
  if (!addons?.length) return null
  return (
    <section className="py-24" style={{ background: '#0A0A0F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
            <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>Servicios adicionales</span>
            <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
          </div>
          <h2 className="font-black uppercase text-white leading-none"
            style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Potencia tu <span style={{ color: '#1A5CE5' }}>entrenamiento</span>
          </h2>
          <p className="text-lg mt-4" style={{ color: 'rgba(200,214,232,0.5)' }}>Agrega servicios premium a cualquier plan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {addons.map((addon, i) => {
            const Icon = addonIcons[i] || UserCheck
            return (
              <div key={i}
                className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(26,92,229,0.15)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(145deg, #1A5CE5, #0D3A99)'
                  e.currentTarget.style.borderColor = 'rgba(26,92,229,0.6)'
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,92,229,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(26,92,229,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: 'rgba(26,92,229,0.15)' }}>
                  <Icon className="w-7 h-7 transition-colors" style={{ color: '#1A5CE5' }} />
                </div>
                <h3 className="font-black text-xl uppercase text-white mb-2"
                  style={{ fontFamily: 'Barlow Condensed' }}>{addon.name}</h3>
                <p className="text-sm leading-relaxed mb-5"
                  style={{ color: 'rgba(200,214,232,0.55)' }}>{addon.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg" style={{ color: '#1A5CE5' }}>{addon.price}</span>
                  <ArrowRight className="w-5 h-5" style={{ color: 'rgba(26,92,229,0.4)' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
