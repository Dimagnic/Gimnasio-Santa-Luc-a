-- ============================================================
-- GIMNASIO SANTA LUCÍA — Setup completo Supabase
-- Ejecuta esto en SQL Editor de tu proyecto Supabase
-- ============================================================

-- ─── 1. PROFILES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  nombre_completo TEXT,
  rol            TEXT NOT NULL DEFAULT 'usuario',
  activo         BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id OR auth.role() = 'authenticated');
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);

-- Auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre_completo, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre_completo', NEW.email),
    'usuario'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. GIMNASIOS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gimnasios (
  id             SERIAL PRIMARY KEY,
  nombre         TEXT NOT NULL,
  slug           TEXT UNIQUE,
  direccion      TEXT,
  ciudad         TEXT NOT NULL,
  estado         TEXT,
  codigo_postal  TEXT,
  telefono       TEXT,
  email          TEXT,
  abierto_24h    BOOLEAN NOT NULL DEFAULT false,
  activo         BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gimnasios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gimnasios_public_read" ON public.gimnasios FOR SELECT USING (activo = true);
CREATE POLICY "gimnasios_auth_write"  ON public.gimnasios FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Sucursal inicial
INSERT INTO public.gimnasios (nombre, slug, ciudad, estado, activo)
VALUES ('Gym Santa Lucía — Centro', 'santa-lucia-centro', 'Puebla', 'Puebla', true)
ON CONFLICT (slug) DO NOTHING;

-- ─── 3. LEADS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  email         TEXT NOT NULL,
  telefono      TEXT,
  plan_elegido  TEXT,
  estado        TEXT NOT NULL DEFAULT 'nuevo',
  gimnasio_id   INTEGER REFERENCES public.gimnasios(id) ON DELETE SET NULL,
  notas         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_public_insert" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_auth_read"     ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "leads_auth_update"   ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "leads_auth_delete"   ON public.leads FOR DELETE USING (auth.role() = 'authenticated');

-- ─── 4. CMS CONTENT ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_content (
  id          INTEGER PRIMARY KEY,
  content     JSONB NOT NULL DEFAULT '{}',
  active      BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT cms_single_row CHECK (id = 1)
);

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cms_public_read" ON public.cms_content FOR SELECT USING (active = true);
CREATE POLICY "cms_auth_write"  ON public.cms_content FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO public.cms_content (id, content, active) VALUES (1, '{
  "gym": {
    "name": "Gym Santa Lucía",
    "tagline": "El gimnasio que te impulsa a ser más fuerte cada día",
    "phone": "+52 222 123 4567",
    "email": "contacto@gymsantalucia.com",
    "address": "Puebla, México",
    "hours": "Lun–Vie 6:00–22:00 · Sáb 7:00–20:00 · Dom 8:00–16:00"
  },
  "hero": {
    "slides": [
      { "title": "Transforma tu cuerpo, transforma tu vida", "subtitle": "El gimnasio que te impulsa a ser más fuerte cada día", "cta": "¡Inscríbete ya!" },
      { "title": "Clases grupales incluidas en tu plan", "subtitle": "Más de 10 disciplinas con instructores certificados", "cta": "Ver clases" },
      { "title": "Equipo de última generación", "subtitle": "Instalaciones premium al mejor precio en Puebla", "cta": "¡Únete ahora!" }
    ]
  },
  "plans": [
    { "id": "elite", "name": "Elite", "dark": true, "badge": "MÁS POPULAR", "price": "699", "promo": "DESDE",
      "features": [
        { "included": true, "text": "Acceso a todas las sucursales" },
        { "included": true, "text": "Clases grupales ilimitadas" },
        { "included": true, "text": "Área de peso libre" },
        { "included": true, "text": "Área funcional" },
        { "included": true, "text": "Coach personalizado incluido" },
        { "included": true, "text": "Acceso 24/7" }
      ]
    },
    { "id": "fit", "name": "Fit", "dark": false, "badge": null, "price": "499", "promo": "DESDE",
      "features": [
        { "included": true,  "text": "Acceso a sucursal seleccionada" },
        { "included": true,  "text": "Clases grupales incluidas" },
        { "included": true,  "text": "Área de peso libre" },
        { "included": true,  "text": "Área funcional" },
        { "included": false, "text": "Coach personalizado incluido" },
        { "included": false, "text": "Acceso 24/7" }
      ]
    },
    { "id": "basic", "name": "Basic", "dark": false, "badge": "ECONÓMICO", "price": "299", "promo": "DESDE",
      "features": [
        { "included": true,  "text": "Acceso a sucursal seleccionada" },
        { "included": false, "text": "Clases grupales incluidas" },
        { "included": true,  "text": "Área de peso libre" },
        { "included": false, "text": "Área funcional" },
        { "included": false, "text": "Coach personalizado incluido" },
        { "included": false, "text": "Acceso 24/7" }
      ]
    }
  ]
}', true)
ON CONFLICT (id) DO NOTHING;

-- ─── 5. TU USUARIO ADMIN ────────────────────────────────────
-- Crea tu perfil admin (ejecutar DESPUÉS de registrarte en el sitio)
INSERT INTO public.profiles (id, email, nombre_completo, rol)
SELECT id, email, email, 'admin'
FROM auth.users
WHERE email = 'nicolas.gontaro3@gmail.com'
ON CONFLICT (id) DO UPDATE SET rol = 'admin', activo = true;

-- ✅ Listo
