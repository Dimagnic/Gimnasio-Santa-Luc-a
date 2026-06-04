import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, Save, Loader2, CheckCircle, RefreshCw } from 'lucide-react'
import { defaultContent } from '../../data/content'

function deepMerge(base, override) {
  if (!override) return base
  const result = JSON.parse(JSON.stringify(base))
  for (const key of Object.keys(override)) {
    if (
      override[key] !== null &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key], override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

export default function CmsPage() {
  const [content, setContent] = useState(defaultContent)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('active', true)
        .order('id', { ascending: false })
        .limit(1)
        .single()

      if (data && !error) {
        setContent(deepMerge(defaultContent, data.content))
      }
    } catch {
      // usar contenido por defecto
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    const { error } = await supabase
      .from('cms_content')
      .upsert({ id: 1, content, active: true, updated_at: new Date().toISOString() })
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const field = (path, label, multiline = false) => {
    const keys = path.split('.')
    const value = keys.reduce((o, k) => o?.[k], content) ?? ''
    const update = (val) => {
      const newContent = JSON.parse(JSON.stringify(content))
      const keysCopy = [...keys]
      const last = keysCopy.pop()
      const obj = keysCopy.reduce((o, k) => o[k], newContent)
      obj[last] = val
      setContent(newContent)
    }
    return (
      <div key={path}>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
        {multiline ? (
          <textarea
            value={value}
            onChange={e => update(e.target.value)}
            rows={2}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        ) : (
          <input
            value={value}
            onChange={e => update(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        )}
      </div>
    )
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Editor de Contenido</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadContent} className="text-gray-500 hover:text-white p-2 transition-colors" title="Recargar">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleSave} disabled={saving}
              className="btn-primary py-2 px-5 text-sm flex items-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? '¡Guardado!' : 'Guardar'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Gym Info */}
          <div className="card-dark">
            <h3 className="text-white font-semibold mb-4">🏋️ Información del Gym</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field('gym.name', 'Nombre del gimnasio')}
              {field('gym.tagline', 'Slogan')}
              {field('gym.phone', 'Teléfono / WhatsApp')}
              {field('gym.email', 'Email')}
              {field('gym.address', 'Dirección')}
              {field('gym.hours', 'Horarios')}
            </div>
          </div>

          {/* Slides */}
          {[0, 1, 2].map(i => (
            <div key={i} className="card-dark">
              <h3 className="text-white font-semibold mb-4">🖼️ Hero — Slide {i + 1}</h3>
              <div className="space-y-4">
                {field(`hero.slides.${i}.title`, 'Título principal')}
                {field(`hero.slides.${i}.subtitle`, 'Subtítulo', true)}
                {field(`hero.slides.${i}.cta`, 'Texto del botón')}
              </div>
            </div>
          ))}

          {/* Plans */}
          <div className="card-dark">
            <h3 className="text-white font-semibold mb-4">💳 Planes</h3>
            {content.plans?.map((plan, i) => (
              <div key={plan.id} className="mb-6 pb-6 border-b border-gray-800 last:border-0 last:mb-0 last:pb-0">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Plan {i + 1} — {plan.name}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {field(`plans.${i}.name`, 'Nombre')}
                  {field(`plans.${i}.price`, 'Precio ($)')}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="card-dark">
            <h3 className="text-white font-semibold mb-4">📍 Sección de Contacto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field('gym.phone', 'Teléfono WhatsApp')}
              {field('gym.address', 'Dirección visible')}
            </div>
          </div>
        </div>

        {/* Save bottom */}
        <div className="mt-8 flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="btn-primary py-3 px-8 flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saved ? '¡Cambios guardados!' : 'Guardar todos los cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
