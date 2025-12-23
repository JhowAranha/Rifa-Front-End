import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const _supabase = createClient(
  "https://bqecplanaeqkgzvfoynn.supabase.co",
  "sb_publishable_FHQ51ohsl-UfUY2QMpAf4g_KPktREu8"
);

export { _supabase };
