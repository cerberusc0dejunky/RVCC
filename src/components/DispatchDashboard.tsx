import React, { useState, useEffect } from 'react';
import { 
  Truck, Calendar, MapPin, Phone, Mail, CheckCircle2, 
  Clock, AlertCircle, RefreshCw, ChevronRight, Search, 
  Filter, DollarSign, FileText, ArrowLeft, Send, Sparkles,
  ExternalLink, Printer, ShieldCheck, Check, Facebook, Copy, MessageCircle
} from 'lucide-react';
import { DispatchJob, getAllBookings, updateBookingStatus } from '../lib/firebase';
import logoImg from '../../assets/img/logoRVCC.png';

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
