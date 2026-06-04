import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { defaultContent, slides, plans, classes, addons } from '../data/content'

// ─── deepMerge ───────────────────────────────────────────────────────────────
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

// Mapa de secciones para compatibilidad con la API anterior
const fallbackMap = { slides, plans, classes, addons }

// ─── Hook principal (usado por CmsPage) ──────────────────────────────────────
// Carga el objeto unificado desde cms_content (fila id=1, active=true)
export function useCmsContent() {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchContent() }, [])

  async function fetchContent() {
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

  return { content, loading, refetch: fetchContent }
}

// ─── Hook por sección (compatibilidad con componentes existentes) ─────────────
// Uso: const plans = useCmsSection('plans')
export function useCmsSection(section) {
  const [data, setData] = useState(fallbackMap[section])

  useEffect(() => {
    supabase
      .from('cms_content')
      .select('content')
      .eq('active', true)
      .order('id', { ascending: false })
      .limit(1)
      .single()
      .then(({ data: row }) => {
        if (row?.content?.[section]) setData(row.content[section])
      })
  }, [section])

  return data
}
