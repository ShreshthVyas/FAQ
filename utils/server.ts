
import { createClient } from "@supabase/supabase-js";

// Ensure that process.env.NEXT_PUBLIC_SUPABASE_URL is defined
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Supabase URL is not defined in environment variables.");
}

// Ensure that process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY is defined
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Supabase anonymous key is not defined in environment variables.");
}

const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasekey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseurl!, supabasekey);

export default supabase;


