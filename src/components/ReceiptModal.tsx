import React from 'react';
import { 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { DispatchJob } from '../lib/firebase';

const logoImg = '/assets/img/logoRVCC.png';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: DispatchJob | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  job
}) => {
  if (!isOpen || !job) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Receipt - ${job.ticketNumber} - River Valley Cleanup Crew</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #1a1a1a;
      background: #ffffff;
    }
    .receipt-box {
      max-width: 680px;
      margin: 0 auto;
      border: 2px solid #333;
      padding: 32px;
      border-radius: 8px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ff6600;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-title span { color: #ff6600; }
    .meta-text {
      font-size: 11px;
      color: #555;
      margin-top: 4px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: bold;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge-paid {
      background: #e6f4ea;
      color: #137333;
      border: 1px solid #137333;
    }
    .badge-pending {
      background: #fef7e0;
      color: #b06000;
      border: 1px solid #b06000;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .grid h4 {
      margin: 0 0 6px 0;
      font-size: 11px;
      text-transform: uppercase;
      color: #777;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    th, td {
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #f8f9fa;
      font-size: 11px;
      text-transform: uppercase;
      color: #555;
    }
    .total-row td {
      font-size: 16px;
      font-weight: bold;
      border-top: 2px solid #333;
      border-bottom: 2px solid #333;
    }
    .footer-note {
      text-align: center;
      font-size: 11px;
      color: #777;
      margin-top: 30px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="receipt-box">
    <div class="header">
      <div>
        <h1 class="brand-title">River Valley <span>Cleanup</span> Crew</h1>
        <div class="meta-text">Fort Smith, AR • Licensed Hauler #L-783 • Commercial Liability Insured</div>
        <div class="meta-text">Dispatch Phone: (479) 222-1311 • rvcc@c0dejunky.com</div>
      </div>
      <div style="text-align: right;">
        <div class="badge ${job.paymentStatus === 'paid' ? 'badge-paid' : 'badge-pending'}">
          ${job.paymentStatus === 'paid' ? '✓ Paid in Full' : 'Payment Due on Arrival'}
        </div>
        <div style="font-size: 12px; font-weight: bold; margin-top: 6px; font-family: monospace;">
          ${job.ticketNumber}
        </div>
      </div>
    </div>

    <div class="grid">
      <div>
        <h4>Customer Details</h4>
        <strong>${job.clientName}</strong><br />
        ${job.address}<br />
        Fort Smith / River Valley, AR ${job.zipCode}<br />
        Phone: ${job.clientPhone}<br />
        Email: ${job.clientEmail}
      </div>
      <div>
        <h4>Scheduled Service Window</h4>
        <strong>${job.selectedDate}</strong><br />
        Arrival Window: ${job.timeSlot === 'morning' ? '8:00 AM – 12:00 PM' : '12:00 PM – 4:00 PM'}<br />
        Haul Rig: ${job.haulType.toUpperCase()}<br />
        Issue Date: ${new Date().toLocaleDateString()}
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${job.haulType === 'trailer' ? '14ft Tandem Heavy Haul Rig & Crew' : job.haulType === 'truck' ? 'Standard Dodge Ram Truck Load' : 'Appliance Recycling Pickup'}</strong>
            <br />
            <span style="font-size: 11px; color: #666;">Includes transport, loading labor, broom-clean sweep, and Sebastian County Landfill tipping fees.</span>
          </td>
          <td style="text-align: right; font-weight: bold;">$${((job.priceTotal || 0) * 0.905).toFixed(2)}</td>
        </tr>
        <tr>
          <td>
            Arkansas State &amp; Sebastian County Local Tax (9.5%)
          </td>
          <td style="text-align: right;">$${((job.priceTotal || 0) * 0.095).toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td>Total Receipt Amount</td>
          <td style="text-align: right; color: #ff6600;">$${(job.priceTotal || 0).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <div style="font-size: 12px; color: #444; background: #fdf8f4; padding: 12px; border-radius: 6px; border: 1px solid #fed7aa; margin-bottom: 20px;">
      <strong>Payment Record:</strong> ${job.paymentStatus === 'paid' ? 'Paid electronically via Online Checkout / Card Authorization.' : 'Payment collected on arrival via Cash, Card, or Check.'}
    </div>

    ${job.specialNotes ? `
      <div style="font-size: 11px; color: #555; margin-bottom: 15px;">
        <strong>Customer / Dispatch Notes:</strong> ${job.specialNotes}
      </div>
    ` : ''}

    <div class="footer-note">
      Thank you for choosing River Valley Cleanup Crew! For service questions, rescheduling, or commercial account inquiries, please call our local office at <strong>(479) 222-1311</strong>.
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([receiptHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RVCC_Receipt_${job.ticketNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const taxAmount = (job.priceTotal || 0) * 0.095;
  const subtotalAmount = (job.priceTotal || 0) - taxAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#181818] border-2 border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl text-slate-100 overflow-hidden my-6">
        
        {/* Modal Top Actions */}
        <div className="px-5 py-3.5 bg-[#141414] border-b border-slate-800 flex items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff6600] text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
              Customer Receipt
            </span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {job.ticketNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold px-3 py-1.5 rounded border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#ff6600]" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-[#ff6600] hover:bg-orange-600 text-slate-950 text-xs font-mono font-black uppercase px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Copy</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div className="p-6 sm:p-8 bg-white text-slate-900 font-sans space-y-6 select-text print:p-0 print:m-0">
          
          {/* Official RVCC Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#ff6600] pb-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full border-2 border-[#ff6600] overflow-hidden bg-black p-0.5 shrink-0">
                <img src={logoImg} alt="RVCC Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-black font-display leading-none">
                  River Valley <span className="text-[#ff6600]">Cleanup</span> Crew
                </h2>
                <p className="text-[11px] text-slate-600 font-mono mt-1">
                  Fort Smith, AR • Licensed Hauler #L-783 • Commercial Liability Insured
                </p>
                <p className="text-[11px] text-slate-600 font-mono">
                  Hotline: (479) 222-1311 • rvcc@c0dejunky.com
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className={`inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase px-2.5 py-1 rounded border ${
                job.paymentStatus === 'paid' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {job.paymentStatus === 'paid' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>✓ Paid in Full</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Payment Due on Arrival</span>
                  </>
                )}
              </div>
              <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                Receipt #{job.ticketNumber}
              </div>
            </div>
          </div>

          {/* Customer & Scheduled Window Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Customer / Billed To:</span>
              <strong className="text-sm text-black block font-sans">{job.clientName}</strong>
              <span className="text-slate-600 block">{job.address}</span>
              <span className="text-slate-600 block">Fort Smith / River Valley, AR {job.zipCode}</span>
              <span className="text-slate-600 block mt-1">Phone: {job.clientPhone}</span>
              <span className="text-slate-600 block">Email: {job.clientEmail}</span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Service &amp; Window:</span>
              <strong className="text-sm text-black block font-sans">
                {job.selectedDate} ({job.timeSlot === 'morning' ? '8:00 AM – 12:00 PM' : '12:00 PM – 4:00 PM'})
              </strong>
              <span className="text-slate-600 block">Haul Type: <strong className="text-black uppercase">{job.haulType}</strong></span>
              <span className="text-slate-600 block">Date Issued: {new Date().toLocaleDateString()}</span>
              <span className="text-slate-600 block">Payment Method: {job.paymentTerms === 'stripe' ? 'Online Card Authorization' : 'Pay on Arrival'}</span>
            </div>
          </div>

          {/* Itemized Charges Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 font-mono text-[11px] font-black text-slate-700">
                  <th className="p-3">Service Description</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-3">
                    <strong className="text-black block text-sm font-sans">
                      {job.haulType === 'trailer' 
                        ? '14ft Tandem Heavy Haul Rig & Crew' 
                        : job.haulType === 'truck' 
                        ? 'Dodge Ram 2500 Truck Bed Debris Haul' 
                        : 'Heavy Appliance Removal & Scrap Service'}
                    </strong>
                    <span className="text-slate-600 text-[11px] block mt-0.5">
                      Includes 2-person crew loading, transit, broom-clean finish, and Sebastian County Landfill tipping fee.
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    ${subtotalAmount.toFixed(2)}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 text-slate-700">
                    Arkansas State &amp; Sebastian County Local Tax (9.5%)
                  </td>
                  <td className="p-3 text-right text-slate-700 font-medium">
                    ${taxAmount.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-slate-50 font-bold text-sm text-black">
                  <td className="p-3 text-slate-900 font-sans">
                    Total Invoice Amount
                  </td>
                  <td className="p-3 text-right text-[#ff6600] font-black text-base font-mono">
                    ${(job.priceTotal || 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Special Notes / Field Information */}
          {job.notes && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
              <span className="text-[10px] uppercase font-black text-slate-500 block mb-0.5">Manifest &amp; Crew Notes:</span>
              <p className="whitespace-pre-line text-slate-800">{job.notes}</p>
            </div>
          )}

          {/* Footer Notice */}
          <div className="pt-4 border-t border-slate-200 text-center font-mono text-[11px] text-slate-500 space-y-1">
            <p className="text-slate-700 font-bold">
              Thank you for trusting River Valley Cleanup Crew with your haul!
            </p>
            <p>
              For changes, questions, or emergency haul requests, call our local office at (479) 222-1311.
            </p>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-[#141414] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 no-print">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official River Valley Cleanup Crew Record</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white font-bold cursor-pointer underline"
          >
            Close Receipt
          </button>
        </div>

      </div>
    </div>
  );
};
