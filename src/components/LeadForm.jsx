import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, Loader2 } from 'lucide-react'

const PLANES = ['Elite', 'Fit', 'Basic']

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(26,92,229,0.2)',
  color: '#fff',
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function LeadForm() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', plan_elegido: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = async () => {
    if (!form.nombre || !form.email) { setError('Nombre y email son requeridos'); return }
    setLoading(true); setError('')
    const { error } = await supabase.from('leads').insert({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || null,
      plan_elegido: form.plan_elegido || null,
      estado: 'nuevo',
    })
    setLoading(false)
    if (error) { setError('Ocurrió un error. Intenta de nuevo.'); return }
    setDone(true)
  }

  if (done) return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(26,92,229,0.15)', border: '2px solid rgba(26,92,229,0.4)' }}>
        <CheckCircle className="w-8 h-8" style={{ color: '#1A5CE5' }} />
      </div>
      <h3 className="text-white font-black text-2xl" style={{ fontFamily: 'Barlow Condensed' }}>¡Listo! Pronto te contactamos</h3>
      <p className="text-sm max-w-sm" style={{ color: 'rgba(200,214,232,0.5)' }}>Uno de nuestros asesores se pondrá en contacto contigo a la brevedad.</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: 'nombre', label: 'Nombre completo *', placeholder: 'Tu nombre', type: 'text' },
          { key: 'email',  label: 'Email *', placeholder: 'tu@email.com', type: 'email' },
          { key: 'telefono', label: 'Teléfono', placeholder: '222 000 0000', type: 'tel' },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(200,214,232,0.4)' }}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={e => upd(key, e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1A5CE5'}
              onBlur={e => e.target.style.borderColor = 'rgba(26,92,229,0.2)'}
            />
          </div>
        ))}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'rgba(200,214,232,0.4)' }}>Plan de interés</label>
          <select
            value={form.plan_elegido}
            onChange={e => upd('plan_elegido', e.target.value)}
            style={{ ...inputStyle, color: form.plan_elegido ? '#fff' : 'rgba(255,255,255,0.3)' }}
            onFocus={e => e.target.style.borderColor = '#1A5CE5'}
            onBlur={e => e.target.style.borderColor = 'rgba(26,92,229,0.2)'}
          >
            <option value="" style={{ background: '#131825' }}>Selecciona un plan</option>
            {PLANES.map(p => <option key={p} value={p.toLowerCase()} style={{ background: '#131825' }}>{p}</option>)}
          </select>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button onClick={submit} disabled={loading}
        className="w-full flex items-center justify-center gap-2 font-black uppercase text-base py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-white"
        style={{ background: 'linear-gradient(135deg, #1A5CE5, #0D3A99)', boxShadow: '0 4px 20px rgba(26,92,229,0.4)' }}>
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '¡Quiero inscribirme!'}
      </button>
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Al enviar aceptas que un asesor de Gimnasio Santa Lucía se comunique contigo.
      </p>
    </div>
  )
}
