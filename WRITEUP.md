# WRITEUP — VibeCaps Landing & Waitlist

# Project summary
VibeCaps is a fictional micro-supplement subscription concept. This repo is a one-page Next.js landing site with a Supabase-backed waitlist.

# Stack
- Next.js
- Supabase (Postgres)
- @supabase/supabase-js
- Plain CSS (minimal)

# AI-assisted tools used
- GitHub Copilot: scaffolding the initial form component and helper patterns.
- ChatGPT: refined microcopy, write-up structure, and demo script.

# What I asked the AI (example prompts)
- "Create a React component for a waitlist form that inserts name/email/message into Supabase using @supabase/supabase-js v2."
- "Draft short microcopy for a landing hero section for a micro-supplement product called 'VibeCaps'."

# Challenges & how I solved them
- **Duplicate email**: Supabase will error on unique constraint; the UI catches and shows the error message.
- **Environment keys**: Never commit keys. Use `.env.local` and add GitHub/Vercel environment variables when deploying.

# Next steps / stretch features
- Add double opt-in (email confirmation)
- Admin dashboard to view waitlist entries (server-side)
- Email notifications via SendGrid or Postmark
- Rate-limit submissions or CAPTCHA

# Time log (example)
- Setup & scaffold: 1.5 hours
- Supabase integration & testing: 1 hour
- Write-up & cleanup: 30 minutes