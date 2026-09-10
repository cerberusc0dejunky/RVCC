import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

// Safe, fallback configuration
export const MAX_IMAGE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB Hardcoded Limit (26,214,400 bytes)

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "mock-app.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "mock-app",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "mock-app.appspot.com",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:1234:web:1234"
};

export const isRealFirebase = !!(import.meta as any).env.VITE_FIREBASE_API_KEY && (import.meta as any).env.VITE_FIREBASE_API_KEY !== "mock-api-key";

let app: any = null;
let db: any = null;
let auth: any = null;

if (isRealFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("Firebase initialized successfully with real credentials.");
  } catch (e) {
    console.warn("Firebase initialization failed, falling back to local database & demo auth:", e);
  }
}

export interface DispatchJob {
  id: string;
  ticketNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  zipCode: string;
  selectedDate: string;
  timeSlot: 'morning' | 'afternoon';
  haulType: 'truck' | 'trailer' | 'appliance';
  status: 'scheduled' | 'dispatched' | 'on_site' | 'disposal_run' | 'completed';
  priceTotal: number;
  paymentTerms: string;
  paymentStatus: 'paid' | 'pending';
  timestamp: string;
  notes?: string;
  items?: Record<string, number>;
  appliances?: Record<string, boolean>;
  specialNotes?: string;
}

export interface CustomBidRequest {
  id: string;
  bidNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  zipCode?: string;
  description: string;
  imageUrl?: string;
  imageFileName?: string;
  imageFileSize?: string;
  createdAt: string;
  status: 'pending_bid' | 'bid_submitted' | 'accepted' | 'declined';
  bidAmount?: number;
  bidNotes?: string;
  bidEquipment?: string;
  bidDateEstimate?: string;
  bidSubmittedAt?: string;
}

// Initial sample custom bids for contractor bidding
const SAMPLE_CUSTOM_BIDS: CustomBidRequest[] = [
  {
    id: "bid-201",
    bidNumber: "BID-392180",
    clientName: "David Miller",
    clientPhone: "(479) 420-9182",
    clientEmail: "david.miller@fortsmithrealty.com",
    address: "3412 Free Ferry Rd",
    zipCode: "72903",
    description: "Backyard storm debris & heavy fallen oak limbs. Need cut, loaded on trailer and hauled away with rake sweep.",
    imageUrl: "/assets/img/garage_ba.jpg",
    imageFileName: "storm_debris.jpg",
    imageFileSize: "3.2 MB",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "bid_submitted",
    bidAmount: 275.00,
    bidEquipment: "White Dodge Ram + 14ft Tandem Trailer",
    bidDateEstimate: "Thursday Morning (9:00 AM)",
    bidNotes: "Can load and haul all limbs in 1 tandem load. Price includes Sebastian County green waste fees and broom sweep.",
    bidSubmittedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "bid-202",
    bidNumber: "BID-881944",
    clientName: "Marcus Vance",
    clientPhone: "(479) 353-8120",
    clientEmail: "m.vance@gmail.com",
    address: "1204 S 21st St",
    zipCode: "72901",
    description: "Old dilapidated metal shed tear down in alleyway with rusted tin siding, wood framing, and scrap parts inside.",
    imageUrl: "/assets/img/houseflip_ba.jpg",
    imageFileName: "shed_tear_down.jpg",
    imageFileSize: "4.8 MB",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "pending_bid"
  }
];

