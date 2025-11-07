# VibeCaps — Landing Page + Supabase Waitlist
One-page landing site with a Supabase-powered waitlist. Built as a clean, minimal Next.js starter so you can copy, paste, and ship.

# What’s included
- Next.js pages for a single landing page
- `WaitlistForm` component that inserts into Supabase `waitlist` table
- `WRITEUP.md` with prompts, journey notes, and next steps

# How to run
1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:3000`

# Supabase table SQL
Run this in Supabase SQL editor:
sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  message text,
  created_at timestamptz default now()
);

<img width="914" height="502" alt="o1" src="https://github.com/user-attachments/assets/1f5bf79a-80b2-499d-b0ef-174331ced075" />
<img width="930" height="437" alt="o2" src="https://github.com/user-attachments/assets/96a3c0f7-e7ef-4176-869f-e46a1323af29" />

