import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { useCmsContent } from '@/hooks/useCmsContent'
import { ChevronRight, Dumbbell, Users, Clock } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const stats = [
  { icon: Dumbbell, value: '500+', label: 'Equipos' },
  { icon: Users,    value: '3,000+', label: 'Miembros' },
  { icon: Clock,    value: '24/7',  label: 'Acceso Elite' },
]

const heroSlides = [
  {
    id: 1,
    badge: 'INSCRIPCIÓN ABIERTA',
    title: 'TRANSFORMA\nTU CUERPO',
    subtitle: 'El gimnasio que te impulsa a ser más fuerte cada día',
    cta: '¡Inscríbete ya!',
    cta2: 'Ver planes',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80',
  },
  {
    id: 2,
    badge: 'NUEVAS CLASES 2025',
    title: 'CLASES\nGRUPALES',
    subtitle: 'Más de 10 disciplinas con instructores certificados',
    cta: 'Ver clases',
    cta2: 'Ver planes',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80',
  },
  {
    id: 3,
    badge: 'EQUIPAMIENTO DE ÉLITE',
    title: 'EQUIPOS DE\nÚLTIMA GENERACIÓN',
    subtitle: 'Instalaciones premium al mejor precio en Puebla',
    cta: '¡Únete ahora!',
    cta2: 'Ver instalaciones',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1400&q=80',
  },
]

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  return (
    <section className="relative w-full pt-20 overflow-hidden" style={{ background: '#0A0A0F' }}>
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
        style={{ height: 'min(680px, 90vh)' }}
      >
        {heroSlides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt=""
                  className="w-full h-full object-cover object-center"
                  style={{ filter: 'brightness(0.25) saturate(0.8)' }}
                />
                {/* Blue overlay gradient */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.95) 0%, rgba(13,58,153,0.3) 50%, rgba(10,10,15,0.8) 100%)' }} />
                {/* Radial blue accent */}
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(26,92,229,0.15) 0%, transparent 70%)' }} />
              </div>

              {/* Decorative lines */}
              <div className="absolute left-0 top-0 bottom-0 w-1"
                style={{ background: 'linear-gradient(to bottom, transparent, #1A5CE5, transparent)' }} />

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={`max-w-3xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-12 inline-block" style={{ background: '#1A5CE5' }} />
                    <span className="text-xs font-black uppercase tracking-[0.3em]"
                      style={{ color: '#1A5CE5' }}>{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="font-black uppercase leading-none mb-6 text-white"
                    style={{
                      fontFamily: 'Barlow Condensed',
                      fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                      lineHeight: '0.95',
                      whiteSpace: 'pre-line',
                    }}>
                    {slide.title.split('\n').map((line, i) => (
                      <span key={i} className="block">
                        {i === 1
                          ? <span style={{ color: '#1A5CE5', WebkitTextStroke: '1px #1A5CE5' }}>{line}</span>
                          : line
                        }
                      </span>
                    ))}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl font-medium mb-10 max-w-lg"
                    style={{ color: 'rgba(200,214,232,0.85)' }}>
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <a href="#planes"
                      className="inline-flex items-center gap-2 font-black text-base uppercase tracking-widest px-8 py-4 rounded-lg text-white transition-all hover:scale-105 hover:shadow-2xl"
                      style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 20px rgba(26,92,229,0.4)' }}>
                      {slide.cta} <ChevronRight className="w-5 h-5" />
                    </a>
                    <a href="#clases"
                      className="inline-flex items-center gap-2 font-black text-base uppercase tracking-widest px-8 py-4 rounded-lg text-white/80 hover:text-white border border-white/20 hover:border-[rgba(26,92,229,0.6)] transition-all hover:bg-[rgba(26,92,229,0.1)]">
                      {slide.cta2}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0A0A0F, transparent)' }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats bar */}
      <div className="relative z-10 border-t"
        style={{ borderColor: 'rgba(26,92,229,0.2)', background: 'rgba(15,20,32,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x"
            style={{ divideColor: 'rgba(26,92,229,0.2)' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-3 py-5 px-4 group">
                <Icon className="w-6 h-6 flex-shrink-0 transition-colors"
                  style={{ color: '#1A5CE5' }} />
                <div>
                  <p className="font-black text-xl text-white leading-none"
                    style={{ fontFamily: 'Barlow Condensed' }}>{value}</p>
                  <p className="text-xs uppercase tracking-widest font-bold"
                    style={{ color: 'rgba(200,214,232,0.5)' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
