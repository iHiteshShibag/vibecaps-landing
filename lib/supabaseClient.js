import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('SUPABASE URL:', url ? '[present]' : '[MISSING]');
console.log('SUPABASE KEY:', key ? key.slice(0,6) + '...' : '[MISSING]');

export const supabase = (url && key) ? createClient(url, key) : null;