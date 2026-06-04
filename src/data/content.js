export const slides = [
  {
    id: 1,
    title: 'Transforma tu cuerpo, transforma tu vida',
    subtitle: 'El gimnasio que te impulsa a ser más fuerte cada día',
    badge: 'INSCRIPCIÓN ABIERTA',
    bgColor: '#0A0A0F',
    accent: '#1A5CE5',
    textDark: false,
    cta: '¡Inscríbete ya!',
  },
  {
    id: 2,
    title: 'Clases grupales incluidas en tu plan',
    subtitle: 'Más de 10 disciplinas con instructores certificados',
    badge: 'NUEVAS CLASES 2025',
    bgColor: '#0F1420',
    accent: '#1A5CE5',
    textDark: false,
    cta: 'Ver clases',
  },
  {
    id: 3,
    title: 'Equipo de última generación',
    subtitle: 'Instalaciones premium al mejor precio en Puebla',
    badge: 'EQUIPAMIENTO NUEVO',
    bgColor: '#0A0A0F',
    accent: '#1A5CE5',
    textDark: false,
    cta: '¡Únete ahora!',
  },
]

export const plans = [
  {
    id: 'elite', name: 'Elite', dark: true, badge: 'MÁS POPULAR',
    price: '699', promo: 'DESDE',
    features: [
      { included: true,  text: 'Acceso a todas las sucursales' },
      { included: true,  text: 'Clases grupales ilimitadas' },
      { included: true,  text: 'Área de peso libre' },
      { included: true,  text: 'Área funcional' },
      { included: true,  text: 'Coach personalizado incluido' },
      { included: true,  text: 'Acceso 24/7' },
    ],
  },
  {
    id: 'fit', name: 'Fit', dark: false, badge: null,
    price: '499', promo: 'DESDE',
    features: [
      { included: true,  text: 'Acceso a sucursal seleccionada' },
      { included: true,  text: 'Clases grupales incluidas' },
      { included: true,  text: 'Área de peso libre' },
      { included: true,  text: 'Área funcional' },
      { included: false, text: 'Coach personalizado incluido' },
      { included: false, text: 'Acceso 24/7' },
    ],
  },
  {
    id: 'basic', name: 'Basic', dark: false, badge: 'ECONÓMICO',
    price: '299', promo: 'DESDE',
    features: [
      { included: true,  text: 'Acceso a sucursal seleccionada' },
      { included: false, text: 'Clases grupales incluidas' },
      { included: true,  text: 'Área de peso libre' },
      { included: false, text: 'Área funcional' },
      { included: false, text: 'Coach personalizado incluido' },
      { included: false, text: 'Acceso 24/7' },
    ],
  },
]

export const experience = [
  { title: 'Peso Libre Integrado', desc: 'Equipos de última generación para tu entrenamiento de fuerza y hipertrofia', emoji: '🏋️', icon: '⚡' },
  { title: 'Salón de Clases', desc: 'Clases grupales con instructores certificados incluidas en tu plan', emoji: '🤸', icon: '🎯' },
  { title: 'Áreas Funcionales', desc: 'Espacios diseñados para entrenamiento funcional y cardiovascular de alto rendimiento', emoji: '⚡', icon: '🔥' },
]

export const classes = [
  { name: 'Zumba', duration: '60 min', level: 'Todos los niveles', desc: 'Baile y fitness combinados en una clase de alta energía. Quema calorías mientras te diviertes.', color: '#E91E63' },
  { name: 'Smart Cross', duration: '45 min', level: 'Intermedio', desc: 'Entrenamiento funcional de alta intensidad. Lleva tu resistencia al siguiente nivel.', color: '#1A5CE5' },
  { name: 'Body Combat', duration: '55 min', level: 'Todos los niveles', desc: 'Inspirado en artes marciales con música de alta energía. Libera tensión y mejora tu coordinación.', color: '#0D3A99' },
  { name: 'Yoga', duration: '60 min', level: 'Principiantes', desc: 'Mejora tu flexibilidad, equilibrio y paz mental. Ideal para complementar tu entrenamiento.', color: '#1248C0' },
  { name: 'Spinning', duration: '45 min', level: 'Todos los niveles', desc: 'Ciclismo indoor de alta intensidad. La mejor forma de mejorar tu capacidad cardiovascular.', color: '#0F3580' },
  { name: 'GAP', duration: '40 min', level: 'Todos los niveles', desc: 'Glúteos, abdomen y piernas en una sola clase. Tonifica y fortalece tu cuerpo completo.', color: '#1A5CE5' },
]

export const addons = [
  { name: 'SL Coach', desc: 'Entrenamiento personalizado con coach certificado, plan diseñado para ti', icon: '👤', price: '+$199/mes' },
  { name: 'SL Body', desc: 'Análisis corporal avanzado con tecnología de bioimpedancia', icon: '📊', price: '+$149/mes' },
  { name: 'SL Nutrición', desc: 'Plan nutricional personalizado con seguimiento mensual', icon: '⚡', price: 'Desde $89' },
  { name: 'Locker Premium', desc: 'Casillero personal con candado incluido todo el mes', icon: '🔒', price: '+$99/mes' },
]

export const footerLinks = {
  brand: { title: 'Santa Lucía', links: [{ label: 'Quiénes somos', href: '#' }, { label: 'Contáctanos', href: '#contacto' }, { label: 'Aviso de Privacidad', href: '#' }, { label: 'Términos y Condiciones', href: '#' }] },
  plans: { title: 'Planes', links: [{ label: 'Planes y precios', href: '#planes' }, { label: 'Plan Elite', href: '#planes' }, { label: 'SL Coach', href: '#' }, { label: 'SL Body', href: '#' }] },
  company: { title: 'Nuestra Empresa', links: [{ label: 'Instalaciones', href: '#' }, { label: 'Instructores', href: '#' }, { label: 'Trabaja con nosotros', href: '#' }] },
}

export const countries = ['Puebla', 'CDMX', 'Monterrey', 'Guadalajara', 'Querétaro']

// ─── defaultContent: objeto unificado para el CMS ───────────────────────────
// Usado por CmsPage y useCmsContent para guardar/cargar todo desde Supabase
export const defaultContent = {
  gym: {
    name: 'Gym Santa Lucía',
    tagline: 'El gimnasio que te impulsa a ser más fuerte cada día',
    phone: '+52 222 123 4567',
    email: 'contacto@gymsantalucia.com',
    address: 'Puebla, México',
    hours: 'Lun–Vie 6:00–22:00 · Sáb 7:00–20:00 · Dom 8:00–16:00',
  },
  hero: {
    slides: [
      { title: 'Transforma tu cuerpo, transforma tu vida', subtitle: 'El gimnasio que te impulsa a ser más fuerte cada día', cta: '¡Inscríbete ya!' },
      { title: 'Clases grupales incluidas en tu plan', subtitle: 'Más de 10 disciplinas con instructores certificados', cta: 'Ver clases' },
      { title: 'Equipo de última generación', subtitle: 'Instalaciones premium al mejor precio en Puebla', cta: '¡Únete ahora!' },
    ],
  },
  plans,
  classes,
  addons,
}
