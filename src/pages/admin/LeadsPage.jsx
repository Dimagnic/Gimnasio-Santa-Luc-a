import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, ChevronLeft, ChevronRight, Loader2, Eye, Trash2, Edit } from 'lucide-react'

const PER_PAGE = 10
const ESTADOS = ['nuevo', 'contactado', 'inscrito', 'perdido']
const PLANES  = ['black', 'fit', 'smart']

const estadoColor = {
  nuevo:      'bg-blue-400/10 text-blue-400',
  contactado: 'bg-yellow-400/10 text-yellow-400',
  inscrito:   'bg-green-400/10 text-green-400',
  perdido:    'bg-red-400/10 text-red-400',
}

export default function LeadsPage() {
  const [items,   setItems]   = useState([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(0)
  const [search,  setSearch]  = useState('')
  const [estado,  setEstado]  = useState('todos')
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null) // { type: 'view'|'edit'|'delete', item }

  const load = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('leads').select('*, gimnasios(nombre)', { count: 'exact' })
    if (search) q = q.or(`nombre.ilike.%${search}%,email.ilike.%${search}%,telefono.ilike.%${search}%`)
    if (estado !== 'todos') q = q.eq('estado', estado)
    q = q.order('created_at', { ascending: false }).range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)
    const { data, count } = await q
    setItems(data || [])
    setTotal(count || 0)
    setLoading(false)
  }, [search, estado, page])

  useEffect(() => { load() }, [load])
  useEffect(() => { setPage(0) }, [search, estado])

  const updateEstado = async (id, nuevoEstado) => {
    await supabase.from('leads').update({ estado: nuevoEstado }).eq('id', id)
    load()
  }

  const deleteLead = async (id) => {
    await supabase.from('leads').delete().eq('id', id)
    setModal(null); load()
  }

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Barlow Condensed' }}>Leads / Inscripciones</h2>
          <p className="text-white/40 text-sm">{total} registros en total</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input placeholder="Buscar por nombre, email o teléfono..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-white/10 text-white placeholder-white/30 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors" />
        </div>
        <select value={estado} onChange={e => setEstado(e.target.value)}
          className="bg-gray-900 border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-yellow-400">
          <option value="todos">Todos los estados</option>
          {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-gray-900 rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin w-6 h-6 text-yellow-400" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/5 bg-white/3">
                <tr>
                  {['Nombre','Email','Teléfono','Plan','Estado','Fecha',''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-white/30 font-semibold text-xs uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{item.nombre}</td>
                    <td className="px-4 py-3 text-white/60">{item.email}</td>
                    <td className="px-4 py-3 text-white/60">{item.telefono || '—'}</td>
                    <td className="px-4 py-3">
                      {item.plan_elegido ? (
                        <span className="bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                          {item.plan_elegido}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select value={item.estado}
                        onChange={e => updateEstado(item.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${estadoColor[item.estado]}`}
                        style={{ background: 'transparent' }}>
                        {ESTADOS.map(e => <option key={e} value={e} className="bg-gray-900 text-white">{e}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs">
                      {new Date(item.created_at).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setModal({ type: 'delete', item })}
                        className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-white/20">No hay leads</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-sm">Página {page+1} de {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => p-1)} disabled={page === 0}
              className="p-2 bg-gray-900 border border-white/10 text-white/60 hover:text-white rounded-lg disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setPage(p => p+1)} disabled={page >= totalPages-1}
              className="p-2 bg-gray-900 border border-white/10 text-white/60 hover:text-white rounded-lg disabled:opacity-30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {modal?.type === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setModal(null)} />
          <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold text-lg mb-2">Eliminar lead</h3>
            <p className="text-white/50 text-sm mb-6">¿Seguro que quieres eliminar a <strong className="text-white">{modal.item.nombre}</strong>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => deleteLead(modal.item.id)}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2.5 rounded-lg transition-colors">Eliminar</button>
              <button onClick={() => setModal(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 rounded-lg transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
