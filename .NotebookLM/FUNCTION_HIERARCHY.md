# RIVER VALLEY CLEANUP CREW — FUNCTION HIERARCHY & CALL GRAPH
Generated: 2026-09-06 02:33:52

This document provides NotebookLM with a structural hierarchy of all symbols, functions,
React state-machines, data contracts, and edge API call graphs in the project.

---

## 1. High-Level Architecture & Invocation Hierarchy
```text
User Browser / Customer Portal / Operator Dispatch
  │
  ├─► [Presentation Layer]
  │     ├── App.tsx (Root State Machine, 6-Slide Quote Wizard, Debris Configurator)
  │     ├── ServiceQuoteWizard.tsx (Step navigation, bed load vs. trailer selection)
  │     ├── AuthModal.tsx (Google Auth, Facebook Admin Check & Secret Unlock)
  │     ├── DispatchDashboard.tsx (Operator board, live routes, job status changes)
  │     ├── CustomerJobTracker.tsx (Real-time customer status & ticket tracker)
  │     └── LegalModal.tsx / WhatWeDoModal.tsx (Policies & service explainers)
  │
  ├─► [Client Persistence & Sync - src/lib/firebase.ts]
  │     ├── saveBookingToDatabase() ──────► Firestore ('bookings' collection)
  │     ├── subscribeToBookings() ────────► Real-time Firestore onSnapshot()
  │     ├── updateBookingStatus() ────────► Firestore updateDoc()
  │     ├── signInWithGoogleAuth() ───────► Firebase Auth (GoogleAuthProvider)
  │     └── signInWithFacebookAuth() ─────► Firebase Auth (FacebookAuthProvider)
  │
  └─► [Edge Serverless APIs - /functions/api & /server.ts]
        ├── POST /api/analyze-junk ──────► Google Gemini Vision AI Model (Edge fetch)
        ├── POST /api/create-checkout-session ──► Stripe REST API (Hosted Checkout)
        └── POST /api/add-to-calendar ───► Google Calendar v3 API (Primary Calendar)
```

---

## 2. File-by-File Symbol & Function Directory

### 📂 `src/App.tsx`
- **⚛️ React Components**: `<App/>`
- **📐 Interfaces & Data Models**: `interface QuickCountItem`, `interface ArkansasRouteMetrics`, `interface PhotoFile`
- **⚡ Key Functions & Handlers**:
  - `export function calculateArkansasRoute(userZip: string): ArkansasRouteMetrics`
  - `export function getGasPriceForDate(dateString: string): number`
  - `[currentUser, setCurrentUser] (Arrow Fn)`
  - `handlePrintSlip (Arrow Fn)`
  - `handleFacebookLogin (Arrow Fn)`
  - `handleFacebookLogout (Arrow Fn)`
  - `adjustQuantity (Arrow Fn)`
  - `calculatePricing (Arrow Fn)`
  - `match (Arrow Fn)`
  - `handlePhotoSelect (Arrow Fn)`
  - `runAiAnalysis (Arrow Fn)`
  - `handleLoadSamplePhoto (Arrow Fn)`
  - *(+8 additional private helper functions)*
- **🔗 Outbound Calls / API Triggers**: fetch -> /api/create-checkout-session, fetch -> /api/analyze-junk, fetch -> /api/add-to-calendar

### 📂 `src/types.ts`
- **📐 Interfaces & Data Models**: `interface ScrapItem`, `interface PickupRequest`

### 📂 `src/lib/firebase.ts`
- **📐 Interfaces & Data Models**: `interface DispatchJob`, `interface AuthUserProfile`, `type AuthUser`
- **⚡ Key Functions & Handlers**:
  - `idx (Arrow Fn)`
  - `export async function saveBookingToDatabase(booking: any)`
  - `export async function getAllBookings(): Promise<DispatchJob[]>`
  - `export async function updateBookingStatus(`
  - `export async function getBookingCountForAddressAndDate(address: string, date: string): Promise<number>`
  - `matching (Arrow Fn)`
  - `export function getCurrentAuthUser(): AuthUser | null`
  - `export function setStoredAuthUser(user: AuthUser | null): void`
  - `export async function signInWithGoogleAuth(): Promise<AuthUserProfile>`
  - `export async function signInWithFacebookAuth(asAdmin: boolean = false): Promise<AuthUserProfile>`
  - `export async function signOutAuth(): Promise<void>`
- **🔥 Firestore Operations**: getDocs, addDoc, collection

### 📂 `src/components/AuthModal.tsx`
- **⚛️ React Components**: `<AuthModal/>`
- **📐 Interfaces & Data Models**: `interface AuthModalProps`
- **⚡ Key Functions & Handlers**:
  - `[isPageAdmin, setIsPageAdmin] (Arrow Fn)`
  - `notifyUser (Arrow Fn)`
  - `handleGoogle (Arrow Fn)`
  - `handleFacebook (Arrow Fn)`
  - `handleUnlockAdmin (Arrow Fn)`

