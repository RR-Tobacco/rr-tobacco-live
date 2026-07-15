/*
# RR Tobacco — Premium B2B Wholesale Schema

## Overview
Creates the full data model for a premium B2B tobacco wholesale website with
public-facing content pages and an admin panel. The site has NO ecommerce
(no cart/checkout) — it uses "Request Quote" / "Wholesale Enquiry" instead.

## Tables

1. **categories** — product categories (e.g. Premium Cigars, Pipe Tobacco).
   Columns: id, name, slug, description, image_url, sort_order, is_active, created_at.

2. **products** — wholesale product catalog. No price (B2B quote-based).
   Columns: id, name, slug, category_id (FK→categories), short_description,
   description, moq (minimum order quantity), packaging, images (jsonb array of URLs),
   specifications (jsonb key/value), origin, is_featured, is_active, sort_order, created_at.

3. **hero_sliders** — homepage carousel slides.
   Columns: id, title, subtitle, image_url, button_text, button_link, sort_order, is_active, created_at.

4. **gallery** — masonry gallery images with category tags.
   Columns: id, title, image_url, tag, sort_order, is_active, created_at.

5. **testimonials** — business partner testimonials.
   Columns: id, name, company, role, message, rating (1-5), image_url, sort_order, is_active, created_at.

6. **certificates** — quality/compliance certificates.
   Columns: id, title, issuer, image_url, date_received, sort_order, is_active, created_at.

7. **messages** — contact form / wholesale enquiry submissions.
   Columns: id, name, email, phone, company, subject, message, status, created_at.
   Public can INSERT; only authenticated (admin) can read/update/delete.

8. **settings** — site-wide key/value settings (singleton key-value store).
   Columns: id, key (unique), value (jsonb), created_at, updated_at.

9. **activity_logs** — admin audit trail.
   Columns: id, user_email, action, entity, entity_id, details, created_at.

## Security (RLS)

- **Public content tables** (categories, products, hero_sliders, gallery,
  testimonials, certificates, settings): SELECT open to `anon, authenticated`
  so the public site loads without login; full CRUD for `authenticated` (admin)
  so the admin panel can manage them.

- **messages**: INSERT open to `anon, authenticated` (anyone can submit a
  wholesale enquiry); SELECT/UPDATE/DELETE restricted to `authenticated` (admin).

- **activity_logs**: all operations restricted to `authenticated` (admin only).

## Notes
1. No user_id ownership columns on content tables — content is admin-managed,
   not per-user. The admin signs in via Supabase email/password.
2. `is_active` flags let the admin toggle visibility without deleting.
3. `sort_order` allows manual ordering of sliders, categories, products, etc.
4. Product `images` is a jsonb array of URL strings; `specifications` is a
   jsonb object of key/value pairs for the spec table.
*/

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_categories" ON categories;
CREATE POLICY "public_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_categories" ON categories;
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_categories" ON categories;
CREATE POLICY "admin_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_categories" ON categories;
CREATE POLICY "admin_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  short_description text,
  description text,
  moq text NOT NULL DEFAULT '10 cartons',
  packaging text NOT NULL DEFAULT 'Carton',
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  specifications jsonb NOT NULL DEFAULT '{}'::jsonb,
  origin text,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- ============================================================
-- HERO SLIDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS hero_sliders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image_url text NOT NULL,
  button_text text,
  button_link text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE hero_sliders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_hero_sliders" ON hero_sliders;
CREATE POLICY "public_select_hero_sliders" ON hero_sliders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_hero_sliders" ON hero_sliders;
CREATE POLICY "admin_insert_hero_sliders" ON hero_sliders FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_hero_sliders" ON hero_sliders;
CREATE POLICY "admin_update_hero_sliders" ON hero_sliders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_hero_sliders" ON hero_sliders;
CREATE POLICY "admin_delete_hero_sliders" ON hero_sliders FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- GALLERY
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  tag text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_gallery" ON gallery;
CREATE POLICY "public_select_gallery" ON gallery FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gallery" ON gallery;
CREATE POLICY "admin_insert_gallery" ON gallery FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gallery" ON gallery;
CREATE POLICY "admin_update_gallery" ON gallery FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gallery" ON gallery;
CREATE POLICY "admin_delete_gallery" ON gallery FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  role text,
  message text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_testimonials" ON testimonials;
CREATE POLICY "public_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- CERTIFICATES
-- ============================================================
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  image_url text,
  date_received text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_certificates" ON certificates;
CREATE POLICY "public_select_certificates" ON certificates FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_certificates" ON certificates;
CREATE POLICY "admin_insert_certificates" ON certificates FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_certificates" ON certificates;
CREATE POLICY "admin_update_certificates" ON certificates FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_certificates" ON certificates;
CREATE POLICY "admin_delete_certificates" ON certificates FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- MESSAGES (contact form / wholesale enquiries)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public can submit enquiries (INSERT)
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only admin (authenticated) can read/manage messages
DROP POLICY IF EXISTS "admin_select_messages" ON messages;
CREATE POLICY "admin_select_messages" ON messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_messages" ON messages;
CREATE POLICY "admin_update_messages" ON messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_messages" ON messages;
CREATE POLICY "admin_delete_messages" ON messages FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- ============================================================
-- SETTINGS (key-value store)
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_settings" ON settings;
CREATE POLICY "public_select_settings" ON settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_settings" ON settings;
CREATE POLICY "admin_insert_settings" ON settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_settings" ON settings;
CREATE POLICY "admin_update_settings" ON settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_settings" ON settings;
CREATE POLICY "admin_delete_settings" ON settings FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- ACTIVITY LOGS (admin audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_select_activity_logs" ON activity_logs;
CREATE POLICY "admin_select_activity_logs" ON activity_logs FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_activity_logs" ON activity_logs;
CREATE POLICY "admin_insert_activity_logs" ON activity_logs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_activity_logs" ON activity_logs;
CREATE POLICY "admin_update_activity_logs" ON activity_logs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_activity_logs" ON activity_logs;
CREATE POLICY "admin_delete_activity_logs" ON activity_logs FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