// Initial sample jobs for operator showcase
const SAMPLE_JOBS: DispatchJob[] = [
  {
    id: "job-101",
    ticketNumber: "TKT-782104",
    clientName: "David Miller",
    clientPhone: "(479) 420-9182",
    clientEmail: "david.miller@fortsmithrealty.com",
    address: "3412 Free Ferry Rd",
    zipCode: "72903",
    selectedDate: new Date().toISOString().split('T')[0],
    timeSlot: "morning",
    haulType: "trailer",
    status: "on_site",
    priceTotal: 385.00,
    paymentTerms: "stripe",
    paymentStatus: "paid",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    notes: "Estate liquidation. 14ft tandem trailer parked in wide driveway. 2 mattresses and 4 contractor bags loaded.",
    items: { mattress: 2, couch: 1, yard_bag: 4 },
    specialNotes: "Side gate code is #4412. Watch out for flower beds."
  },
  {
    id: "job-102",
    ticketNumber: "TKT-551930",
    clientName: "Sarah Jenkins",
    clientPhone: "(479) 785-3341",
    clientEmail: "sarah.j@rivervalleyliving.com",
    address: "810 Towson Ave",
    zipCode: "72901",
    selectedDate: new Date().toISOString().split('T')[0],
    timeSlot: "afternoon",
    haulType: "truck",
    status: "dispatched",
    priceTotal: 185.00,
    paymentTerms: "arrival",
    paymentStatus: "pending",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: "Curbside bulky furniture pickup. Heavy oak dresser and box spring.",
    items: { couch: 1, yard_bag: 2 }
  },
  {
    id: "job-103",
    ticketNumber: "TKT-992014",
    clientName: "Commercial River Storage",
    clientPhone: "(479) 222-8874",
    clientEmail: "storageops@rivervalleystorage.net",
    address: "5200 S 74th St",
    zipCode: "72903",
    selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: "morning",
    haulType: "trailer",
    status: "scheduled",
    priceTotal: 620.00,
    paymentTerms: "stripe",
    paymentStatus: "paid",
    timestamp: new Date().toISOString(),
    notes: "2 defaulted commercial units (Units 104 and 106). Full sweep-out required for same-day re-rental.",
    items: { mattress: 3, couch: 2, yard_bag: 6 }
  }
];

// Simple local fallback database using localStorage
const localDb = {
  getDocs(colName: string): any[] {
    const existing = localStorage.getItem(colName);
    if (!existing) {
      const initialData = colName === 'custom_bids' ? SAMPLE_CUSTOM_BIDS : SAMPLE_JOBS;
      localStorage.setItem(colName, JSON.stringify(initialData));
      return initialData;
    }
    try {
      return JSON.parse(existing);
    } catch {
      return colName === 'custom_bids' ? SAMPLE_CUSTOM_BIDS : SAMPLE_JOBS;
    }
  },
  addDoc(colName: string, data: any): any {
    const current = localDb.getDocs(colName);
    const docWithId = {
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...(colName === 'bookings' ? { status: 'scheduled' } : { status: 'pending_bid' }),
      ...data
    };
    current.unshift(docWithId);
    localStorage.setItem(colName, JSON.stringify(current));
    return docWithId;
  },
  updateDoc(colName: string, id: string, updates: Record<string, any>): boolean {
    const current = localDb.getDocs(colName);
    const idx = current.findIndex(j => j.id === id || j.ticketNumber === id || j.bidNumber === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updates };
      localStorage.setItem(colName, JSON.stringify(current));
      return true;
    }
    return false;
  }
};

