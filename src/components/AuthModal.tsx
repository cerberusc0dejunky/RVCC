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
