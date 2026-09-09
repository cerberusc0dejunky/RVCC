import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  Printer, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  ArrowLeft, 
  DollarSign, 
  Truck, 
  Sparkles, 
  X, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { 
  DispatchJob, 
  CustomBidRequest, 
  getAllBookings, 
  getAllCustomBids, 
  saveCustomBidRequest, 
  updateCustomBid,
  AuthUser,
  MAX_IMAGE_SIZE_BYTES
} from '../lib/firebase';
import { ReceiptModal } from './ReceiptModal';

const logoImg = '/assets/img/logoRVCC.png';
const dodgeTruckImg = '/assets/img/Dodge_truck.jpeg';

interface UserAccountPageProps {
  currentUser: AuthUser | null;
  onNavigateToEstimator: () => void;
  onOpenAuthModal: () => void;
  onOpenOperatorBoard?: () => void;
  onSignOut: () => void;
  initialTicketQuery?: string;
}

export const UserAccountPage: React.FC<UserAccountPageProps> = ({
  currentUser,
  onNavigateToEstimator,
  onOpenAuthModal,
  onOpenOperatorBoard,
  onSignOut,
  initialTicketQuery
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'custom_quotes' | 'request_quote'>('bookings');
  const [bookings, setAllBookings] = useState<DispatchJob[]>([]);
  const [customBids, setAllCustomBids] = useState<CustomBidRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTicket, setSearchTicket] = useState<string>(initialTicketQuery || '');

  // Receipt Modal state
  const [selectedReceiptJob, setSelectedReceiptJob] = useState<DispatchJob | null>(null);

  // Custom Job Request Form State
  const [customName, setCustomName] = useState<string>(currentUser?.displayName || '');
  const [customPhone, setCustomPhone] = useState<string>('');
  const [customEmail, setCustomEmail] = useState<string>(currentUser?.email || '');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [customZip, setCustomZip] = useState<string>('72901');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [customImage, setCustomImage] = useState<{
    file: File | null;
    previewUrl: string;
    fileName: string;
    fileSizeStr: string;
  } | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [submitSuccessBid, setSubmitSuccessBid] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    const [bks, bids] = await Promise.all([
      getAllBookings(),
      getAllCustomBids()
    ]);
    setAllBookings(bks);
    setAllCustomBids(bids);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter bookings for this user or search query
  const filteredBookings = bookings.filter(job => {
    if (searchTicket.trim()) {
      const q = searchTicket.trim().toLowerCase();
      return (
        job.ticketNumber.toLowerCase().includes(q) ||
        job.clientPhone.includes(q) ||
        job.clientName.toLowerCase().includes(q) ||
        job.clientEmail.toLowerCase().includes(q)
      );
    }
    if (currentUser?.email) {
      return job.clientEmail.toLowerCase() === currentUser.email.toLowerCase();
    }
    return true;
  });

  // Filter custom bids for this user
  const filteredCustomBids = customBids.filter(bid => {
    if (searchTicket.trim()) {
      const q = searchTicket.trim().toLowerCase();
      return (
        bid.bidNumber.toLowerCase().includes(q) ||
        bid.clientPhone.includes(q) ||
        bid.clientName.toLowerCase().includes(q) ||
        bid.clientEmail.toLowerCase().includes(q)
      );
    }
    if (currentUser?.email) {
      return bid.clientEmail.toLowerCase() === currentUser.email.toLowerCase();
    }
    return true;
  });

  // Handle custom job image selection with strict hardcoded 25MB check
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // HARDCODED 25MB LIMIT CHECK (25 * 1024 * 1024 = 26,214,400 bytes)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setImageError(
        `Upload rejected: Image size (${fileSizeMB} MB) exceeds the strict 25MB limit. Please select an image under 25MB.`
      );
      e.target.value = '';
      return;
    }

    const fileSizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const reader = new FileReader();
    reader.onload = () => {
      setCustomImage({
        file,
        previewUrl: reader.result as string,
        fileName: file.name,
        fileSizeStr
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitCustomJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDescription.trim()) {
      alert('Please describe what you need done.');
      return;
    }
    if (!customPhone.trim()) {
      alert('Please provide a phone number so our estimator can text/call with your bid.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await saveCustomBidRequest({
        clientName: customName.trim() || currentUser?.displayName || 'River Valley Resident',
        clientPhone: customPhone.trim(),
        clientEmail: customEmail.trim() || currentUser?.email || '',
        address: customAddress.trim() || 'Fort Smith, AR',
        zipCode: customZip.trim() || '72901',
        description: customDescription.trim(),
        imageUrl: customImage?.previewUrl || '/assets/img/houseflip_ba.jpg',
        imageFileName: customImage?.fileName || 'custom_request.jpg',
        imageFileSize: customImage?.fileSizeStr || '1.0 MB'
      });

      setSubmitSuccessBid(res.bidNumber);
      setCustomDescription('');
      setCustomImage(null);
      await loadData();
      setActiveTab('custom_quotes');
    } catch (err: any) {
      console.error('Failed to submit custom bid request:', err);
      alert('Could not submit bid request. Please try again or call (479) 222-1311.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    await updateCustomBid(bidId, { status: 'accepted' });
    await loadData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-[#141414] border-b border-slate-800 px-4 sm:px-8 py-4 shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full border-2 border-[#ff6600] overflow-hidden bg-black p-0.5 shrink-0 shadow-md">
              <img src={logoImg} alt="RVCC Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                River Valley <span className="text-[#ff6600]">Cleanup</span> Crew
              </span>
              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                Customer Account &amp; Hauling Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToEstimator}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold px-3 py-1.5 rounded border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Estimator</span>
            </button>
            
            {currentUser?.role === 'operator' && onOpenOperatorBoard && (
              <button
                type="button"
                onClick={onOpenOperatorBoard}
                className="bg-[#ff6600] hover:bg-orange-600 text-slate-950 text-xs font-mono font-black uppercase px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Operator Board</span>
              </button>
            )}

            {currentUser ? (
              <button
                type="button"
                onClick={onSignOut}
                title="Sign out of account"
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 text-xs font-mono p-1.5 rounded border border-slate-800 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="bg-[#ff6600] text-slate-950 text-xs font-mono font-black uppercase px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Account Content */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
        
        {/* Account Profile Banner */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-[#ff6600] flex items-center justify-center text-white overflow-hidden shrink-0">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-slate-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display">
                  {currentUser ? currentUser.displayName : 'Guest Customer Account'}
                </h1>
                <span className="bg-[#ff6600]/20 text-[#ff6600] text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#ff6600]/30">
                  {currentUser ? currentUser.provider : 'Local Session'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {currentUser?.email || 'Sign in with Google or Facebook to auto-sync your booked hauls across all devices.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <a
              href="tel:4792221311"
              className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Crew: (479) 222-1311</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-[#ff6600] text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Bookings &amp; Receipts ({filteredBookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom_quotes')}
            className={`px-4 py-2 rounded-lg font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'custom_quotes'
                ? 'bg-[#ff6600] text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Custom Job Bids ({filteredCustomBids.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('request_quote')}
            className={`px-4 py-2 rounded-lg font-black uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'request_quote'
                ? 'bg-[#ff6600] text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Request Custom Job Bid</span>
          </button>
        </div>

        {/* Quick Ticket Lookup Input */}
        <div className="bg-[#1a1a1a] p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchTicket}
              onChange={e => setSearchTicket(e.target.value)}
              placeholder="Search by Ticket # (e.g. TKT-782104), BID #, or Phone..."
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 w-full text-xs focus:outline-hidden focus:border-[#ff6600]"
            />
            {searchTicket && (
              <button
                type="button"
                onClick={() => setSearchTicket('')}
                className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-[11px] text-slate-400">
            Receipts and bids are available 24/7 without needing to track live truck steps.
          </span>
        </div>

        {/* TAB 1: BOOKINGS & RECEIPTS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-10 text-center text-slate-400 font-mono text-xs space-y-3">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-white font-bold text-sm">No scheduled cleanouts found.</p>
                <p className="text-slate-500 max-w-md mx-auto">
                  If you scheduled a haul, you can enter your 6-digit Ticket # above, or book a cleanout through our online estimator.
                </p>
                <button
                  type="button"
                  onClick={onNavigateToEstimator}
                  className="bg-[#ff6600] hover:bg-orange-600 text-slate-950 font-black uppercase px-4 py-2 rounded-lg text-xs cursor-pointer shadow-sm"
                >
                  Book a New Cleanout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map(job => (
                  <div 
                    key={job.id} 
                    className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-5 shadow-lg hover:border-slate-700 transition-all flex flex-col md:flex-row justify-between gap-5"
                  >
                    <div className="space-y-2.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#ff6600] text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                          {job.haulType === 'trailer' ? '14ft Tandem Trailer' : job.haulType === 'truck' ? 'Truck Bed Haul' : 'Appliance Scrap'}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          {job.ticketNumber}
                        </span>
                        <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                          job.paymentStatus === 'paid' 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' 
                            : 'bg-amber-950/40 text-amber-400 border-amber-800'
                        }`}>
                          {job.paymentStatus === 'paid' ? '✓ Paid via Card' : 'Payment Due on Arrival'}
                        </span>
                      </div>

                      <div className="text-sm font-sans font-bold text-slate-200">
                        Scheduled for {job.selectedDate} • {job.timeSlot === 'morning' ? 'Morning Window (8AM – 12PM)' : 'Afternoon Window (12PM – 4PM)'}
                      </div>

                      <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-[#ff6600]" />
                          <span>{job.address}, AR {job.zipCode}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.clientPhone}</span>
                        </span>
                      </div>

                      {job.notes && (
                        <p className="text-xs font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                          {job.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0 shrink-0">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-slate-500 font-mono uppercase block">Total Price:</span>
                        <span className="text-lg font-black font-mono text-[#ff6600]">
                          ${(job.priceTotal || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedReceiptJob(job)}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold px-3.5 py-2 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs w-full sm:w-auto"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#ff6600]" />
                          <span>View &amp; Download Receipt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CUSTOM JOB BIDS */}
        {activeTab === 'custom_quotes' && (
          <div className="space-y-4">
            {submitSuccessBid && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-600 rounded-xl text-xs font-mono text-emerald-300 flex items-center justify-between gap-2 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your custom job request <strong>{submitSuccessBid}</strong> was received! Our estimator is reviewing the photos and will submit a bid shortly.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccessBid(null)}
                  className="text-emerald-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {filteredCustomBids.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-xl border border-slate-800 p-10 text-center text-slate-400 font-mono text-xs space-y-3">
                <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-white font-bold text-sm">No custom bids requested yet.</p>
                <p className="text-slate-500 max-w-md mx-auto">
                  Have a unique job like fallen storm tree limbs, shed demolition, hoarded house cleanup, or scrap removal? Upload a photo and describe what you need done to get a direct bid from our crew.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('request_quote')}
                  className="bg-[#ff6600] hover:bg-orange-600 text-slate-950 font-black uppercase px-4 py-2 rounded-lg text-xs cursor-pointer shadow-sm"
                >
                  Submit a Job for Free Bidding
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredCustomBids.map(bid => (
                  <div 
                    key={bid.id} 
                    className="bg-[#1a1a1a] rounded-2xl border-2 border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#ff6600] text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                          Custom Bid Request
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          {bid.bidNumber}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Submitted {new Date(bid.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        {bid.status === 'pending_bid' && (
                          <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[11px] font-mono font-black uppercase px-2.5 py-1 rounded">
                            Pending Contractor Bid
                          </span>
                        )}
                        {bid.status === 'bid_submitted' && (
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-700 text-[11px] font-mono font-black uppercase px-2.5 py-1 rounded animate-pulse">
                            ✓ Bid Ready for Review
                          </span>
                        )}
                        {bid.status === 'accepted' && (
                          <span className="bg-cyan-950 text-cyan-300 border border-cyan-700 text-[11px] font-mono font-black uppercase px-2.5 py-1 rounded">
                            ✓ Bid Accepted &amp; Confirmed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Photo preview */}
                      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 relative h-48">
                        {bid.imageUrl ? (
                          <img 
                            src={bid.imageUrl} 
                            alt={bid.description} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-500 font-mono text-xs">
                            No photo attached
                          </div>
                        )}
                        {bid.imageFileSize && (
                          <div className="absolute bottom-2 left-2 bg-black/80 text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            Size: {bid.imageFileSize} (under 25MB)
                          </div>
                        )}
                      </div>

                      {/* Job description & address */}
                      <div className="md:col-span-2 space-y-3 text-xs font-mono">
                        <div>
                          <span className="text-[10px] uppercase font-black text-slate-500 block">Customer Job Description:</span>
                          <p className="text-white text-sm font-sans mt-0.5 whitespace-pre-line bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                            {bid.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">Location:</span>
                            <strong className="text-slate-200">{bid.address}, AR {bid.zipCode}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">Contact Phone:</span>
                            <strong className="text-slate-200">{bid.clientPhone}</strong>
                          </div>
                        </div>

                        {/* Husband's Bid Box */}
                        {bid.status === 'bid_submitted' || bid.status === 'accepted' ? (
                          <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border-2 border-[#ff6600] rounded-xl p-4 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black uppercase text-[#ff6600] font-mono flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-[#ff6600]" />
                                <span>Official Bid from River Valley Cleanup Crew</span>
                              </span>
                              <span className="text-xl font-black font-mono text-emerald-400">
                                ${(bid.bidAmount || 0).toFixed(2)}
                              </span>
                            </div>

                            <div className="space-y-1 text-xs text-slate-300">
                              {bid.bidEquipment && (
                                <div><strong>Equipment / Rig:</strong> {bid.bidEquipment}</div>
                              )}
                              {bid.bidDateEstimate && (
                                <div><strong>Target Timeframe:</strong> {bid.bidDateEstimate}</div>
                              )}
                              {bid.bidNotes && (
                                <div className="p-2.5 bg-black/40 rounded border border-slate-800 text-slate-200">
                                  <strong>Crew Notes:</strong> {bid.bidNotes}
                                </div>
                              )}
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-2">
                              {bid.status !== 'accepted' && (
                                <button
                                  type="button"
                                  onClick={() => handleAcceptBid(bid.id)}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase text-xs px-4 py-2 rounded-lg font-mono flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Accept Bid &amp; Lock Service</span>
                                </button>
                              )}
                              <a
                                href="tel:4792221311"
                                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold px-3.5 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#ff6600]" />
                                <span>Call Crew to Confirm: (479) 222-1311</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center gap-3">
                            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                            <div>
                              <strong className="text-white block">Quote is currently being estimated.</strong>
                              <span>Our crew is calculating load volume, trailer capacity, and Sebastian County dump fees. You will receive a notification or call at {bid.clientPhone} as soon as the bid is entered.</span>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REQUEST A CUSTOM JOB BID */}
        {activeTab === 'request_quote' && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#ff6600] text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                  Free Contractor Bidding
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display mt-1">
                Describe Your Custom Job &amp; Upload Photo
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Need storm debris cleared, garage or shed demo, hoarded house cleanup, or commercial hauling? Upload a photo (under 25MB) and describe what you need done. We will review and provide a direct bid.
              </p>
            </div>

            <form onSubmit={handleSubmitCustomJob} className="space-y-5">
              
              {/* Photo Upload with Hardcoded 25MB Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase text-slate-300 font-mono">
                    Upload Job Photo (Hardcoded 25MB Limit)
                  </label>
                  <span className="text-[11px] font-mono text-[#ff6600] font-bold">
                    Max size: 25 MB
                  </span>
                </div>

                {imageError && (
                  <div className="p-3 bg-red-950/60 border border-red-500 rounded-lg text-xs font-mono text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{imageError}</span>
                  </div>
                )}

                {customImage ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img 
                        src={customImage.previewUrl} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded-lg border border-slate-700 shrink-0" 
                      />
                      <div className="text-xs font-mono truncate">
                        <span className="text-white font-bold block truncate">{customImage.fileName}</span>
                        <span className="text-slate-400 text-[11px]">Size: {customImage.fileSizeStr} (under 25MB)</span>
                        <span className="text-emerald-400 text-[10px] block">✓ Verified within limit</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomImage(null)}
                      className="text-slate-400 hover:text-red-400 p-2 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-700 hover:border-[#ff6600] rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-all bg-slate-900/50 hover:bg-slate-900">
                    <UploadCloud className="w-8 h-8 text-[#ff6600]" />
                    <span className="text-xs font-bold text-white font-mono">Click to choose image or drag &amp; drop</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Strict 25MB maximum limit per image file (PNG, JPG, JPEG, WEBP)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Job Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase text-slate-300 font-mono">
                  Describe what you need cleared or hauled *
                </label>
                <textarea
                  rows={4}
                  value={customDescription}
                  onChange={e => setCustomDescription(e.target.value)}
                  placeholder="E.g., Huge tree limb pile in backyard from storm, need chainsawing into trailer. Or: Old 10x12 metal shed needs torn down and hauled to the landfill..."
                  required
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs font-sans focus:outline-hidden focus:border-[#ff6600]"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase text-slate-400 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    placeholder="David Miller"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase text-slate-400 font-mono">
                    Mobile Phone (for Bid &amp; SMS) *
                  </label>
                  <input
                    type="tel"
                    value={customPhone}
                    onChange={e => setCustomPhone(e.target.value)}
                    placeholder="(479) 555-0199"
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase text-slate-400 font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={e => setCustomEmail(e.target.value)}
                    placeholder="your.name@gmail.com"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase text-slate-400 font-mono">
                    Service Address &amp; ZIP
                  </label>
                  <input
                    type="text"
                    value={customAddress}
                    onChange={e => setCustomAddress(e.target.value)}
                    placeholder="3412 Free Ferry Rd, Fort Smith, AR"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>
              </div>

              {/* Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ff6600] hover:bg-orange-600 disabled:opacity-50 text-slate-950 font-black uppercase py-3 rounded-xl font-mono text-xs tracking-wider cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Request...' : 'Submit Custom Job for Free Bid'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      {/* Receipt Modal */}
      <ReceiptModal 
        isOpen={!!selectedReceiptJob}
        onClose={() => setSelectedReceiptJob(null)}
        job={selectedReceiptJob}
      />

    </div>
  );
};
