import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Loader2, MapPin, X, Save } from 'lucide-react'

const PER_PAGE = 8
const EMPTY = { nombre: '', slug: '', direccion: '', ciudad: '', estado: '', codigo_postal: '', telefono: '', email: '', abierto_24h: false, activo: true }

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-white/40 text-xs uppercase tracking-wide font-semibold">{label}</label>
    {children}
  </div>
)

const Input = ({ ...props }) => (
  <input {...props} className="w-full bg-black border border-white/10 text-white placeholder-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
)

export default function GymsPage() {
  const [items,   setItems]   = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(0)
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [modal,   setModal]   = useState(null) // null | { type: 'form'|'delete', item? }
  const [form,    setForm]    = useState(EMPTY)

  const load = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('gimnasios').select('*', { count: 'exact' })
    if (search) q = q.or(`nombre.ilike.%${search}%,ciudad.ilike.%${search}%,estado.ilike.%${search}%`)
    q = q.order('nombre').range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)
    const { data, count } = await q
    setItems(data || []); setTotal(count || 0); setLoading(false)
  }, [search, page])

  useEffect(() => { load() }, [load])
  useEffect(() => { setPage(0) }, [search])

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const openNew  = () => { setForm(EMPTY); setModal({ type: 'form' }) }
  const openEdit = (item) => { setForm({ ...item }); setModal({ type: 'form', item }) }

  const save = async () => {
    setSaving(true)
    const { id, created_at, updated_at, ...data } = form
    if (!data.nombre || !data.ciudad) { setSaving(false); return }
    if (!data.slug) data.slug = data.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const { error } = form.id
      ? await supabase.from('gimnasios').update(data).eq('id', form.id)
      : await supabase.from('gimnasios').insert(data)
    setSaving(false)
    if (!error) { setModal(null); load() }
  }

  const del = async (id) => {
    await supabase.from('gimnasios').delete().eq('id', id)
    setModal(null); load()
  }

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Barlow Condensed' }}>Gimnasios</h2>
          <p className="text-white/40 text-sm">{total} sucursales registradas</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm px-4 py-2.5 rounded-lg transition-all hover:scale-105">
          <Plus className="w-4 h-4" />Nueva sucursal
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input placeholder="Buscar por nombre, ciudad o estado..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-white/10 text-white placeholder-white/30 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
      </div>

      <div className="bg-gray-900 rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin w-6 h-6 text-yellow-400" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/5">
              <tr>
                {['Nombre','Ciudad','Estado','24/7','Estado',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-white/30 font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(gym => (
                <tr key={gym.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-white font-medium">{gym.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/60">{gym.ciudad}</td>
                  <td className="px-4 py-3 text-white/60">{gym.estado}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gym.abierto_24h ? 'bg-green-400/10 text-green-400' : 'bg-white/5 text-white/30'}`}>
                      {gym.abierto_24h ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gym.activo ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                      {gym.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(gym)} className="text-white/20 hover:text-yellow-400 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setModal({ type: 'delete', item: gym })} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-white/20">No hay gimnasios</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-sm">Página {page+1} de {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => p-1)} disabled={page === 0} className="p-2 bg-gray-900 border border-white/10 text-white/60 hover:text-white rounded-lg disabled:opacity-30 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setPage(p => p+1)} disabled={page >= totalPages-1} className="p-2 bg-gray-900 border border-white/10 text-white/60 hover:text-white rounded-lg disabled:opacity-30 transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {modal?.type === 'form' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setModal(null)} />
          <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-gray-900">
              <h3 className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>
                {modal.item ? 'Editar gimnasio' : 'Nuevo gimnasio'}
              </h3>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><Field label="Nombre"><Input placeholder="GymFit Reforma" value={form.nombre} onChange={e => upd('nombre', e.target.value)} /></Field></div>
                <Field label="Ciudad"><Input placeholder="Ciudad de México" value={form.ciudad} onChange={e => upd('ciudad', e.target.value)} /></Field>
                <Field label="Estado"><Input placeholder="CDMX" value={form.estado} onChange={e => upd('estado', e.target.value)} /></Field>
                <div className="col-span-2"><Field label="Dirección"><Input placeholder="Av. Reforma 123" value={form.direccion} onChange={e => upd('direccion', e.target.value)} /></Field></div>
                <Field label="Código Postal"><Input placeholder="06600" value={form.codigo_postal || ''} onChange={e => upd('codigo_postal', e.target.value)} /></Field>
                <Field label="Teléfono"><Input placeholder="5512345678" value={form.telefono || ''} onChange={e => upd('telefono', e.target.value)} /></Field>
                <div className="col-span-2"><Field label="Email"><Input type="email" placeholder="reforma@gymfit.com" value={form.email || ''} onChange={e => upd('email', e.target.value)} /></Field></div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.abierto_24h} onChange={e => upd('abierto_24h', e.target.checked)}
                    className="w-4 h-4 accent-yellow-400" />
                  <span className="text-white/60 text-sm">Abierto 24/7</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.activo} onChange={e => upd('activo', e.target.checked)}
                    className="w-4 h-4 accent-yellow-400" />
                  <span className="text-white/60 text-sm">Activo</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 rounded-lg transition-all disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Guardar
                </button>
                <button onClick={() => setModal(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setModal(null)} />
          <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold text-lg mb-2">Eliminar gimnasio</h3>
            <p className="text-white/50 text-sm mb-6">¿Eliminar <strong className="text-white">{modal.item.nombre}</strong>?</p>
            <div className="flex gap-3">
              <button onClick={() => del(modal.item.id)} className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-lg transition-colors">Eliminar</button>
              <button onClick={() => setModal(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