export async function saveBookingToDatabase(booking: any) {
  const dataToSave: Partial<DispatchJob> = {
    ...booking,
    ticketNumber: booking.ticketNumber || `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'scheduled',
    timestamp: new Date().toISOString(),
  };

  if (db && isRealFirebase) {
    try {
      const colRef = collection(db, "bookings");
      const docRef = await addDoc(colRef, dataToSave);
      localDb.addDoc("bookings", { ...dataToSave, id: docRef.id });
      return { success: true, id: docRef.id, ticketNumber: dataToSave.ticketNumber, isMock: false };
    } catch (e: any) {
      console.error("Failed to save to real Firebase, fallback to local storage:", e);
      const localDoc = localDb.addDoc("bookings", dataToSave);
      return { success: true, id: localDoc.id, ticketNumber: localDoc.ticketNumber, isMock: true, error: e.message };
    }
  } else {
    const localDoc = localDb.addDoc("bookings", dataToSave);
    return { success: true, id: localDoc.id, ticketNumber: localDoc.ticketNumber, isMock: true };
  }
}

export async function getAllBookings(): Promise<DispatchJob[]> {
  if (db && isRealFirebase) {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as DispatchJob));
      }
    } catch (e) {
      console.error("Error fetching bookings from real Firebase:", e);
    }
  }
  return localDb.getDocs("bookings");
}

export async function updateBookingStatus(
  jobId: string, 
  newStatus: DispatchJob['status'], 
  notes?: string
): Promise<boolean> {
  const updates: Partial<DispatchJob> = { status: newStatus };
  if (notes !== undefined) updates.notes = notes;

  if (db && isRealFirebase) {
    try {
      const jobRef = doc(db, "bookings", jobId);
      await updateDoc(jobRef, updates as any);
    } catch (e) {
      console.warn("Could not update remote Firebase, updating local copy:", e);
    }
  }
  return localDb.updateDoc("bookings", jobId, updates);
}

export async function getBookingCountForAddressAndDate(address: string, date: string): Promise<number> {
  const bookings = await getAllBookings();
  const matching = bookings.filter((b: any) => 
    b.selectedDate === date && 
    b.contactAddress?.trim().toLowerCase() === address.trim().toLowerCase()
  );
  return matching.length;
}

// -------------------------------------------------------------
// Custom Job Requests & Contractor Bidding
// -------------------------------------------------------------
export async function saveCustomBidRequest(bid: Omit<CustomBidRequest, 'id' | 'bidNumber' | 'createdAt' | 'status'> & { id?: string; bidNumber?: string }): Promise<{ success: boolean; id: string; bidNumber: string }> {
  const bidNumber = bid.bidNumber || `BID-${Math.floor(100000 + Math.random() * 900000)}`;
  const dataToSave: Partial<CustomBidRequest> = {
    ...bid,
    bidNumber,
    status: 'pending_bid',
    createdAt: new Date().toISOString()
  };

  if (db && isRealFirebase) {
    try {
      const colRef = collection(db, "custom_bids");
      const docRef = await addDoc(colRef, dataToSave);
      localDb.addDoc("custom_bids", { ...dataToSave, id: docRef.id });
      return { success: true, id: docRef.id, bidNumber };
    } catch (e: any) {
      console.warn("Could not save custom bid to remote Firebase, using local database:", e);
    }
  }
  const localDoc = localDb.addDoc("custom_bids", dataToSave);
  return { success: true, id: localDoc.id, bidNumber: localDoc.bidNumber };
}

export async function getAllCustomBids(): Promise<CustomBidRequest[]> {
  if (db && isRealFirebase) {
    try {
      const querySnapshot = await getDocs(collection(db, "custom_bids"));
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomBidRequest));
      }
    } catch (e) {
      console.warn("Could not load custom bids from remote Firebase, using local storage:", e);
    }
  }
  return localDb.getDocs("custom_bids");
}

export async function updateCustomBid(
  bidId: string, 
  updates: Partial<CustomBidRequest>
): Promise<boolean> {
  if (db && isRealFirebase) {
    try {
      const bidRef = doc(db, "custom_bids", bidId);
      await updateDoc(bidRef, updates as any);
    } catch (e) {
      console.warn("Could not update remote custom bid, updating local copy:", e);
    }
  }
  return localDb.updateDoc("custom_bids", bidId, updates);
}

// -------------------------------------------------------------
// Authentication Services (Google, Facebook & Demo Operator/Client)
// -------------------------------------------------------------
export interface AuthUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  provider: 'google' | 'demo';
  role: 'operator' | 'customer';
}

export type AuthUser = AuthUserProfile;

export function getCurrentAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('rvcc_auth_user');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to parse auth user:", e);
  }
  return null;
}

export function setStoredAuthUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem('rvcc_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rvcc_auth_user');
    }
  } catch (e) {
    console.warn("Failed to set stored auth user:", e);
  }
}

export async function signInWithGoogleAuth(): Promise<AuthUserProfile> {
  let profile: AuthUserProfile;
  if (auth && isRealFirebase) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      profile = {
        uid: user.uid,
        displayName: user.displayName || "Google User",
        email: user.email || "",
        photoURL: user.photoURL || undefined,
        provider: 'google',
        role: user.email?.includes('rivervalley') || user.email?.includes('admin') ? 'operator' : 'customer'
      };
      setStoredAuthUser(profile);
      return profile;
    } catch (e: any) {
      console.warn("Google Sign-In with real Firebase failed/cancelled, using simulated profile:", e);
    }
  }
  // Seamless client-side demo fallback
  profile = {
    uid: "google-demo-" + Date.now(),
    displayName: "Travis Wayne (Google)",
    email: "travis.wayne@rivervalleycrew.com",
    photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    provider: 'google',
    role: 'operator'
  };
  setStoredAuthUser(profile);
  return profile;
}


export async function signOutAuth(): Promise<void> {
  setStoredAuthUser(null);
  if (auth && isRealFirebase) {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out warning:", e);
    }
  }
}
