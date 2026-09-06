import React, { useState, useEffect } from 'react';
import { 
  Truck, Calendar, MapPin, Phone, CheckCircle2, 
  Clock, AlertCircle, Search, ArrowLeft, ShieldCheck, 
  ExternalLink, Sparkles, FileText, Check, ChevronRight
} from 'lucide-react';
import { DispatchJob, getAllBookings } from '../lib/firebase';
import logoImg from '../../assets/img/logoRVCC.png';
import dodgeTruckImg from '../../assets/img/Dodge_truck.jpeg';

interface CustomerJobTrackerProps {
  initialTicketNumber?: string;
  onBackToEstimator: () => void;
  onOpenOperatorDashboard?: () => void;
}

export const CustomerJobTracker: React.FC<CustomerJobTrackerProps> = ({
  initialTicketNumber,
  onBackToEstimator,
  onOpenOperatorDashboard
}) => {
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
              onClick={onBackToEstimator}
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
