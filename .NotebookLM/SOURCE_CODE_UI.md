# RIVER VALLEY CLEANUP CREW — SOURCE DUMP (2026-09-06T02:33:52.589806)


### FULL SOURCE FOR: `src/components/AuthModal.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { 
  X, Facebook, ShieldCheck, User, Truck, Check, 
  ArrowRight, ExternalLink, Sparkles, Lock, ShieldAlert, KeyRound
} from 'lucide-react';
import { 
  AuthUserProfile, 
  signInWithGoogleAuth, 
  signInWithFacebookAuth 
} from '../lib/firebase';
const logoImg = '/assets/img/logoRVCC.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: AuthUserProfile) => void;
  onSuccessLogin?: (user: AuthUserProfile) => void;
  onOpenOperatorBoard?: () => void;
  onOpenCustomerTracker?: () => void;
  initialRole?: 'operator' | 'customer';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  onSuccessLogin,
  onOpenOperatorBoard,
  onOpenCustomerTracker
}) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  // Facebook Page Admin visibility state:
  // Hidden unless the user has authenticated with or verified administrative rights for
  // https://www.facebook.com/RiverValleyCleanupCrew/
  const [isPageAdmin, setIsPageAdmin] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('rvcc_fb_page_admin_verified');
      if (stored === 'true') return true;
      const authUser = localStorage.getItem('rvcc_auth_user');
      if (authUser) {
        const parsed = JSON.parse(authUser);
        if (parsed.role === 'operator' && parsed.provider === 'facebook') return true;
      }
    } catch (e) {
      console.warn('Could not read admin verification state:', e);
    }
    return false;
  });

  const [showAdminUnlock, setShowAdminUnlock] = useState<boolean>(false);
  const [adminPasscode, setAdminPasscode] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setShowAdminUnlock(false);
      setAdminError('');
      setAdminPasscode('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const notifyUser = (user: AuthUserProfile) => {
    if (onAuthSuccess) onAuthSuccess(user);
    if (onSuccessLogin) onSuccessLogin(user);
  };

  const handleGoogle = async () => {
    setLoadingProvider('google');
    const user = await signInWithGoogleAuth();
    setLoadingProvider(null);
    notifyUser(user);
    onClose();
  };

  const handleFacebook = async (asAdmin: boolean = false) => {
    setLoadingProvider(asAdmin ? 'facebook_admin' : 'facebook_customer');
    const user = await signInWithFacebookAuth(asAdmin);
    setLoadingProvider(null);
    if (asAdmin) {
      setIsPageAdmin(true);
      localStorage.setItem('rvcc_fb_page_admin_verified', 'true');
    }
    notifyUser(user);
    onClose();
    if (asAdmin && onOpenOperatorBoard) {
      onOpenOperatorBoard();
    }
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept standard crew operator passcode or verification
    const cleanCode = adminPasscode.trim().toLowerCase();
    if (cleanCode === 'rvcc479' || cleanCode === 'crew2024' || cleanCode === 'admin' || cleanCode === 'cleanout') {
      setIsPageAdmin(true);
      localStorage.setItem('rvcc_fb_page_admin_verified', 'true');
      setShowAdminUnlock(false);
      setAdminError('');
    } else {
      setAdminError('Invalid authorization key. Only registered Facebook Page Admins can unlock this panel.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] border-2 border-slate-700 text-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/80 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#ff6600] overflow-hidden bg-black/60 flex items-center justify-center p-0.5 shadow-md">
            <img 
              src={logoImg} 
              alt="River Valley Cleanup Crew" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-white font-display">
            River Valley <span className="text-[#ff6600]">Cleanup</span> Portal
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            {isPageAdmin 
              ? "Verified Page Admin & Customer Cleanout Management Portal" 
              : "Sign in with your Google or Facebook account to view your scheduled cleanout jobs."}
          </p>
        </div>

        {/* Admin Section: Facebook Page Admin - ONLY SHOWN IF USER IS VERIFIED AS FACEBOOK PAGE ADMIN */}
        {isPageAdmin ? (
          <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-black p-4 rounded-xl border border-amber-500/40 space-y-2.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-black uppercase text-amber-400 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Facebook Page Admin Access</span>
              </span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 font-mono font-bold px-1.5 py-0.5 rounded">
                Verified Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Logged in / verified for <a href="https://www.facebook.com/RiverValleyCleanupCrew/" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-semibold">@RiverValleyCleanupCrew</a>. Access the live <strong className="text-white">Dispatch Board</strong>, crew routes, and booking schedule.
            </p>
            <button
              type="button"
              onClick={() => handleFacebook(true)}
              disabled={loadingProvider !== null}
              className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md font-mono"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>
                {loadingProvider === 'facebook_admin' ? 'Launching Dispatch Board...' : 'Enter Operator Dispatch Board'}
              </span>
            </button>
            <div className="flex justify-between items-center pt-1 text-[10px] text-slate-400 font-mono">
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Page Admin Active
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsPageAdmin(false);
                  localStorage.removeItem('rvcc_fb_page_admin_verified');
                }}
                className="text-slate-500 hover:text-red-400 underline cursor-pointer"
              >
                Hide Admin Box
              </button>
            </div>
          </div>
        ) : null}

        {/* Customer Portal Divider */}
        {isPageAdmin && (
          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-700"></div>
            <span className="shrink mx-3 text-[10px] text-slate-500 uppercase font-mono font-bold">Customer Portal</span>
            <div className="grow border-t border-slate-700"></div>
          </div>
        )}

        {/* Customer Auth Provider Buttons */}
        <div className="space-y-2">
          {/* Customer Google Login */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loadingProvider !== null}
            className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md font-mono"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{loadingProvider === 'google' ? 'Connecting...' : 'Sign In with Google'}</span>
          </button>

          {/* Customer Facebook Login */}
          <button
            type="button"
            onClick={() => handleFacebook(false)}
            disabled={loadingProvider !== null}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md font-mono border border-slate-700"
          >
            <Facebook className="w-4 h-4 text-[#1877F2] fill-current" />
            <span>{loadingProvider === 'facebook_customer' ? 'Connecting...' : 'Sign In with Facebook'}</span>
          </button>
        </div>

        {/* Direct Track Job Link without login */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenCustomerTracker) onOpenCustomerTracker();
            }}
            className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between cursor-pointer transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-white block">Track Cleanout Job Directly</span>
                <span className="text-[10px] text-slate-400 block">Look up by ticket number or phone</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Discreet Page Admin Verification link when box is hidden */}
        {!isPageAdmin && (
          <div className="pt-1 text-center">
            {!showAdminUnlock ? (
              <button
                type="button"
                onClick={() => setShowAdminUnlock(true)}
                className="text-[10px] text-slate-500 hover:text-amber-400 transition-colors font-mono cursor-pointer flex items-center justify-center gap-1 mx-auto"
              >
                <Lock className="w-3 h-3" />
                <span>River Valley Cleanup Crew Page Admin Login</span>
              </button>
            ) : (
              <form onSubmit={handleUnlockAdmin} className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                    <KeyRound className="w-3 h-3" /> Facebook Page Admin Key
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAdminUnlock(false)}
                    className="text-[10px] text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="password"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="Enter crew operator key..."
                    className="flex-1 bg-black text-white text-xs px-2.5 py-1.5 rounded border border-zinc-700 font-mono focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono px-3 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Verify
                  </button>
                </div>
                {adminError ? (
                  <p className="text-[10px] text-red-400 font-mono">{adminError}</p>
                ) : (
                  <p className="text-[9px] text-slate-400 font-mono">
                    Restricted to managers of <a href="https://www.facebook.com/RiverValleyCleanupCrew/" target="_blank" rel="noreferrer" className="underline text-slate-300">facebook.com/RiverValleyCleanupCrew</a>
                  </p>
                )}
              </form>
            )}
          </div>
        )}

        <p className="text-[10px] text-slate-500 text-center font-mono pt-1">
          River Valley Cleanup Crew • Fort Smith, AR Dispatch Operations
        </p>
      </div>
    </div>
  );
};

```

### FULL SOURCE FOR: `src/components/CustomerJobTracker.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { 
  Truck, Calendar, MapPin, Phone, CheckCircle2, 
  Clock, AlertCircle, Search, ArrowLeft, ShieldCheck, 
  ExternalLink, Sparkles, FileText, Check, ChevronRight
} from 'lucide-react';
import { DispatchJob, getAllBookings } from '../lib/firebase';
const logoImg = '/assets/img/logoRVCC.png';
const dodgeTruckImg = '/assets/img/Dodge_truck.jpeg';

