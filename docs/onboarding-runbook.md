# Ternwise Onboarding Runbook

This document is for future developers, contractors, or collaborators joining Ternwise.

## Project Snapshot

Ternwise is an installable SPA/PWA for privacy-aware group travel planning. The MVP focuses on forgotten, high-consequence travel details: emergency planning, documents, medical contacts, accessibility, food needs, checklists, family units, and simple dues.

## Repository

- GitHub: https://github.com/stalagadadeevi55-collab/Ternwise.git
- Local development folder: `C:\ProjectLaddu\travel-planner-mvp`
- Default branch: `main`

## Current Tech Stack

- React
- Vite
- WebGL shader logo
- PWA manifest and service worker
- Supabase planned for auth, database, row-level security, and admin content
- Capacitor planned later for Android and iOS packaging

## Local Setup

1. Clone the repo.

   ```powershell
   git clone https://github.com/stalagadadeevi55-collab/Ternwise.git
   cd Ternwise
   ```

2. Install dependencies.

   ```powershell
   npm install
   ```

3. Create a local env file.

   ```powershell
   Copy-Item .env.example .env
   ```

4. Fill in Supabase values in `.env`.

5. Run the app.

   ```powershell
   npm run dev
   ```

6. Build before committing.

   ```powershell
   npm run build
   ```

## Supabase Setup

Create a free Supabase project at:

https://supabase.com

After the project is created, open:

`Project Settings -> API`

Copy these values into `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Supabase URL looks like:

```text
https://your-project-ref.supabase.co
```

The anon key is safe to use in the frontend when row-level security is configured correctly. Do not treat it like a database password.

Never share or commit:

- Supabase service role key
- database password
- JWT secret
- OAuth client secrets
- private Apple keys
- production `.env` files

## Supabase Auth Plan

MVP auth direction:

- Google sign-in first
- Apple sign-in before iOS/App Store release
- Supabase Auth as the auth broker

Google sign-in will require:

- Google Cloud project
- OAuth client ID
- OAuth client secret added inside Supabase dashboard
- redirect URLs configured in Google Cloud and Supabase

Apple sign-in will require:

- Apple Developer Program membership
- Services ID / App ID setup
- Sign in with Apple key
- redirect URLs configured in Apple and Supabase

## Suggested Supabase Tables

See `src/data/schema-notes.md` for the first schema direction.

Initial tables should include:

- `profiles`
- `trips`
- `trip_members`
- `family_units`
- `travelers`
- `minor_responsible_adults`
- `accessibility_needs`
- `dietary_needs`
- `medical_contacts`
- `bookings`
- `dues`
- `destination_content`
- `trip_packets`
- `ai_chats`
- `ai_group_note_suggestions`
- `checklist_items`

## Privacy Rules

Default product rule:

- Sensitive info is private to the owner or authorized responsible adults.
- Shared trip views show non-sensitive coordination info only.
- AI chats are private by default.
- AI may suggest non-sensitive group notes, but the user must approve before sharing.

MVP does not store:

- passport numbers
- passport photos
- prescription images
- detailed prescription records
- file uploads
- payment information

## MVP Build Order

1. Supabase project and env setup.
2. Supabase client in the app.
3. Login screen with Google.
4. Trip creation flow.
5. Traveler profiles.
6. Family units and minors.
7. Destination content admin screen.
8. Generated checklist and summary cards.
9. Emergency/offline trip packet.
10. AI assistant.
11. PDF export.
12. Deployment to Vercel or Cloudflare Pages.

## Hosting Plan

Free-first hosting options:

- Vercel
- Cloudflare Pages
- Netlify

Recommended first choice: Vercel, because GitHub integration is fast and simple for early testing.

Required env vars must be added in the hosting dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Mobile App Path

Do not start with app stores unless testing proves the web/PWA is useful.

Recommended path:

1. Build and test as web/PWA.
2. Add Capacitor.
3. Generate Android app shell.
4. Generate iOS app shell.
5. Android internal testing.
6. iOS TestFlight.
7. Public app store submissions.

Android publishing requires:

- Google Play Console developer account
- app bundle build
- app signing
- privacy policy
- data safety form
- screenshots and listing content
- internal/closed/open testing as required

iOS publishing requires:

- Apple Developer Program
- Xcode/macOS access
- App Store Connect
- bundle ID
- signing certificates/profiles
- app privacy details
- screenshots and listing content
- TestFlight/App Review

## Brand

App name: Ternwise

Tagline:

```text
Travel Ready, Together.
```

Current brand direction:

- sky blue
- sea-glass aqua
- sunset yellow
- coral accent
- clean white content surfaces

Logo concept:

- tern silhouette
- sunset-lit moving clouds
- irregular sky badge
- moving tall grass

## Git Workflow

Before starting work:

```powershell
git status
git pull
```

Before committing:

```powershell
npm run build
git status
```

Commit style:

```powershell
git add <changed-files>
git commit -m "Short clear message"
git push
```

Avoid committing:

- `.env`
- `node_modules`
- `dist`
- generated secrets
- local machine files

## Current Open Questions

- Which hosting platform should be used first?
- Which AI provider should be used for MVP?
- Should Google auth be configured before database schema work?
- When should Apple Developer Program membership be purchased?

