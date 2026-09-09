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
