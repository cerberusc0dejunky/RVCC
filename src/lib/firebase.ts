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
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || ""
};

export const isRealFirebase = !!(import.meta as any).env.VITE_FIREBASE_API_KEY && 
  (import.meta as any).env.VITE_FIREBASE_API_KEY.trim() !== "" && 
  (import.meta as any).env.VITE_FIREBASE_API_KEY !== "mock-api-key";

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
    console.warn("Firebase initialization failed, falling back to local database:", e);
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

// Local storage persistence helper for offline or standalone operation
const localDb = {
  getDocs(colName: string): any[] {
    const existing = localStorage.getItem(colName);
    if (!existing) {
      localStorage.setItem(colName, JSON.stringify([]));
      return [];
    }
    try {
      const parsed = JSON.parse(existing);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
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
  if (auth && isRealFirebase) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = (user.email || "").toLowerCase();
      const profile: AuthUserProfile = {
        uid: user.uid,
        displayName: user.displayName || "Google User",
        email: user.email || "",
        photoURL: user.photoURL || undefined,
        provider: 'google',
        role: userEmail.includes('c0dejunky.com') || userEmail.includes('admin') || userEmail.includes('rivervalley') ? 'operator' : 'customer'
      };
      setStoredAuthUser(profile);
      return profile;
    } catch (e: any) {
      console.error("Google Sign-In with Firebase encountered an error:", e);
      throw e;
    }
  }
  throw new Error("Google Authentication is not configured. Please supply VITE_FIREBASE_API_KEY.");
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
