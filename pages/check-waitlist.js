import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("❌ Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase
    .from('waitlist')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error("Supabase Error:", error.message);
  } else {
    console.log("✅ Waitlist entries:");
    console.table(data);
  }
}

main();