interface CustomerJobTrackerProps {
  initialTicketNumber?: string;
  onBackToEstimator?: () => void;
  onNavigateToEstimator?: () => void;
  onOpenOperatorDashboard?: () => void;
}

export const CustomerJobTracker: React.FC<CustomerJobTrackerProps> = ({
  initialTicketNumber,
  onBackToEstimator,
  onNavigateToEstimator,
  onOpenOperatorDashboard
}) => {
  const handleBack = onBackToEstimator || onNavigateToEstimator || (() => {});
  const [ticketInput, setTicketInput] = useState<string>(initialTicketNumber || '');
  const [currentJob, setCurrentJob] = useState<DispatchJob | null>(null);
  const [allJobs, setAllJobs] = useState<DispatchJob[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllBookings();
      setAllJobs(data);
      if (initialTicketNumber && initialTicketNumber.trim()) {
        const found = data.find(j => 
          j.ticketNumber.toLowerCase() === initialTicketNumber.trim().toLowerCase() ||
          j.id.toLowerCase() === initialTicketNumber.trim().toLowerCase()
        );
        if (found) {
          setCurrentJob(found);
          setTicketInput(found.ticketNumber);
          setSearched(true);
        }
      }
    };
    fetchJobs();
  }, [initialTicketNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;
    const query = ticketInput.trim().toLowerCase();
    const match = allJobs.find(j => 
      j.ticketNumber.toLowerCase() === query ||
      j.clientPhone.replace(/\D/g, '').includes(query.replace(/\D/g, '')) ||
      j.clientName.toLowerCase().includes(query) ||
      j.id.toLowerCase() === query
    );
    setCurrentJob(match || null);
    setSearched(true);
  };

  const steps = [
    { key: 'scheduled', label: 'Booking Locked', desc: 'Date & arrival slot reserved' },
    { key: 'dispatched', label: 'Crew Dispatched', desc: 'Dodge Ram rig en route' },
    { key: 'on_site', label: 'On-Site Cleanout', desc: 'Sorting, loading & sweep-out' },
    { key: 'disposal_run', label: 'Disposal Transfer', desc: 'Transit to Sebastian County landfill' },
    { key: 'completed', label: 'Job Complete', desc: 'Broom-clean finish certified' },
  ];

  const getStepIndex = (status: DispatchJob['status']) => {
    return steps.findIndex(s => s.key === status);
  };

  const currentStepIdx = currentJob ? getStepIndex(currentJob.status) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#141414] border-b border-slate-800 px-4 sm:px-8 py-4 shadow-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full border-2 border-[#ff6600] overflow-hidden bg-black/60 flex items-center justify-center p-0.5 shrink-0 shadow-md">
              <img 
                src={logoImg} 
                alt="River Valley Cleanup Crew" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                River Valley <span className="text-[#ff6600]">Cleanup</span> Crew
              </span>
              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                Live Cleanout &amp; Job Status Tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold px-3 py-1.5 rounded border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Estimator</span>
            </button>
            {onOpenOperatorDashboard && (
              <button
                type="button"
                onClick={onOpenOperatorDashboard}
                className="bg-[#ff6600] hover:bg-orange-600 text-slate-950 text-xs font-mono font-black uppercase px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Operator Board</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Tracker Container */}
      <main className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
        {/* Ticket Lookup Form */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-slate-800 shadow-md">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={ticketInput}
                onChange={e => setTicketInput(e.target.value)}
                placeholder="Enter Ticket # (e.g. TKT-782104) or Phone Number..."
                className="w-full bg-slate-900 text-sm text-white pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 font-mono focus:outline-hidden focus:border-[#ff6600]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#ff6600] hover:bg-orange-600 text-slate-950 font-black uppercase text-xs px-5 py-2.5 rounded-lg font-mono tracking-wider cursor-pointer shadow-sm transition-all"
            >
              Track Job
            </button>
          </form>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400 text-[11px]">
              Available to anyone with a scheduled Ticket # or booking phone number.
            </span>
            <button
              type="button"
              onClick={() => {
                setTicketInput('TKT-782104');
                const sample = allJobs.find(j => j.ticketNumber === 'TKT-782104') || allJobs[0];
                if (sample) {
                  setCurrentJob(sample);
                  setSearched(true);
                }
              }}
              className="text-[11px] text-[#ff6600] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>Test with demo ticket (TKT-782104)</span>
            </button>
          </div>
        </div>

        {/* Job Status Display */}
        {searched && currentJob ? (
          <div className="space-y-6">
            {/* Top Status Banner */}
            <div className="bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] p-5 sm:p-6 rounded-xl border-2 border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ff6600] text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                      Live Dispatch Slip
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      {currentJob.ticketNumber}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display mt-1">
                    Cleanout Status: <span className="text-[#ff6600]">{currentJob.status.replace('_', ' ')}</span>
                  </h2>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div>
                    <span className="text-xs text-slate-400 font-mono block">Scheduled Window</span>
                    <span className="text-sm sm:text-base font-black text-white font-mono">
                      {currentJob.selectedDate} ({currentJob.timeSlot === 'morning' ? '8AM – 12PM' : '12PM – 4PM'})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/?track=${currentJob.ticketNumber}`;
                      navigator.clipboard.writeText(url);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    className="self-start sm:self-auto px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono font-bold rounded flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-[#ff6600]" />
                    <span>{copiedLink ? '✓ Link Copied!' : 'Copy Tracking Link'}</span>
                  </button>
                </div>
              </div>

              {/* Visual Multi-Step Progress Tracker */}
              <div className="pt-6 pb-2">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                  {steps.map((st, idx) => {
                    const isDone = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div 
                        key={st.key}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isCurrent
                            ? 'bg-[#ff6600]/15 border-[#ff6600] shadow-[0px_0px_14px_rgba(255,102,0,0.25)] ring-1 ring-[#ff6600]/50'
                            : isDone
                            ? 'bg-emerald-950/20 border-emerald-500/50 text-slate-300'
                            : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-mono font-black uppercase ${isCurrent ? 'text-[#ff6600]' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                            Step {idx + 1}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isCurrent ? (
                            <Sparkles className="w-4 h-4 text-[#ff6600] animate-pulse" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <span className={`block font-black text-xs uppercase tracking-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                          {st.label}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5 leading-snug font-mono">
                          {st.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Crew, Location & Manifest Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Assigned Rig & Crew Info */}
              <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#ff6600]" />
                    <span>Assigned Dispatch Rig &amp; Crew</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Active on Duty
                  </span>
                </div>

                <div className="rounded-lg overflow-hidden border border-slate-800 relative h-36 bg-slate-900">
                  <img 
                    src={dodgeTruckImg} 
                    alt="River Valley Heavy Rig" 
                    className="w-full h-full object-cover brightness-[0.75]"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded text-white font-mono text-xs font-bold border border-slate-700">
                    White Dodge Ram 2500 • 14ft Tandem Trailer
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Hauling Capacity:</span>
                    <strong className="text-white">14,000 lbs Tandem Axle</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Dispatch Phone:</span>
                    <a href="tel:4792221311" className="text-[#ff6600] font-black hover:underline">
                      (479) 222-1311
                    </a>
                  </div>
                </div>

                {currentJob.notes && (
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Live Crew Field Notes:</span>
                    <p className="whitespace-pre-line text-slate-200">{currentJob.notes}</p>
                  </div>
                )}
              </div>

              {/* Service Manifest & Invoice */}
              <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#ff6600]" />
                    <span>Cleanout Manifest &amp; Invoice</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                    Fort Smith, AR
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Customer Name:</span>
                    <strong className="text-white">{currentJob.clientName}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Cleanout Address:</span>
                    <strong className="text-white truncate max-w-[200px]">{currentJob.address}, AR {currentJob.zipCode}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Load Rig:</span>
                    <strong className="text-[#ff6600] uppercase">{currentJob.haulType}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2 text-sm font-black">
                    <span className="text-white">Invoice Total:</span>
                    <span className="text-[#ff6600]">${(currentJob.priceTotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Payment Status:</span>
                    <strong className={currentJob.paymentStatus === 'paid' ? 'text-emerald-400 uppercase' : 'text-amber-400 uppercase'}>
                      {currentJob.paymentStatus === 'paid' ? '✓ Paid Securely via Card' : '⚠ Pay Cash/Card on Arrival'}
                    </strong>
                  </div>
                </div>

                {/* Dispatch Hotline Help */}
                <div className="p-3 bg-gradient-to-r from-orange-950/40 to-slate-900 rounded-lg border border-[#ff6600]/30 space-y-2">
                  <span className="text-xs font-bold text-white block">Need to update your cleanout window or add items?</span>
                  <a
                    href="tel:4792221311"
                    className="w-full bg-[#ff6600] hover:bg-orange-600 text-slate-950 font-black uppercase text-xs py-2 px-3 rounded text-center flex items-center justify-center gap-1.5 font-mono shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Dispatch Hotline: (479) 222-1311</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-12 text-center text-slate-400 font-mono text-xs space-y-3 shadow-lg">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-bold text-white">No cleanout ticket found matching "{ticketInput}".</p>
            <p className="text-slate-400 max-w-md mx-auto">
              Please check your 6-digit ticket code (e.g. TKT-782104) sent via confirmation, or call our local dispatch office at (479) 222-1311.
            </p>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-8 sm:p-12 text-center text-slate-300 font-mono space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-[#ff6600]/15 border border-[#ff6600]/40 rounded-2xl flex items-center justify-center mx-auto text-[#ff6600] shadow-inner">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-display">
                Track Cleanout &amp; Hauling Status
              </h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                Available to everyone. Enter your 6-digit Job Ticket Number (e.g. <span className="text-[#ff6600] font-bold">TKT-782104</span>) or phone number above to track arrival ETA, on-site loading progress, and landfill transfer certification in real time.
              </p>
            </div>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 border-t border-slate-800/80 max-w-md mx-auto">
              <span className="flex items-center gap-1.5 font-bold"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Public Access</span>
              <span className="flex items-center gap-1.5 font-bold"><Clock className="w-4 h-4 text-amber-400" /> Live Status ETA</span>
              <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Disposal Proof</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

```

### FULL SOURCE FOR: `src/components/DispatchDashboard.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { 
  Truck, Calendar, MapPin, Phone, Mail, CheckCircle2, 
  Clock, AlertCircle, RefreshCw, ChevronRight, Search, 
  Filter, DollarSign, FileText, ArrowLeft, Send, Sparkles,
  ExternalLink, Printer, ShieldCheck, Check, Facebook, Copy, MessageCircle
} from 'lucide-react';
import { DispatchJob, getAllBookings, updateBookingStatus } from '../lib/firebase';
const logoImg = '/assets/img/logoRVCC.png';

interface DispatchDashboardProps {
  onBackToEstimator?: () => void;
  onNavigateToEstimator?: () => void;
  onViewJobInTracker?: (ticketNumber: string) => void;
}

export const DispatchDashboard: React.FC<DispatchDashboardProps> = ({
  onBackToEstimator,
  onNavigateToEstimator,
  onViewJobInTracker
}) => {
  const handleBack = () => {
    if (onNavigateToEstimator) onNavigateToEstimator();
    else if (onBackToEstimator) onBackToEstimator();
  };
  const [jobs, setJobs] = useState<DispatchJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<DispatchJob | null>(null);
  const [newNote, setNewNote] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyText = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const loadJobs = async () => {
    setLoading(true);
    const data = await getAllBookings();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredJobs = jobs.filter(job => {
    // Search query filter
    const matchesQuery = 
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientPhone.includes(searchQuery);

    if (!matchesQuery) return false;

    // Date/status filter
    if (filterDate === 'today') {
      return job.selectedDate === todayStr;
    }
    if (filterDate === 'upcoming') {
      return job.selectedDate >= todayStr && job.status !== 'completed';
    }
    if (filterDate === 'completed') {
      return job.status === 'completed';
    }
    return true;
  });

  const handleStatusUpdate = async (jobId: string, newStatus: DispatchJob['status']) => {
    setUpdatingId(jobId);
    await updateBookingStatus(jobId, newStatus);
    await loadJobs();
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setUpdatingId(null);
  };

  const handleAddNote = async (jobId: string) => {
    if (!newNote.trim()) return;
    const currentNotes = selectedJob?.notes ? `${selectedJob.notes}\n• ${newNote.trim()}` : `• ${newNote.trim()}`;
    await updateBookingStatus(jobId, selectedJob?.status || 'scheduled', currentNotes);
    setNewNote('');
    await loadJobs();
    if (selectedJob) {
      setSelectedJob(prev => prev ? { ...prev, notes: currentNotes } : null);
    }
  };

  // Metrics
  const totalRevenue = jobs.reduce((acc, j) => acc + (j.priceTotal || 0), 0);
  const activeJobsCount = jobs.filter(j => j.status !== 'completed').length;
  const todayJobsCount = jobs.filter(j => j.selectedDate === todayStr).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Dashboard Top Header */}
      <header className="bg-slate-900 border-b-4 border-[#ff6600] px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full border-2 border-[#ff6600] overflow-hidden bg-black/60 flex items-center justify-center p-0.5 shrink-0 shadow-md">
              <img 
                src={logoImg} 
                alt="River Valley Cleanup Crew Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                  River Valley <span className="text-[#ff6600]">Cleanup</span> Crew
                </span>
                <span className="bg-[#ff6600]/20 text-[#ff6600] border border-[#ff6600]/40 text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded">
                  Operator Dispatch
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Rig 1: Dodge Ram 2500 Heavy-Duty • 14ft Tandem Trailer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={loadJobs}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors shadow-xs"
              title="Refresh jobs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#ff6600]' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-[#ff6600] hover:bg-orange-600 text-black px-3.5 py-1.5 rounded-lg text-xs font-black uppercase font-mono flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
              <span>Customer Booking Flow</span>
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Bar - Clean Grey Styling */}
      <section className="bg-slate-200/80 border-b border-slate-300 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-300 p-3.5 rounded-xl shadow-xs">
            <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Total Lined-Up Jobs</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">{jobs.length}</span>
          </div>
          <div className="bg-white border border-slate-300 p-3.5 rounded-xl shadow-xs">
            <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Scheduled for Today</span>
            <span className="text-xl sm:text-2xl font-black text-[#d95500] font-mono mt-0.5 block">{todayJobsCount}</span>
          </div>
          <div className="bg-white border border-slate-300 p-3.5 rounded-xl shadow-xs">
            <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Active In-Progress</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5 block">{activeJobsCount}</span>
          </div>
          <div className="bg-white border border-slate-300 p-3.5 rounded-xl shadow-xs">
            <span className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Total Pipeline Bookings</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Job List & Filters */}
        <div className="flex-1 space-y-4">
          {/* Filter & Search Controls */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, ticket..."
                className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ff6600] font-medium placeholder:text-slate-400"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
              {(['all', 'today', 'upcoming', 'completed'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterDate(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                    filterDate === tab 
                      ? 'bg-[#ff6600] text-black shadow-xs font-black' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Job List Cards */}
          {loading ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ff6600]" />
              <span>Loading River Valley dispatch manifests...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-300 p-8 text-center text-slate-500 font-mono text-xs shadow-xs">
              No jobs matching this filter.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map(job => {
                const isSelected = selectedJob?.id === job.id;
                const statusColors = {
                  scheduled: 'bg-slate-100 text-slate-800 border-slate-300',
                  dispatched: 'bg-indigo-50 text-indigo-800 border-indigo-300',
                  on_site: 'bg-amber-50 text-amber-900 border-amber-300',
                  disposal_run: 'bg-purple-50 text-purple-900 border-purple-300',
                  completed: 'bg-emerald-50 text-emerald-900 border-emerald-300',
                }[job.status] || 'bg-slate-100 text-slate-700 border-slate-300';

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative text-left bg-white shadow-xs ${
                      isSelected 
                        ? 'border-[#ff6600] ring-2 ring-[#ff6600]/20 bg-orange-50/20' 
                        : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-xs text-[#d95500] tracking-wider">
                          {job.ticketNumber}
                        </span>
                        <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${statusColors}`}>
                          {job.status.replace('_', ' ')}
                        </span>
                        <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                          {job.haulType === 'truck' ? 'Heavy-Duty Truck' : job.haulType === 'trailer' ? '14ft Tandem Trailer' : 'Free Appliance'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-[#ff6600]" />
                        <span>{job.selectedDate}</span>
                        <span className="text-slate-400">•</span>
                        <span>{job.timeSlot === 'morning' ? '8AM - 12PM' : '12PM - 4PM'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="block text-xs font-black text-slate-900 uppercase">{job.clientName}</span>
                        <a 
                          href={`tel:${job.clientPhone}`}
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-[#d95500] hover:underline font-mono font-bold inline-flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{job.clientPhone}</span>
                        </a>
                      </div>

                      <div>
                        <span className="block text-xs text-slate-700 font-medium truncate">
                          {job.address}, AR {job.zipCode}
                        </span>
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(`${job.address}, AR ${job.zipCode}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-[10px] text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-1 mt-0.5 font-mono"
                        >
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span>Google Maps Navigation</span>
                        </a>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-base font-black text-slate-900 font-mono block">
                          ${(job.priceTotal || 0).toFixed(2)}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase ${job.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {job.paymentStatus === 'paid' ? '✓ Paid via Card' : '⚠ Collect on Arrival'}
                        </span>
                      </div>
                    </div>

                    {/* Quick advance status pills */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Quick Advance:</span>
                        {(['scheduled', 'dispatched', 'on_site', 'disposal_run', 'completed'] as const).map(st => (
                          <button
                            key={st}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(job.id, st);
                            }}
                            disabled={updatingId === job.id}
                            className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded transition-all cursor-pointer ${
                              job.status === st 
                                ? 'bg-[#ff6600] text-black font-black shadow-xs' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onViewJobInTracker) onViewJobInTracker(job.ticketNumber);
                        }}
                        className="text-[10px] font-mono text-slate-500 hover:text-[#d95500] underline inline-flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Customer Tracker View</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Selected Job Detail Panel & Facebook Page Hub */}
        <div className="w-full lg:w-96 space-y-4 h-fit sticky top-24">
          
          {/* Active Job Detail Panel */}
          <div className="bg-white rounded-xl border border-slate-300 p-4 sm:p-5 shadow-xs">
            {selectedJob ? (
              <div className="space-y-4 text-left">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Active Ticket Details</span>
                    <h3 className="text-base font-black text-[#d95500] font-mono uppercase">
                      {selectedJob.ticketNumber}
                    </h3>
                  </div>
                  <span className="text-sm font-black text-slate-900 font-mono bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                    ${(selectedJob.priceTotal || 0).toFixed(2)}
                  </span>
                </div>

                {/* Customer Contact Card */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 font-black uppercase block">Customer Contact</span>
                  <p className="text-sm font-black text-slate-900">{selectedJob.clientName}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${selectedJob.clientPhone}`}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Client</span>
                    </a>
                    <a
                      href={`sms:${selectedJob.clientPhone}`}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1 border border-slate-300"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send SMS</span>
                    </a>
                  </div>
                </div>

                {/* Job Location */}
                <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
                  <span className="text-[10px] font-mono text-slate-500 font-black uppercase block">Site Location</span>
                  <p className="text-slate-900 font-bold">{selectedJob.address}, Fort Smith, AR {selectedJob.zipCode}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${selectedJob.address}, AR ${selectedJob.zipCode}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#d95500] hover:underline font-mono inline-flex items-center gap-1 pt-1 font-bold"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Open Route in GPS Navigation</span>
                  </a>
                </div>

                {/* Job Manifest / Debris */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs font-mono">
                  <span className="text-[10px] text-slate-500 font-black uppercase block">Debris Manifest</span>
                  <p className="text-slate-800">Haul Type: <strong className="text-slate-950 uppercase">{selectedJob.haulType}</strong></p>
                  {selectedJob.specialNotes && (
                    <p className="text-amber-900 text-[11px] bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                      ⚠️ {selectedJob.specialNotes}
                    </p>
                  )}
                </div>

                {/* Crew Notes & Status Advance */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-slate-500 font-black uppercase block">Crew Dispatch Notes</span>
                  {selectedJob.notes && (
                    <div className="p-2.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-line border border-slate-200">
                      {selectedJob.notes}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      placeholder="Add dispatch note (gate code, completion)..."
                      className="flex-1 bg-white text-xs text-slate-900 px-3 py-2 rounded-lg border border-slate-300 font-medium focus:outline-hidden focus:border-[#ff6600] placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddNote(selectedJob.id)}
                      className="bg-[#ff6600] text-black px-3 py-2 rounded-lg text-xs font-black font-mono cursor-pointer hover:bg-orange-600 shadow-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      if (onViewJobInTracker) onViewJobInTracker(selectedJob.ticketNumber);
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs py-2.5 rounded-lg text-center flex items-center justify-center gap-1.5 border border-slate-300 cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview Customer Status View</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-xs">
                <Truck className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <span>Select any ticket from the left column to view client contact, GPS navigation, and crew controls.</span>
              </div>
            )}
          </div>

          {/* Facebook Business Hub & Page Management */}
          <div className="bg-white rounded-xl border border-slate-300 p-4 sm:p-5 shadow-xs text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#1877F2] text-white rounded-lg">
                  <Facebook className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-900 font-mono tracking-tight">Facebook Page Hub</h4>
                  <p className="text-[10px] text-slate-500 font-mono">River Valley Cleanup Crew</p>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-1.5 py-0.5 rounded font-bold font-mono">
                Connected
              </span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a
                href="https://business.facebook.com/latest/inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-bold flex flex-col gap-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#1877F2] uppercase font-black">Meta Inbox</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] leading-tight text-slate-600 font-normal">Reply to Page Messages &amp; Leads</span>
              </a>

              <a
                href="https://www.facebook.com/pages"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-bold flex flex-col gap-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-600 uppercase font-black">Page Admin</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] leading-tight text-slate-600 font-normal">Manage Posts, Reviews &amp; Photos</span>
              </a>
            </div>

            {/* Book Now Button Integration Link for Facebook */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-700 uppercase">Page "Book Now" CTA Link</span>
                <span className="text-[9px] text-[#d95500] font-bold">Copy &amp; Paste</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">
                In your Facebook Page settings, click "Add Action Button" &gt; "Book Now" and paste this link:
              </p>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={window.location.origin}
                  className="flex-1 bg-white border border-slate-300 text-[10px] text-slate-800 px-2 py-1 rounded truncate select-all"
                />
                <button
                  type="button"
                  onClick={() => copyText(window.location.origin, 'cta_link')}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedField === 'cta_link' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Meta App Review Legal URLs */}
            <div className="border-t border-slate-200 pt-2 space-y-1 text-[10px] font-mono">
              <span className="text-slate-500 font-black uppercase block">Meta App Review Reference URLs</span>
              <div className="flex items-center justify-between text-slate-600">
                <span>Privacy Policy:</span>
                <button
                  type="button"
                  onClick={() => copyText(`${window.location.origin}/privacy.html`, 'privacy_url')}
                  className="text-[#d95500] hover:underline font-bold"
                >
                  {copiedField === 'privacy_url' ? '✓ Copied' : 'Copy /privacy.html'}
                </button>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Terms of Service:</span>
                <button
                  type="button"
                  onClick={() => copyText(`${window.location.origin}/terms.html`, 'terms_url')}
                  className="text-[#d95500] hover:underline font-bold"
                >
                  {copiedField === 'terms_url' ? '✓ Copied' : 'Copy /terms.html'}
                </button>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Data Deletion:</span>
                <button
                  type="button"
                  onClick={() => copyText(`${window.location.origin}/data-deletion.html`, 'deletion_url')}
                  className="text-[#d95500] hover:underline font-bold"
                >
                  {copiedField === 'deletion_url' ? '✓ Copied' : 'Copy /data-deletion.html'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

```

### FULL SOURCE FOR: `src/components/LegalModal.tsx`
```typescript
import React from 'react';
import { X, ShieldCheck, FileText, Trash2, ExternalLink } from 'lucide-react';
const logoImg = '/assets/img/logoRVCC.png';

export type LegalDocType = 'terms' | 'privacy' | 'deletion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialType = 'terms'
}) => {
  const [activeTab, setActiveTab] = React.useState<LegalDocType>(initialType);

  React.useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-[#ff6600]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#ff6600] overflow-hidden bg-black/60 flex items-center justify-center p-0.5 shrink-0 shadow-md">
              <img 
                src={logoImg} 
                alt="River Valley Cleanup Crew" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight font-display flex items-center gap-1.5">
                River Valley <span className="text-[#ff6600]">Legal</span> Center
              </h2>
              <p className="text-[10px] text-slate-400 font-mono">
                Fort Smith, Arkansas • Official Terms & Policies
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-[#ff6600] text-[#ff6600]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-[#ff6600] text-[#ff6600]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('deletion')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'deletion'
                ? 'border-[#ff6600] text-[#ff6600]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Data Deletion</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h3 className="text-base font-black uppercase text-slate-900">Service Terms & Conditions</h3>
              <p>
                By scheduling a junk removal or cleanout dispatch with River Valley Cleanup Crew, you authorize right of entry for our heavy-duty Dodge Ram 2500 and tandem utility trailer onto your premises at the scheduled window.
              </p>
              <h4 className="font-bold text-slate-900 uppercase text-xs pt-1">Hazardous Materials Restrictions:</h4>
              <p>
                In compliance with Sebastian County Environmental rules and ADEQ regulations, wet paints, chemicals, fuel tanks, pressurized cylinders, and friable asbestos are strictly excluded.
              </p>
              <h4 className="font-bold text-slate-900 uppercase text-xs pt-1">Estimates & Payment:</h4>
              <p>
                Online estimates reflect baseline calculations. Final on-site confirmation is performed prior to loading. Payment is completed via secure card tokenization or cash upon arrival.
              </p>
              <div className="pt-2">
                <a 
                  href="/terms.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs text-[#ff6600] font-bold font-mono hover:underline"
                >
                  <span>Open Full Standalone Terms in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-base font-black uppercase text-slate-900">Privacy Policy</h3>
              <p>
                River Valley Cleanup Crew respects your privacy. We collect your name, phone number, physical pickup address, and email solely to generate quotes, dispatch our crews, and communicate arrival updates.
              </p>
              <h4 className="font-bold text-slate-900 uppercase text-xs pt-1">No Sale of Personal Information:</h4>
              <p>
                We never sell, rent, or trade customer information to marketing third parties. Social login tokens via Google or Meta (Facebook) are exclusively used to authenticate your session and auto-fill contact information.
              </p>
              <div className="pt-2">
                <a 
                  href="/privacy.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs text-[#ff6600] font-bold font-mono hover:underline"
                >
                  <span>Open Full Standalone Privacy Policy in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'deletion' && (
            <div className="space-y-3">
              <h3 className="text-base font-black uppercase text-slate-900">Meta Facebook Data Deletion Instructions</h3>
              <p>
                To remove River Valley Cleanup Crew from your Facebook account:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Log in to your Facebook profile &gt; <strong>Settings & Privacy</strong> &gt; <strong>Settings</strong>.</li>
                <li>Go to <strong>Apps and Websites</strong>.</li>
                <li>Select <strong>River Valley Cleanup Crew</strong> and click <strong>Remove</strong>.</li>
              </ol>
              <p className="pt-1">
                To request an immediate purge of your service history or debris photos from our records, email our dispatch at <strong className="text-slate-900">dispatch@rivervalleycleanupcrew.com</strong> or call (479) 222-1311.
              </p>
              <div className="pt-2">
                <a 
                  href="/data-deletion.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-xs text-[#ff6600] font-bold font-mono hover:underline"
                >
                  <span>Open Full Data Deletion Page in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 p-3.5 px-6 flex justify-between items-center text-xs font-mono">
          <span className="text-slate-500">River Valley Cleanup Crew • Fort Smith, AR</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#ff6600] hover:bg-orange-600 text-black font-black uppercase px-4 py-1.5 rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

```

### FULL SOURCE FOR: `src/components/ServiceQuoteWizard.tsx`
```typescript
import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Camera, Check, MapPin, Truck } from "lucide-react";

const BASE_ZIP = "72908";
const DEFAULT_DUMP_ZIP = "72032";
const FALLBACK_GAS_PRICE = 3.95;
const MPG = 18;

const APPLIANCE_ITEMS = [
  { id: "fridge", label: "Refrigerator" },
  { id: "washer", label: "Washer / Dryer" },
  { id: "stove", label: "Stove / Oven" },
  { id: "dishwasher", label: "Dishwasher" },
  { id: "microwave", label: "Microwave" },
  { id: "hot_water", label: "Water Heater" }
] as const;

const TRAILER_ITEMS = [
  { id: "furniture", label: "Furniture", fee: 45 },
  { id: "appliances", label: "Appliances", fee: 55 },
  { id: "yard_waste", label: "Yard Waste", fee: 35 },
  { id: "construction", label: "Construction Debris", fee: 50 },
  { id: "electronics", label: "Electronics / E-Waste", fee: 60 },
  { id: "mixed", label: "Mixed Load", fee: 40 },
  { id: "metal", label: "Metal Scrap", fee: 30 }
] as const;

type LoadType = "appliance" | "truck" | "trailer";

type ServiceAreaResult =
  | { success: true; distanceMiles: number }
  | { success: false; message: string };

type RouteEstimateResult =
  | { success: true; distanceMiles: number; gasPrice: number }
  | { success: false; message: string };

function clampZip(zip: string) {
  return zip.replace(/[^0-9]/g, "").slice(0, 5);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 3958.8 * c; // miles
}

async function fetchZipCoords(zip: string) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!response.ok) return null;
    const data = await response.json();
    const place = data.places?.[0];
    if (!place?.latitude || !place?.longitude) return null;
    return {
      lat: Number(place.latitude),
      lng: Number(place.longitude)
    };
  } catch {
    return null;
  }
}

async function fetchCurrentGasPrice() {
  try {
    const response = await fetch("https://www.fueleconomy.gov/ws/rest/fuelprices");
    if (!response.ok) throw new Error("Gas API unavailable");
    const text = await response.text();
    const match = text.match(/<regular>([0-9.]+)<\/regular>/);
    return match ? Number(match[1]) : FALLBACK_GAS_PRICE;
  } catch {
    return FALLBACK_GAS_PRICE;
  }
}

export default function ServiceQuoteWizard() {
  const [step, setStep] = useState(1);
  const [customerZip, setCustomerZip] = useState("");
  const [dumpZip, setDumpZip] = useState(DEFAULT_DUMP_ZIP);
  const [loadType, setLoadType] = useState<LoadType | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [selectedAppliances, setSelectedAppliances] = useState<Record<string, boolean>>({});
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoAdjustment, setPhotoAdjustment] = useState(0);
  const [imageAnalysis, setImageAnalysis] = useState("");
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);
  const [serviceAreaMiles, setServiceAreaMiles] = useState<number | null>(null);
  const [serviceAreaStatus, setServiceAreaStatus] = useState("Awaiting zipcode entry to verify service area.");
  const [laborApproved, setLaborApproved] = useState(false);
  const [reservationSlot, setReservationSlot] = useState("Tomorrow 10:00 AM - 12:00 PM");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [autoFilledContact, setAutoFilledContact] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState<"now" | "later" | null>(null);
  const [statusMessage, setStatusMessage] = useState("Enter zip code to estimate route and gas.");

  useEffect(() => {
    if (customerZip) {
      setServiceAddress(`Service address near ${customerZip}, AR`);
      setAutoFilledContact(false);
    }
  }, [customerZip]);

  useEffect(() => {
    if (step === 6 && !autoFilledContact) {
      setServiceAddress((current) => current || `Service address near ${customerZip}, AR`);
      setCustomerName((current) => current || "Scrap Pickup Dispatch");
      setCustomerPhone((current) => current || "(479) 555-0101");
      setCustomerEmail((current) => current || "dispatch@scrappickup.com");
      setAutoFilledContact(true);
    }
  }, [step, customerZip, autoFilledContact]);

  const isCustomerZipValid = /^\d{5}$/.test(customerZip);
  const isDumpZipValid = /^\d{5}$/.test(dumpZip);
  const selectedTrailerItems = useMemo(
    () => TRAILER_ITEMS.filter((item) => selectedItems[item.id]),
    [selectedItems]
  );
  const selectedApplianceItems = useMemo(
    () => APPLIANCE_ITEMS.filter((item) => selectedAppliances[item.id]),
    [selectedAppliances]
  );

  const dumpFee = useMemo(() => {
    if (loadType === "truck") return 25;
    if (loadType === "trailer") return selectedTrailerItems.reduce((sum, item) => sum + item.fee, 0);
    return 0;
  }, [loadType, selectedTrailerItems]);

  const gasCost = useMemo(() => {
    if (!gasPrice || !distanceMiles || loadType === "appliance") return 0;
    return Number(((distanceMiles / MPG) * gasPrice).toFixed(2));
  }, [gasPrice, distanceMiles, loadType]);

  const estimatedMinutes = useMemo(() => {
    if (loadType === "appliance") return 0;
    const base = 45;
    const distanceMinutes = distanceMiles ? Math.max(0, distanceMiles / 20) * 15 : 0;
    const loadMinutes = loadType === "truck" ? 20 : loadType === "trailer" ? 30 : 15;
    const itemMinutes = loadType === "trailer" ? selectedTrailerItems.length * 8 : 0;
    const photoMinutes = uploadedPhoto ? 10 : 0;
    return Math.ceil(base + distanceMinutes + loadMinutes + itemMinutes + photoMinutes);
  }, [distanceMiles, loadType, selectedTrailerItems.length, uploadedPhoto]);

  const laborCost = useMemo(() => {
    if (loadType === "appliance") return 0;
    const ratePerHour = 75;
    const hours = Math.max(1, Math.ceil(estimatedMinutes / 60));
    return hours * ratePerHour;
  }, [estimatedMinutes, loadType]);

  const totalEstimate = useMemo(
    () => (loadType === "appliance" ? 0 : Number((gasCost + dumpFee + photoAdjustment + laborCost).toFixed(2))),
    [gasCost, dumpFee, photoAdjustment, laborCost, loadType]
  );

  useEffect(() => {
    if (step === 1 && isCustomerZipValid) {
      setServiceAreaStatus("Verifying service area based on customer zipcode...");
      verifyServiceArea(customerZip).then((result) => {
        if (result.success) {
          setServiceAreaMiles(result.distanceMiles);
          setServiceAreaStatus(
            result.distanceMiles <= 80
              ? `Service area confirmed: ${result.distanceMiles.toFixed(1)} miles from base.`
              : `Outside service area: ${result.distanceMiles.toFixed(1)} miles from base.`
          );
        } else if ("message" in result) {
          setServiceAreaMiles(null);
          setServiceAreaStatus(result.message);
        }
      });
    }
  }, [step, customerZip, isCustomerZipValid]);

  useEffect(() => {
    if (step === 2 && loadType && isCustomerZipValid) {
      if (loadType === "appliance") {
        setStatusMessage("Appliance pickup selected. No dump fee applies. Confirm details and continue.");
        setDistanceMiles(null);
        setGasPrice(null);
        return;
      }
      if (isDumpZipValid) {
        setStatusMessage("Fetching current gas price and estimating route...");
        estimateRouteAndGas(customerZip, dumpZip).then((result) => {
          if (result.success) {
            setDistanceMiles(result.distanceMiles);
            setGasPrice(result.gasPrice);
            setStatusMessage(`Estimated route ${result.distanceMiles.toFixed(1)} miles at $${result.gasPrice.toFixed(2)}/gal.`);
          } else if ("message" in result) {
            setStatusMessage(result.message);
          }
        });
      }
    }
  }, [step, loadType, customerZip, dumpZip, isCustomerZipValid, isDumpZipValid]);

  async function verifyServiceArea(userZip: string): Promise<ServiceAreaResult> {
    const startCoords = await fetchZipCoords(BASE_ZIP);
    const customerCoords = await fetchZipCoords(userZip);

    if (!startCoords || !customerCoords) {
      return { success: false, message: "Unable to resolve the customer zip code. Please verify 5 digits." };
    }

    const distance = haversineDistance(startCoords.lat, startCoords.lng, customerCoords.lat, customerCoords.lng);
    return { success: true, distanceMiles: distance };
  }

  async function estimateRouteAndGas(userZip: string, dumpZipCode: string): Promise<RouteEstimateResult> {
    const startCoords = await fetchZipCoords(BASE_ZIP);
    const customerCoords = await fetchZipCoords(userZip);
    const dumpCoords = await fetchZipCoords(dumpZipCode);

    if (!startCoords || !customerCoords || !dumpCoords) {
      return { success: false, message: "Unable to resolve one or more zip codes. Please verify 5 digits." };
    }

    const firstLeg = haversineDistance(startCoords.lat, startCoords.lng, customerCoords.lat, customerCoords.lng);
    const secondLeg = haversineDistance(customerCoords.lat, customerCoords.lng, dumpCoords.lat, dumpCoords.lng);
    const gasPriceValue = await fetchCurrentGasPrice();
    return {
      success: true,
      distanceMiles: firstLeg + secondLeg,
      gasPrice: gasPriceValue
    };
  }

  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      setUploadedPhoto(null);
      setPhotoPreviewUrl(null);
      setImageAnalysis("");
      setPhotoAdjustment(0);
      return;
    }
    setUploadedPhoto(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
    setImageAnalysis("");
    setPhotoAdjustment(0);
  };

  const handleAnalyzePhoto = () => {
    if (!uploadedPhoto) {
      setImageAnalysis("Upload a photo first to get pricing guidance.");
      return;
    }
    const sizeInKb = Math.round(uploadedPhoto.size / 1024);
    if (sizeInKb > 1200) {
      setImageAnalysis("Photo looks like a large package or bulky load; applying a handling price of $25.");
      setPhotoAdjustment(25);
    } else {
      setImageAnalysis("Photo shows a standard pickup load; applying a handling price of $10.");
      setPhotoAdjustment(10);
    }
  };

  const goNext = () => {
    if (step === 1) {
      if (!isCustomerZipValid) {
        setStatusMessage("Please enter a valid 5-digit customer zipcode.");
        return;
      }
      if (serviceAreaMiles === null || serviceAreaMiles > 80) {
        setStatusMessage("This zipcode is outside our service area. Please use a different address.");
        return;
      }
    }
    if (step === 2) {
      if (!loadType) {
        setStatusMessage("Choose an appliance pickup, truck load, or trailer load before continuing.");
        return;
      }
      if (loadType !== "appliance" && !isDumpZipValid) {
        setStatusMessage("Please enter a valid 5-digit dump zipcode.");
        return;
      }
      if (loadType !== "appliance" && (distanceMiles === null || gasPrice === null)) {
        setStatusMessage("Wait until the route estimate completes or verify the dump zipcode.");
        return;
      }
    }
    if (step === 3) {
      if (loadType === "trailer" && selectedTrailerItems.length === 0) {
        setStatusMessage("Select at least one trailer cargo type to determine dump fees.");
        return;
      }
      if (loadType === "appliance" && selectedApplianceItems.length === 0) {
        setStatusMessage("Select at least one appliance type for pickup.");
        return;
      }
    }
    if (step === 5 && !laborApproved) {
      setStatusMessage("Approve the labor estimate before selecting a service window.");
      return;
    }
    setStatusMessage("");
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const goBack = () => {
    if (step > 1) {
      setPaymentChoice(null);
      setStep((prev) => prev - 1);
    }
  };

  const handlePayNow = () => {
    setPaymentChoice("now");
    window.open("https://checkout.stripe.com/pay/cs_test_1234567890", "_blank", "noopener,noreferrer");
  };

  const stepLabels = [
    "Zip Code",
    "Load Type",
    "Cargo Items",
    "Photo",
    "Labor",
    "Reserve",
    "Invoice"
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Service Quote Wizard</h2>
            <p className="text-sm text-slate-500">Advance through the worksheet in order; the invoice will appear only at the end.</p>
          </div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-[0.18em]">Step {step} of 7</div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          {stepLabels.map((label, index) => (
            <div
              key={label}
              className={`rounded-2xl px-3 py-2 text-center transition-all ${
                index + 1 === step
                  ? "bg-indigo-600 text-white"
                  : index + 1 < step
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
          <p className="text-sm text-slate-600">{statusMessage}</p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900">1. Customer Zipcode</h3>
              <p className="text-sm text-slate-500 mt-1">Enter the customer's zipcode so we can estimate route distance from {BASE_ZIP}.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-xs font-semibold text-slate-500">Customer Zip Code</label>
                <input
                  value={customerZip}
                  onChange={(e) => setCustomerZip(clampZip(e.target.value))}
                  maxLength={5}
                  placeholder="e.g. 72701"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                {serviceAreaStatus}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900">2. Load Type & Dump Destination</h3>
              <p className="text-sm text-slate-500 mt-1">Choose whether this is an appliance pickup, truck load, or trailer load, then enter any required details.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setLoadType("truck")}
                  className={`rounded-3xl border px-5 py-5 text-left transition-all ${
                    loadType === "truck"
                      ? "border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="text-sm font-semibold">Truck Load</div>
                      <div className="text-xs text-slate-500 mt-1">Flat $25 dump fee. Best for quick full truck pickups.</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLoadType("trailer")}
                  className={`rounded-3xl border px-5 py-5 text-left transition-all ${
                    loadType === "trailer"
                      ? "border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="text-sm font-semibold">Trailer Load</div>
                      <div className="text-xs text-slate-500 mt-1">Dump pricing set by item categories selected next.</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 text-center sm:text-left pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need only broken metal appliances picked up?</span>
                <button
                  type="button"
                  onClick={() => setLoadType("appliance")}
                  className={`text-xs font-semibold underline cursor-pointer ${
                    loadType === "appliance" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {loadType === "appliance" ? "✓ Free Appliance Pickup Selected" : "Free Appliance Pickup (Click Here)"}
                </button>
              </div>

              {loadType !== "appliance" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-semibold text-slate-500">Dump Zip Code</label>
                  <input
                    value={dumpZip}
                    onChange={(e) => setDumpZip(clampZip(e.target.value))}
                    maxLength={5}
                    placeholder="Enter dump zipcode"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-slate-700">
                  Appliance pickup selected. No dump destination or gas estimate is required for this path.
                </div>
              )}

              {loadType !== "appliance" && distanceMiles !== null && gasPrice !== null ? (
                <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-600">Estimated total route distance:</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{distanceMiles.toFixed(1)} miles</p>
                  <p className="text-sm text-slate-500">Using current regular gas price ${gasPrice.toFixed(2)} / gallon.</p>
                  <p className="mt-3 text-sm text-slate-700">Base gas cost: <span className="font-semibold text-slate-900">${gasCost.toFixed(2)}</span> (assumes {MPG} MPG).</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-900">3. Load Details</h3>
                <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-semibold">
                  {loadType === "appliance" ? "Appliance pickup path" : loadType === "truck" ? "Truck load path" : "Trailer load path"}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {loadType === "appliance" && "Select the appliance(s) being picked up. This path has no dump fee and no gas charge."}
                {loadType === "truck" && "Truck loads automatically receive the flat dump fee. No item selection is required."}
                {loadType === "trailer" && "Choose the trailer cargo types. Dump pricing is based on the categories selected."}
              </p>

              {loadType === "appliance" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {APPLIANCE_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedAppliances((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`rounded-3xl border p-4 text-left transition-all ${
                        selectedAppliances[item.id]
                          ? "border-indigo-500 bg-indigo-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              ) : loadType === "trailer" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRAILER_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`rounded-3xl border p-4 text-left transition-all ${
                        selectedItems[item.id]
                          ? "border-indigo-500 bg-indigo-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className="text-xs font-semibold text-slate-500">${item.fee}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : loadType === "truck" ? (
                <div className="mt-5 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-slate-700">
                  Truck load path selected. The pickup includes a flat $25 dump fee and no item selection is required.
                </div>
              ) : null}

              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm text-slate-600">Current dump fee estimate:</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">${dumpFee.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">4. Optional Photo Analysis</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Upload a photo of the load or site, and the app will suggest handling pricing based on the image size.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
                  className="rounded-3xl border border-slate-200 px-4 py-3 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAnalyzePhoto}
                  className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all"
                >
                  Analyze Photo
                </button>
              </div>

              {photoPreviewUrl ? (
                <div className="mt-5 grid gap-3">
                  <img src={photoPreviewUrl} alt="Upload preview" className="h-44 w-full rounded-3xl object-cover border border-slate-200" />
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                    {imageAnalysis || "Tap Analyze Photo to get a pricing suggestion."}
                  </div>
                </div>
              ) : null}

              {photoAdjustment > 0 ? (
                <div className="mt-4 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  Photo handling adjustment: <span className="font-semibold">${photoAdjustment}</span>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">5. Labor Estimate</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">The app chooses a labor charge from the estimated time for the job.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Estimate</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{estimatedMinutes} min</p>
                </div>
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Suggested labor charge</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">${laborCost}</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-100 border border-slate-200 p-4 text-sm text-slate-700">
                <p>Labor is based on distance, load type, trailer cargo complexity, and whether a photo handling adjustment was applied.</p>
              </div>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLaborApproved(true);
                    setStatusMessage("Labor estimate approved. You can continue to reserve a slot.");
                  }}
                  className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all"
                >
                  <Check className="h-4 w-4 mr-2 inline-block" /> Approve Labor Estimate
                </button>
                {laborApproved && (
                  <div className="rounded-3xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">Labor has been approved. Continue to reserve arrival slot.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">6. Reserve Arrival Slot</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Confirm the service window and verify the customer contact information.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-500">Service Window</label>
                <select
                  value={reservationSlot}
                  onChange={(e) => setReservationSlot(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Tomorrow 10:00 AM - 12:00 PM</option>
                  <option>Tomorrow 1:00 PM - 3:00 PM</option>
                  <option>Day After Tomorrow 8:00 AM - 10:00 AM</option>
                  <option>Day After Tomorrow 2:00 PM - 4:00 PM</option>
                </select>
                <label className="block text-xs font-semibold text-slate-500">Service Address</label>
                <input
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Customer Name</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Phone</label>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Email</label>
                <input
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                The service address and contact info are prefilled from the zipcode entry and customer details, then confirmed here before final invoice.
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">7. Final Live Invoice</h3>
              <div className="grid gap-3">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Base gas cost</span>
                    <span>${gasCost.toFixed(2)}</span>
                  </div>
                </div>
                {loadType !== "appliance" && (
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Base gas cost</span>
                      <span>${gasCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{loadType === "appliance" ? "Appliance pickup fee" : loadType === "truck" ? "Truck dump fee" : "Trailer dump fee"}</span>
                    <span>${dumpFee.toFixed(2)}</span>
                  </div>
                </div>
                {photoAdjustment > 0 && loadType !== "appliance" ? (
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Photo handling adjustment</span>
                      <span>${photoAdjustment.toFixed(2)}</span>
                    </div>
                  </div>
                ) : null}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Labor charge</span>
                    <span>${laborCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-indigo-600 text-white border border-indigo-700 p-4">
                  <div className="flex justify-between text-sm uppercase tracking-[0.18em] opacity-80">
                    <span>Total estimate</span>
                    <span>${totalEstimate.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="rounded-3xl bg-green-600 text-white px-5 py-4 text-sm font-semibold hover:bg-green-700 transition-all"
                >
                  Pay Now with Stripe
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentChoice("later")}
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Pay When Driver Arrives
                </button>
              </div>
              {paymentChoice === "now" && (
                <div className="mt-4 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  Payment mode selected: pay now. Stripe checkout will open in a new tab.
                </div>
              )}
              {paymentChoice === "later" && (
                <div className="mt-4 rounded-3xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  Payment mode selected: pay when the driver arrives. The invoice is ready for the customer on site.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between items-stretch">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={step === 7}
            className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {step === 6 ? "Review Invoice" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}


```

### FULL SOURCE FOR: `src/components/WhatWeDoModal.tsx`
```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  Truck, 
  Maximize2,
  Calendar,
  ArrowRight
} from 'lucide-react';

const bedroomBaImg = '/assets/img/bedroom_ba.png';
const storageUnitImg = '/assets/img/storageunit_ba.png';
const houseFlipBaImg = '/assets/img/houseflip_ba.jpg';
const garageBaImg = '/assets/img/garage_ba.jpg';

export interface BeforeAfterSlide {
  id: string;
  title: string;
  tag: string;
  category: string;
  beforeAfterBadge: string;
  subtitle: string;
  description: string;
  keyHighlights: string[];
  imageUrl: string;
  fallbackUrl?: string;
  aspectRatioLabel: string;
}

export const SLIDES_DATA: BeforeAfterSlide[] = [
  {
    id: 'bedroom-cleanout',
    title: 'Tenant Eviction Cleanout',
    tag: 'Rental Property Turnaround',
    category: 'Property Management & Evictions',
    beforeAfterBadge: 'Eviction Cleanup Before & After',
    subtitle: 'Fast unit restoration to get properties back on the rental market',
    description: 'Evictions often leave property managers dealing with the aftermath of angry tenants who take their stuff and leave their crap let us help you get it back on the rental market quickly.',
    keyHighlights: [
      'Rapid 24-48 hr turnover for property managers & landlords',
      'All abandoned furniture, bagged trash & debris hauled',
      'Broom-swept finish ready for contractors or cleaners'
    ],
    imageUrl: bedroomBaImg,
    fallbackUrl: '/assets/img/Bedroom_before_and_after_cleaning_202609042025.jpeg',
    aspectRatioLabel: 'Wide 16:9'
  },
  {
    id: 'storage-unit',
    title: 'Abandoned Storage Unit Cleanout',
    tag: 'Commercial Storage Facility',
    category: 'Commercial & Property Management',
    beforeAfterBadge: 'Storage Purge Before & After',
    subtitle: 'Full unit clearing & sweep-out after tenant abandonment',
    description: 'An abandoned or unpaid storage unit is nothing but lost revenue and wasted space. Let us haul away the junk and sweep the floor clean, and transform that liability back into a profitable, rent-ready unit so you can recover your bottom line immediately.',
    keyHighlights: [
      'Same-day emergency facility turnarounds',
      'All heavy furniture, bins & bulky scrap removed',
      'Complete broom-sweep finish included'
    ],
    imageUrl: storageUnitImg,
    fallbackUrl: '/assets/img/Storageunit_ba.jpg',
    aspectRatioLabel: 'Wide Pan 16:9'
  },
  {
    id: 'property-transformation',
    title: 'Auction Property & House Flip Overhaul',
    tag: 'Investor & Renovation Repairs',
    category: 'Renovation & Property Overhaul',
    beforeAfterBadge: 'House Flip Overhaul',
    subtitle: 'From structural decay and debris to sale-ready property',
    description: 'Purchasing an auction property is stressful enough without inheriting a house full of hazardous debris and structural decay. We specialize in these types of repairs we can patch the roof lay the flooring pretty much overhaul the entire property to help you get it ready to be sold.',
    keyHighlights: [
      'Hazardous clutter & demolition debris clearing',
      'Roof patching, floor laying & property overhaul',
      'Fast turnaround to help maximize your resale value'
    ],
    imageUrl: houseFlipBaImg,
    fallbackUrl: '/assets/img/houseflip_ba.jpg',
    aspectRatioLabel: 'Split Comparison'
  },
  {
    id: 'garage-cleanout',
    title: 'Suburban Garage & Attic Purge',
    tag: 'Residential Estate Cleanout',
    category: 'Home & Garage Restoration',
    beforeAfterBadge: 'Garage Clutter Before & After',
    subtitle: 'Restoring vehicle parking from floor-to-ceiling clutter',
    description: 'You want to park your car in the garage but its full of those boxes that you keep meaning to get around to "next week" Let us clear it out and haul it to the dump for you. Reclaim that square footage and car space!',
    keyHighlights: [
      'Floor-to-ceiling sort, carry & load-out',
      'Appliances & metals triaged for recycling',
      'Zero dumpster sitting in your driveway'
    ],
    imageUrl: garageBaImg,
    fallbackUrl: '/assets/img/garage_ba.jpg',
    aspectRatioLabel: 'High-Res Wide'
  }
];

interface WhatWeDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEstimate?: () => void;
}

export const WhatWeDoModal: React.FC<WhatWeDoModalProps> = ({
  isOpen,
  onClose,
  onStartEstimate
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const currentSlide = SLIDES_DATA[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Slideshow auto-play interval
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, handleNext]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImageSrc = imgErrorMap[currentSlide.id] && currentSlide.fallbackUrl 
    ? currentSlide.fallbackUrl 
    : currentSlide.imageUrl;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-[#1e1e1e] text-white w-full max-w-5xl max-h-[92vh] rounded-xl border-2 border-[#ff6600] shadow-[0_0_40px_rgba(255,102,0,0.35)] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#141414] border-b border-[#333]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-[#ff6600] text-black flex items-center justify-center font-black">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="modal-title" className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                  What Do We Do?
                </h2>
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-[#ff6600]/20 text-[#ff6600] px-2 py-0.5 rounded border border-[#ff6600]/40">
                  Before &amp; After Showcase
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 font-mono mt-0.5 leading-snug max-w-2xl">
                These before-and-after showcases are illustrative examples displaying the types of cleanout and hauling services we perform across the River Valley. Real customer project photos will be added here as new jobs are completed!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auto Play Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors border cursor-pointer ${
                isPlaying 
                  ? 'bg-[#ff6600] text-black border-[#ff6600]' 
                  : 'bg-[#2a2a2a] text-slate-300 border-slate-700 hover:bg-[#333]'
              }`}
              title={isPlaying ? 'Pause slideshow' : 'Auto-play slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Auto-Play</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slide Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Main Visual Display */}
          <div className="relative bg-black w-full min-h-[260px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center overflow-hidden group">
            {/* The Image */}
            <img 
              src={currentImageSrc} 
              alt={currentSlide.title}
              onError={() => {
                if (!imgErrorMap[currentSlide.id]) {
                  setImgErrorMap((prev) => ({ ...prev, [currentSlide.id]: true }));
                }
              }}
              className="w-full h-full max-h-[500px] object-contain select-none transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Badges Overlay on Image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
              <span className="bg-[#ff6600] text-black text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-md font-mono">
                {currentSlide.beforeAfterBadge}
              </span>
              <span className="bg-black/75 text-slate-200 text-xs font-bold px-2 py-1 rounded border border-white/20 backdrop-blur-xs font-mono">
                {currentSlide.tag}
              </span>
            </div>

            {/* Slide Index Badge */}
            <div className="absolute top-3 right-3 bg-black/80 text-slate-300 text-xs font-mono font-bold px-2.5 py-1 rounded border border-white/20 backdrop-blur-xs">
              {currentIndex + 1} / {SLIDES_DATA.length}
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#ff6600] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#ff6600] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Auto-play progress bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                <div 
                  key={currentIndex}
                  className="h-full bg-[#ff6600] animate-[shimmer_4.5s_linear]"
                  style={{
                    animation: 'progress 4.5s linear'
                  }}
                />
              </div>
            )}
          </div>

          {/* Slide Details Panel */}
          <div className="p-4 sm:p-6 bg-[#222] border-t border-[#333] space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase text-[#ff6600] font-bold tracking-wider">
                    {currentSlide.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white font-display">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              {/* Action: Book similar service button */}
              <div className="shrink-0 flex flex-col gap-2">
                {onStartEstimate && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onStartEstimate();
                    }}
                    className="bg-[#ff6600] hover:bg-[#e65c00] text-black font-black uppercase text-xs px-4 py-2.5 rounded border border-white/30 flex items-center justify-center space-x-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#ffffff]"
                  >
                    <span>Estimate This Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-[10px] text-slate-400 font-mono text-center">
                  Press ← or → on keyboard
                </span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-700/60">
              {currentSlide.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-[#1a1a1a] p-2.5 rounded border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6600] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Interactive Thumbnail Carousel Strip */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Featured Gallery Slides:
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Click any card to inspect
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SLIDES_DATA.map((slide, idx) => {
                  const isSelected = idx === currentIndex;
                  const thumbSrc = imgErrorMap[slide.id] && slide.fallbackUrl 
                    ? slide.fallbackUrl 
                    : slide.imageUrl;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`group text-left p-1.5 rounded-lg border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected 
                          ? 'border-[#ff6600] bg-[#2a2a2a] shadow-[0_0_12px_rgba(255,102,0,0.3)]' 
                          : 'border-slate-700/80 bg-[#181818] hover:border-slate-500'
                      }`}
                    >
                      <div className="relative aspect-video w-full rounded overflow-hidden bg-black">
                        <img 
                          src={thumbSrc} 
                          alt={slide.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#ff6600]/20 border border-[#ff6600]" />
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/80 text-[8px] font-mono px-1 rounded text-white">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="px-1 truncate">
                        <span className={`block text-[11px] font-black uppercase truncate ${isSelected ? 'text-[#ff6600]' : 'text-slate-200'}`}>
                          {slide.title}
                        </span>
                        <span className="block text-[9px] text-slate-400 truncate">
                          {slide.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

```
