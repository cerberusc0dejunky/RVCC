import React from 'react';
import { X, ShieldCheck, FileText, Trash2, ExternalLink, AlertTriangle, Ban } from 'lucide-react';
const logoImg = '/assets/img/logoRVCC.png';

export type LegalDocType = 'terms' | 'privacy' | 'deletion' | 'prohibited';

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

          <button
            onClick={() => setActiveTab('prohibited')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prohibited'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-red-500" />
            <span>Non-Haulable Items</span>
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
                To request an immediate purge of your service history or debris photos from our records, email our dispatch at <strong className="text-slate-900">rvcc@c0dejunky.com</strong> or call (479) 222-1311.
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

          {activeTab === 'prohibited' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                <h3 className="text-base font-black uppercase text-red-600 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-red-600" />
                  Landfill Prohibited Items (Non-Haulable)
                </h3>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded font-mono uppercase">
                  Sebastian County Landfill
                </span>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-xs text-red-900 leading-snug">
                <p className="font-bold">Notice to all River Valley Cleanup Crew Customers:</p>
                <p className="mt-1">
                  The following items are <strong>not accepted by the dump</strong>, so our crew <strong>cannot and will not haul them</strong>. Please ensure these items are segregated from your debris pile prior to crew dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {[
                  { title: "Non-solidified Paint", desc: "Only paint from Sebastian County residents can be received. Must be taken directly to the Convenience Center to solidify or reuse." },
                  { title: "Burn Barrels", desc: "Debris must be removed from the barrel and placed in garbage bags; un-bagged barrels will not be accepted." },
                  { title: "Gas Cans or Tanks with Liquid", desc: "Any fuel containers, cans, or tanks containing liquid gasoline or diesel are strictly prohibited." },
                  { title: "Whole Tires", desc: "Tires cannot be accepted unless they have been cut and quartered." },
                  { title: "Used Motor Oils & Oil Filters", desc: "Prohibited unless dome-punched and hot drained." },
                  { title: "Dry Cell Heavy Metal Batteries", desc: "Any batteries containing cadmium or mercury." },
                  { title: "Wet Cell or Lead-Acid Batteries", desc: "Automotive, boat, or equipment lead-acid batteries." },
                  { title: "Domestic Septic Tank Pumpings", desc: "Septic sewage or liquid pumping waste." },
                  { title: "Incinerator Ash & Residues", desc: "Combustion or incinerator ash residue." },
                  { title: "Free Liquids (EPA Method 9095)", desc: "Free liquid containers failing the US EPA Paint Filter Test." },
                  { title: "Regulated Bio-Medical & Vet Waste", desc: "Red-bagged biohazards, medical, or unsterilized veterinary waste." },
                  { title: "Compressed Gas Cylinders & Drums", desc: "Cylinders/drums not meeting RCRA empty definition under 40 CFR 261 (e.g. pressurized propane tanks)." },
                  { title: "Electrical Transformers & Dielectric Fluids", desc: "Transformers, capacitors, or equipment containing dielectric fluids." },
                  { title: "Petroleum Contaminated Soils", desc: "Soils failing specific TPH, BETX, TCLP analysis." },
                  { title: "Cresol Treated Wood", desc: "Treated wood that has not been certified hazard free." },
                  { title: "Appliances & Parts Containing Freon", desc: "Refrigerators, AC units, or freezers that have not been certified evacuated by a licensed technician." },
                  { title: "Pesticide, Herbicide & Fungicide Containers", desc: "Containers that have not been triple-rinsed and punctured." },
                  { title: "Hazardous & PCB Wastes", desc: "As defined in 40 CFR 261 and 761." },
                  { title: "Firearms, Ammunition & Explosives", desc: "Guns, live ammunition, gunpowder, fireworks, or explosive materials." },
                  { title: "Commercial Fluorescent Light Bulbs", desc: "Fluorescent tubes from commercial businesses." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <span className="block font-bold text-xs text-slate-900 uppercase font-mono">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-slate-600 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
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
