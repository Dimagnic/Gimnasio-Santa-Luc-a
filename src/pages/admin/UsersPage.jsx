import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, ChevronLeft, ChevronRight, Loader2, Edit, X, Save } from 'lucide-react'

const PER_PAGE = 10
const ROLES = ['usuario', 'editor', 'admin']

export default function UsersPage() {
  const [items,   setItems]   = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(0)
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('profiles').select('*', { count: 'exact' })
    if (search) q = q.or(`nombre_completo.ilike.%${search}%,email.ilike.%${search}%`)
    q = q.order('created_at', { ascending: false }).range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)
    const { data, count } = await q
    setItems(data || []); setTotal(count || 0); setLoading(false)
  }, [search, page])

  useEffect(() => { load() }, [load])
  useEffect(() => { setPage(0) }, [search])

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    setSaving(true)
    const { error } = await supabase.from('profiles').update({
      nombre_completo: form.nombre_completo,
      rol: form.rol,
      activo: form.activo,
    }).eq('id', form.id)
    setSaving(false)
    if (!error) { setModal(null); load() }
  }

  const totalPages = Math.ceil(total / PER_PAGE)
  const rolColor = { admin: 'bg-yellow-400/10 text-yellow-400', editor: 'bg-blue-400/10 text-blue-400', usuario: 'bg-white/5 text-white/40' }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Barlow Condensed' }}>Usuarios</h2>
        <p className="text-white/40 text-sm">{total} usuarios registrados</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input placeholder="Buscar por nombre o email..."
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
                {['Nombre','Email','Rol','Estado','Registro',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-white/30 font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{u.nombre_completo || '—'}</td>
                  <td className="px-4 py-3 text-white/60">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rolColor[u.rol]}`}>{u.rol}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${u.activo ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">{new Date(u.created_at).toLocaleDateString('es-MX')}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setForm({ ...u }); setModal(true) }} className="text-white/20 hover:text-yellow-400 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-white/20">No hay usuarios</td></tr>}
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

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setModal(null)} />
          <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-white font-black text-xl" style={{ fontFamily: 'Barlow Condensed' }}>Editar usuario</h3>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-white/40 text-xs uppercase tracking-wide font-semibold">Nombre completo</label>
                <input value={form.nombre_completo || ''} onChange={e => upd('nombre_completo', e.target.value)}
                  className="w-full bg-black border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-white/40 text-xs uppercase tracking-wide font-semibold">Email</label>
                <input value={form.email} disabled
                  className="w-full bg-black/50 border border-white/5 text-white/30 rounded-lg px-3 py-2.5 text-sm cursor-not-allowed" />
              </div>
              <div className="space-y-1">
                <label className="text-white/40 text-xs uppercase tracking-wide font-semibold">Rol</label>
                <select value={form.rol} onChange={e => upd('rol', e.target.value)}
                  className="w-full bg-black border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors">
                  {ROLES.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.activo} onChange={e => upd('activo', e.target.checked)} className="w-4 h-4 accent-yellow-400" />
                <span className="text-white/60 text-sm">Cuenta activa</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 rounded-lg transition-all disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Guardar
                </button>
                <button onClick={() => setModal(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-colors">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
