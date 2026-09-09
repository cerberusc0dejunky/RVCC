import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  Search, 
  DollarSign, 
  Truck, 
  Calendar, 
  ExternalLink, 
  AlertCircle,
  X,
  Maximize2
} from 'lucide-react';
import { CustomBidRequest } from '../lib/firebase';

interface HusbandBiddingDeskProps {
  customBids: CustomBidRequest[];
  onRefresh: () => Promise<void>;
  onSendBid: (bidId: string, data: {
    amount: number;
    equipment: string;
    dateEstimate: string;
    notes: string;
  }) => Promise<void>;
}

export const HusbandBiddingDesk: React.FC<HusbandBiddingDeskProps> = ({
  customBids,
  onRefresh,
  onSendBid
}) => {
  const [selectedBid, setSelectedBid] = useState<CustomBidRequest | null>(
    customBids.length > 0 ? customBids[0] : null
  );
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'accepted'>('all');
  const [search, setSearch] = useState<string>('');

  // Bid form inputs
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidEquipment, setBidEquipment] = useState<string>('White Dodge Ram + 14ft Tandem Trailer');
  const [bidDate, setBidDate] = useState<string>('This Thursday Morning (8:00 AM – 12:00 PM)');
  const [bidNotes, setBidNotes] = useState<string>(
    'Includes loading labor, transport, broom sweep finish, and Sebastian County Landfill tipping fees.'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const handleSelectBid = (bid: CustomBidRequest) => {
    setSelectedBid(bid);
    setBidAmount(bid.bidAmount ? bid.bidAmount.toString() : '');
    setBidEquipment(bid.bidEquipment || 'White Dodge Ram + 14ft Tandem Trailer');
    setBidDate(bid.bidDateEstimate || 'This Thursday Morning (8:00 AM – 12:00 PM)');
    setBidNotes(
      bid.bidNotes ||
      'Includes loading labor, transport, broom sweep finish, and Sebastian County Landfill tipping fees.'
    );
  };

  const filteredBids = customBids.filter(b => {
    const q = search.toLowerCase();
    const matchesSearch = 
      b.clientName.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.bidNumber.toLowerCase().includes(q) ||
      b.clientPhone.includes(q) ||
      b.description.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filter === 'pending') return b.status === 'pending_bid';
    if (filter === 'submitted') return b.status === 'bid_submitted';
    if (filter === 'accepted') return b.status === 'accepted';
    return true;
  });

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBid) return;

    const amountNum = parseFloat(bidAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid dollar amount for the bid.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSendBid(selectedBid.id, {
        amount: amountNum,
        equipment: bidEquipment,
        dateEstimate: bidDate,
        notes: bidNotes
      });
      setSelectedBid(prev => prev ? {
        ...prev,
        status: 'bid_submitted',
        bidAmount: amountNum,
        bidEquipment,
        bidDateEstimate: bidDate,
        bidNotes
      } : null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingCount = customBids.filter(b => b.status === 'pending_bid').length;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      
      {/* Left Column: Custom Job Requests List */}
      <div className="flex-1 space-y-4">
        
        {/* Search & Status Filters */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search custom job by name, BID #, notes..."
              className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#ff6600] font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#ff6600] text-black font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All ({customBids.length})
            </button>

            <button
              type="button"
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'pending'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <span>Pending Review</span>
              {pendingCount > 0 && (
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono font-black">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFilter('submitted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filter === 'submitted'
                  ? 'bg-[#ff6600] text-black font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Bid Sent
            </button>

            <button
              type="button"
              onClick={() => setFilter('accepted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                filter === 'accepted'
                  ? 'bg-emerald-600 text-white font-black'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              Accepted
            </button>
          </div>
        </div>

        {/* Requests Cards List */}
        {filteredBids.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-300 p-10 text-center text-slate-500 font-mono text-xs space-y-2">
            <Sparkles className="w-8 h-8 mx-auto text-slate-400" />
            <p className="font-bold text-slate-800">No custom job requests match this filter.</p>
            <p>Customers can upload photos &amp; describe jobs from their user account page.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBids.map(bid => {
              const isSelected = selectedBid?.id === bid.id;
              return (
                <div
                  key={bid.id}
                  onClick={() => handleSelectBid(bid)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all shadow-xs flex flex-col sm:flex-row gap-4 ${
                    isSelected 
                      ? 'border-[#ff6600] ring-2 ring-[#ff6600]/30 bg-orange-50/20' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {/* Photo Thumbnail */}
                  <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shrink-0 relative group">
                    {bid.imageUrl ? (
                      <img 
                        src={bid.imageUrl} 
                        alt="Custom job" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400 text-[10px] font-mono">
                        No image
                      </div>
                    )}
                    {bid.imageUrl && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnlargedImage(bid.imageUrl || null);
                        }}
                        title="Click to enlarge"
                        className="absolute bottom-1 right-1 bg-black/70 text-white p-1 rounded hover:bg-black transition-colors"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Info block */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {bid.bidNumber}
                        </span>
                        <span className="text-xs text-slate-500 font-mono font-medium">
                          • {new Date(bid.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        {bid.status === 'pending_bid' && (
                          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                            Needs Quote
                          </span>
                        )}
                        {bid.status === 'bid_submitted' && (
                          <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                            Bid Sent: ${(bid.bidAmount || 0).toFixed(2)}
                          </span>
                        )}
                        {bid.status === 'accepted' && (
                          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                            ✓ Customer Accepted!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm font-bold text-slate-900">
                      {bid.clientName}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ff6600]" />
                        <span>{bid.address}, AR {bid.zipCode}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{bid.clientPhone}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-sans line-clamp-2 bg-slate-50 p-2 rounded border border-slate-200">
                      "{bid.description}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Right Column: Husband's Direct Bidding Desk Form */}
      <div className="w-full lg:w-96 space-y-4 h-fit sticky top-24">
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs text-left">
          
          {selectedBid ? (
            <div className="space-y-4">
              
              {/* Header */}
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                    Bidding On Job Request
                  </span>
                  <h3 className="text-base font-black text-[#d95500] font-mono uppercase">
                    {selectedBid.bidNumber}
                  </h3>
                </div>
                {selectedBid.bidAmount && (
                  <span className="text-base font-black text-emerald-700 font-mono bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-lg">
                    ${selectedBid.bidAmount.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Customer Contact Card */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-500 block">Customer</span>
                <p className="text-sm font-black text-slate-900 font-sans">{selectedBid.clientName}</p>
                <p className="text-slate-600">{selectedBid.address}, AR {selectedBid.zipCode}</p>
                
                <div className="flex items-center gap-2 pt-1.5">
                  <a
                    href={`tel:${selectedBid.clientPhone}`}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call ({selectedBid.clientPhone})</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${selectedBid.address}, AR ${selectedBid.zipCode}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg"
                    title="Open in Maps"
                  >
                    <MapPin className="w-4 h-4 text-[#ff6600]" />
                  </a>
                </div>
              </div>

              {/* Uploaded Image Preview & Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-500 font-mono block">
                  Customer Description &amp; Photo
                </span>
                
                {selectedBid.imageUrl && (
                  <div 
                    onClick={() => setEnlargedImage(selectedBid.imageUrl || null)}
                    className="rounded-lg overflow-hidden border border-slate-300 h-40 bg-slate-900 cursor-pointer relative group"
                  >
                    <img 
                      src={selectedBid.imageUrl} 
                      alt="Job detail" 
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity text-white text-xs font-mono font-bold">
                      <Maximize2 className="w-4 h-4 mr-1" /> Click to Enlarge
                    </div>
                  </div>
                )}

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 font-sans whitespace-pre-line max-h-32 overflow-y-auto">
                  {selectedBid.description}
                </div>
              </div>

              {/* Contractor / Husband's Bidding Form */}
              <form onSubmit={handleSubmitBid} className="space-y-3 pt-2 border-t border-slate-200">
                <span className="text-xs font-black uppercase text-slate-900 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ff6600]" />
                  <span>Your Official Price Bid</span>
                </span>

                {/* Dollar Amount */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">
                    Total Quoted Price ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                      placeholder="350.00"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-sm pl-8 pr-3 py-2 rounded-lg focus:outline-hidden focus:border-[#ff6600]"
                    />
                  </div>
                </div>

                {/* Equipment & Rig */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">
                    Equipment / Rig to Dispatch
                  </label>
                  <select
                    value={bidEquipment}
                    onChange={e => setBidEquipment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 font-mono text-xs px-2.5 py-2 rounded-lg focus:outline-hidden focus:border-[#ff6600]"
                  >
                    <option value="White Dodge Ram + 14ft Tandem Trailer">White Dodge Ram + 14ft Tandem Trailer</option>
                    <option value="Standard Dodge Ram Truck Bed Haul">Standard Dodge Ram Truck Bed Haul</option>
                    <option value="Heavy Equipment & Chainsaw Rig">Heavy Equipment &amp; Chainsaw Rig</option>
                    <option value="Trailer + Bobcat / Demolition Tools">Trailer + Bobcat / Demolition Tools</option>
                    <option value="Appliance Scrap Rig">Appliance Scrap Rig</option>
                  </select>
                </div>

                {/* Target Arrival Date */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">
                    Proposed Service Timeframe
                  </label>
                  <input
                    type="text"
                    value={bidDate}
                    onChange={e => setBidDate(e.target.value)}
                    placeholder="This Thursday Morning (8AM - 12PM)"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 font-mono text-xs px-2.5 py-2 rounded-lg focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>

                {/* Contractor Notes to Customer */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">
                    Notes for Customer (Included Services)
                  </label>
                  <textarea
                    rows={3}
                    value={bidNotes}
                    onChange={e => setBidNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 font-sans text-xs p-2.5 rounded-lg focus:outline-hidden focus:border-[#ff6600]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff6600] hover:bg-orange-600 disabled:opacity-50 text-slate-950 font-black uppercase py-2.5 rounded-lg font-mono text-xs tracking-wider cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Bid to Customer Account'}</span>
                </button>

                <p className="text-[10px] font-mono text-slate-500 text-center">
                  Customer will see this bid on their account page and can 1-click accept.
                </p>

              </form>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 font-mono text-xs space-y-2">
              <Truck className="w-8 h-8 mx-auto text-slate-300" />
              <p>Select any custom request on the left to review photos, enter your price quote, and transmit your bid directly.</p>
            </div>
          )}

        </div>
      </div>

      {/* Image Enlargement Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            <button
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={enlargedImage} 
              alt="Enlarged job" 
              className="max-w-full max-h-[85vh] object-contain" 
            />
          </div>
        </div>
      )}

    </div>
  );
};