### 📂 `src/components/DispatchDashboard.tsx`
- **⚛️ React Components**: `<DispatchDashboard/>`
- **📐 Interfaces & Data Models**: `interface DispatchDashboardProps`
- **⚡ Key Functions & Handlers**:
  - `handleBack (Arrow Fn)`
  - `copyText (Arrow Fn)`
  - `loadJobs (Arrow Fn)`
  - `filteredJobs (Arrow Fn)`
  - `handleStatusUpdate (Arrow Fn)`
  - `handleAddNote (Arrow Fn)`
  - `totalRevenue (Arrow Fn)`
  - `activeJobsCount (Arrow Fn)`
  - `todayJobsCount (Arrow Fn)`

### 📂 `src/components/CustomerJobTracker.tsx`
- **⚛️ React Components**: `<CustomerJobTracker/>`
- **📐 Interfaces & Data Models**: `interface CustomerJobTrackerProps`
- **⚡ Key Functions & Handlers**:
  - `handleBack (Arrow Fn)`
  - `fetchJobs (Arrow Fn)`
  - `found (Arrow Fn)`
  - `handleSearch (Arrow Fn)`
  - `match (Arrow Fn)`
  - `getStepIndex (Arrow Fn)`
  - `sample (Arrow Fn)`

### 📂 `src/components/ServiceQuoteWizard.tsx`
- **⚛️ React Components**: `<ServiceQuoteWizard/>`
- **📐 Interfaces & Data Models**: `type LoadType`, `type ServiceAreaResult`, `type RouteEstimateResult`
- **⚡ Key Functions & Handlers**:
  - `function clampZip(zip: string)`
  - `function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number)`
  - `toRad (Arrow Fn)`
  - `async function fetchZipCoords(zip: string)`
  - `async function fetchCurrentGasPrice()`
  - `dumpFee (Arrow Fn)`
  - `gasCost (Arrow Fn)`
  - `estimatedMinutes (Arrow Fn)`
  - `laborCost (Arrow Fn)`
  - `async function verifyServiceArea(userZip: string): Promise<ServiceAreaResult>`
  - `async function estimateRouteAndGas(userZip: string, dumpZipCode: string): Promise<RouteEstimateResult>`
  - `handlePhotoChange (Arrow Fn)`
  - *(+4 additional private helper functions)*
- **🔗 Outbound Calls / API Triggers**: fetch -> https://www.fueleconomy.gov/ws/rest/fuelprices

### 📂 `src/components/LegalModal.tsx`
- **⚛️ React Components**: `<LegalModal/>`
- **📐 Interfaces & Data Models**: `interface LegalModalProps`, `type LegalDocType`

### 📂 `src/components/WhatWeDoModal.tsx`
- **⚛️ React Components**: `<WhatWeDoModal/>`
- **📐 Interfaces & Data Models**: `interface BeforeAfterSlide`, `interface WhatWeDoModalProps`
- **⚡ Key Functions & Handlers**:
  - `handleNext (Arrow Fn)`
  - `handlePrev (Arrow Fn)`
  - `handleKeyDown (Arrow Fn)`
  - `timer (Arrow Fn)`

### 📂 `server.ts`
- **🌐 Endpoints Defined**: `POST /api/analyze-junk`, `POST /api/add-to-calendar`, `POST /api/create-checkout-session`, `GET *`
- **⚡ Key Functions & Handlers**:
  - `async function startServer()`
- **🔗 Outbound Calls / API Triggers**: fetch -> https://www.googleapis.com/calendar/v3/calendars/primary/events

### 📂 `functions/api/analyze-junk.js`
- **🌐 Endpoints Defined**: `Cloudflare Edge Handler: analyze-junk.js`
- **⚡ Key Functions & Handlers**:
  - `export async function onRequestPost(context)`

### 📂 `functions/api/create-checkout-session.js`
- **🌐 Endpoints Defined**: `Cloudflare Edge Handler: create-checkout-session.js`
- **⚡ Key Functions & Handlers**:
  - `export async function onRequestPost(context)`
- **🔗 Outbound Calls / API Triggers**: fetch -> https://api.stripe.com/v1/checkout/sessions

### 📂 `functions/api/add-to-calendar.js`
- **🌐 Endpoints Defined**: `Cloudflare Edge Handler: add-to-calendar.js`
- **⚡ Key Functions & Handlers**:
  - `export async function onRequestPost(context)`
- **🔗 Outbound Calls / API Triggers**: fetch -> https://www.googleapis.com/calendar/v3/calendars/primary/events
