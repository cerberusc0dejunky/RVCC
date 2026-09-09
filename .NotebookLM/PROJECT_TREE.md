# RIVER VALLEY CLEANUP CREW — PROJECT TREE & ARCHITECTURE
Generated: 2026-09-06 02:33:52

## 1. Directory & File Hierarchy
```text
  📄 .env.example  (11 lines)
  📄 .gitignore  (9 lines)
  📄 README.md  (20 lines)
  📄 bun.lock  (1142 lines)
  📄 compile_notebooklm.py  (463 lines)
  📄 index.html  (42 lines)
  📄 metadata.json  (6 lines)
  📄 package.json  (48 lines)
  📄 scode.py  (463 lines)
  📄 server.ts  (342 lines)
  📄 tsconfig.json  (26 lines)
  📄 vite.config.ts  (22 lines)
  📁 assets/
    📁 img/
  📁 functions/
    📁 api/
      📄 add-to-calendar.js  (61 lines)
      📄 analyze-junk.js  (136 lines)
      📄 analyze-photo.js  (4 lines)
      📄 create-checkout-session.js  (63 lines)
      📄 create-checkout.js  (4 lines)
  📁 public/
    📄 _redirects  (1 lines)
    📄 checkout.css  (177 lines)
    📄 checkout.html  (29 lines)
    📄 checkout.js  (90 lines)
    📄 complete.css  (153 lines)
    📄 complete.html  (44 lines)
    📄 complete.js  (94 lines)
    📄 data-deletion.html  (65 lines)
    📄 privacy.html  (96 lines)
    📄 terms.html  (97 lines)
    📁 assets/
      📁 img/
  📁 src/
    📄 App.tsx  (2665 lines)
    📄 index.css  (54 lines)
    📄 main.tsx  (65 lines)
    📄 types.ts  (55 lines)
    📄 vite-env.d.ts  (26 lines)
    📁 components/
      📄 AuthModal.tsx  (301 lines)
      📄 CustomerJobTracker.tsx  (381 lines)
      📄 DispatchDashboard.tsx  (574 lines)
      📄 LegalModal.tsx  (198 lines)
      📄 ServiceQuoteWizard.tsx  (775 lines)
      📄 WhatWeDoModal.tsx  (425 lines)
    📁 lib/
      📄 firebase.ts  (350 lines)
```

## 2. Project Metrics Summary
- **Total Indexed Files**: 39
- **Total Source Lines**: 9,577 lines
- **Architecture Style**: Client-First React 19 + Tailwind CSS + Cloudflare Pages Edge Functions + Firebase Firestore/Auth + Optional Express Node.js Engine

## 3. Structural Layers Breakdown
- **Core Frontend (`/src`)**: Application UI, wizard slide state machine, dynamic volume & pricing calculators, booking modals, and client-side Firestore synchronization.
- **Reusable Components (`/src/components`)**: Auth modal with Facebook Admin verification, Operator Dispatch Board, Customer Job Tracker, Quote Wizard, and Legal Disclosure Modals.
- **Cloudflare Pages Edge Functions (`/functions/api`)**: Serverless edge endpoints for Gemini AI debris photo vision (`/api/analyze-junk`), Stripe checkout session initialization (`/api/create-checkout-session`), and Google Calendar event scheduling (`/api/add-to-calendar`).
- **Full-Stack Node/Express Engine (`/server.ts`)**: Local development container server providing dual Vite middleware and API endpoints.
- **Public Static Assets (`/public`)**: Standalone legal compliance pages (Terms, Privacy, Data Deletion) and Cloudflare `_redirects` SPA rewrite rules.
