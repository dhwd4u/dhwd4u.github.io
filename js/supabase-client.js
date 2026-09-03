// ============================================================
// Supabase client config
// Fill these in from: Supabase Dashboard -> Project Settings -> API
// The anon key is safe to expose here - it's public by design and
// only grants what the Row Level Security policies in schema.sql allow.
// ============================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://rxnjamqfvqpssvwvcptf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bmphbXFmdnFwc3N2d3ZjcHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MDIxNDQsImV4cCI6MjEwMzk3ODE0NH0.-BfvOyIt5lwWQSZGg9DOJSVGLmzFhhWbjI5JIre3t_g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
