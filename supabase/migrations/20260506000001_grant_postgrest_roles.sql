-- ============================================================================
-- ScreenFree — Grant PostgREST role permissions on public schema
-- ============================================================================
-- Supabase exposes the database to the browser via two PostgREST roles:
--   • anon          — unauthenticated visitors
--   • authenticated — signed-in users (JWT carries their auth.uid())
--
-- Supabase usually wires these up by default, but when tables are created via
-- the pooler / direct postgres connection (instead of the Supabase CLI), the
-- grants don't propagate. The symptom is "permission denied for table X" on
-- every PostgREST request even when RLS would otherwise allow the row.
--
-- This migration restores the standard grants. RLS still governs per-row
-- access; this layer only governs whether the role can attempt a query at all.

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Defaults for any future tables/sequences/functions created later.
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT EXECUTE ON FUNCTIONS TO anon, authenticated, service_role;
