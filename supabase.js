import "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

const { createClient } = supabase;

const _supabase = createClient(
  "https://bqecplanaeqkgzvfoynn.supabase.co",
  "sb_publishable_FHQ51ohsl-UfUY2QMpAf4g_KPktREu8"
);

export { _supabase };
