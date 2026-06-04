import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { Check, X, Zap } from 'lucide-react'
import { useCmsSection } from '@/hooks/useCmsContent'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function PlanCard({ plan }) {
  const isElite = plan.id === 'elite'
  return (
    <div className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
      style={{
        background: isElite ? 'linear-gradient(145deg, #0D3A99, #1A5CE5)' : 'rgba(255,255,255,0.03)',
        border: isElite ? '1px solid rgba(26,92,229,0.6)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isElite ? '0 8px 40px rgba(26,92,229,0.4)' : 'none',
      }}>

      {/* Top glow for elite */}
      {isElite && (
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,214,232,0.8), transparent)' }} />
      )}

      {plan.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="flex items-center gap-1 text-xs font-black uppercase px-3 py-1 rounded-full"
            style={{ background: isElite ? 'rgba(255,255,255,0.2)' : 'rgba(26,92,229,0.15)', color: isElite ? '#fff' : '#1A5CE5', border: isElite ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(26,92,229,0.3)' }}>
            {isElite && <Zap className="w-3 h-3" />}{plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-7 pb-5"
        style={{ borderBottom: isElite ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs font-black uppercase tracking-[0.25em] mb-1"
          style={{ color: isElite ? 'rgba(255,255,255,0.6)' : 'rgba(200,214,232,0.4)' }}>Plan</p>
        <h2 className="font-black uppercase mb-5 text-white"
          style={{ fontFamily: 'Barlow Condensed', fontSize: '2.5rem' }}>{plan.name}</h2>
        <p className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: isElite ? 'rgba(255,255,255,0.5)' : 'rgba(200,214,232,0.4)' }}>{plan.promo}</p>
        <div className="flex items-end gap-1">
          <span className="text-sm font-bold" style={{ color: isElite ? 'rgba(255,255,255,0.7)' : 'rgba(200,214,232,0.5)' }}>$</span>
          <span className="font-black leading-none text-white" style={{ fontFamily: 'Barlow Condensed', fontSize: '3.5rem' }}>{plan.price}</span>
          <span className="text-sm mb-2" style={{ color: isElite ? 'rgba(255,255,255,0.6)' : 'rgba(200,214,232,0.5)' }}>/mes</span>
        </div>
      </div>

      {/* Features */}
      <div className="p-7 flex-1 flex flex-col">
        <ul className="flex-1 space-y-4 mb-7">
          {plan.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3">
              {feat.included
                ? <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: isElite ? 'rgba(255,255,255,0.2)' : 'rgba(26,92,229,0.15)' }}>
                    <Check className="w-3 h-3" style={{ color: isElite ? '#fff' : '#1A5CE5' }} />
                  </div>
                : <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <X className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </div>
              }
              <span className="text-sm"
                style={{ color: feat.included ? (isElite ? '#fff' : 'rgba(255,255,255,0.85)') : 'rgba(255,255,255,0.2)' }}>
                {feat.text}
              </span>
            </li>
          ))}
        </ul>
        <a href="#contacto"
          className="block text-center font-black uppercase py-3.5 px-6 tracking-widest transition-all hover:scale-105 active:scale-95 rounded-xl"
          style={isElite
            ? { background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }
            : { background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', color: '#fff', boxShadow: '0 4px 15px rgba(26,92,229,0.35)' }
          }>
          ¡Quiero este plan!
        </a>
      </div>
    </div>
  )
}

export default function PlansSection() {
  const plans = useCmsSection('plans')
  if (!plans?.length) return null
  return (
    <section id="planes" className="py-24" style={{ background: '#0A0A0F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
            <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#1A5CE5' }}>Membresías</span>
            <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
          </div>
          <h2 className="font-black uppercase text-white leading-none"
            style={{ fontFamily: 'Barlow Condensed', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            Elige tu <span style={{ color: '#1A5CE5' }}>plan</span>
          </h2>
          <p className="text-lg mt-4" style={{ color: 'rgba(200,214,232,0.5)' }}>Sin contratos. Sin pretextos. Solo resultados.</p>
        </div>

        {/* Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {plans.map(plan => <PlanCard key={plan.id} plan={plan} />)}
        </div>
        <div className="md:hidden">
          <Swiper modules={[Pagination, Navigation]} pagination={{ clickable: true }} spaceBetween={16} slidesPerView={1.1} centeredSlides className="pb-10">
            {plans.map(plan => <SwiperSlide key={plan.id} className="h-auto"><PlanCard plan={plan} /></SwiperSlide>)}
          </Swiper>
        </div>
        <p className="text-center text-xs mt-10" style={{ color: 'rgba(255,255,255,0.2)' }}>
          *Consulte las condiciones promocionales y reglamentos en nuestros términos y condiciones.
        </p>
      </div>
    </section>
  )
}
