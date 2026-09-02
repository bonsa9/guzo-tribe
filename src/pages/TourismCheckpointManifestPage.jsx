import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Bus, 
  UserCheck, 
  FileCheck
} from 'lucide-react';
import { tripsData } from '../data/tripsData';
import GuzoLogo from '../components/GuzoLogo';

export default function TourismCheckpointManifestPage({ lang: _lang, currency: _currency }) {
  const { tripId } = useParams();

  // Find trip or default to Wenchi
  const trip = tripsData.find((t) => t.id === tripId) || tripsData[0];

  const handlePrint = () => {
    window.print();
  };

  // Mock verified 28-seat passenger manifest for this Coaster dispatch
  const manifestPassengers = [
    { seat: '1A', name: 'Amanuel Tadesse', phone: '+251 911 482 109', emergency: '+251 911 111 222 (Brother)', pickup: 'Meskel Square', docRef: 'ETH-ID-849201', tlbRef: 'TLB-984210948' },
    { seat: '1B', name: 'Bethlehem Haile', phone: '+251 922 837 410', emergency: '+251 922 000 111 (Mother)', pickup: 'Meskel Square', docRef: 'ETH-ID-391048', tlbRef: 'TLB-984210948' },
    { seat: '1C', name: 'Yared Melaku', phone: '+251 933 192 847', emergency: '+251 933 999 888 (Sister)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-209481', tlbRef: 'TLB-749104821' },
    { seat: '2A', name: 'Daniel Kebede', phone: '+251 911 829 301', emergency: '+251 911 777 666 (Father)', pickup: 'Mexico Square', docRef: 'ETH-ID-910482', tlbRef: 'CBE-398104812' },
    { seat: '2B', name: 'Sara Girma', phone: '+251 912 345 678', emergency: '+251 912 333 444 (Spouse)', pickup: 'Mexico Square', docRef: 'ETH-ID-781920', tlbRef: 'CBE-398104812' },
    { seat: '2C', name: 'Michael Assefa', phone: '+251 944 881 293', emergency: '+251 944 222 111 (Friend)', pickup: 'Megenagna / CMC', docRef: 'ETH-ID-601928', tlbRef: 'TLB-891049281' },
    { seat: '2D', name: 'Helen Tefera', phone: '+251 955 192 837', emergency: '+251 955 888 777 (Mother)', pickup: 'Megenagna / CMC', docRef: 'ETH-ID-491029', tlbRef: 'TLB-891049281' },
    { seat: '3A', name: 'Robel Worku', phone: '+251 910 293 847', emergency: '+251 910 555 444 (Brother)', pickup: 'Meskel Square', docRef: 'ETH-ID-182940', tlbRef: 'TLB-109284918' },
    { seat: '3B', name: 'Rahel Desta', phone: '+251 911 938 271', emergency: '+251 911 666 555 (Sister)', pickup: 'Meskel Square', docRef: 'ETH-ID-920194', tlbRef: 'TLB-109284918' },
    { seat: '3C', name: 'Brook Alemu', phone: '+251 922 471 920', emergency: '+251 922 444 333 (Uncle)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-381920', tlbRef: 'TLB-648102948' },
    { seat: '3D', name: 'Lydia Solomon', phone: '+251 933 819 203', emergency: '+251 933 111 000 (Mother)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-710294', tlbRef: 'TLB-648102948' },
    { seat: '4A', name: 'Bereket Negash', phone: '+251 911 738 192', emergency: '+251 911 999 000 (Father)', pickup: 'Mexico Square', docRef: 'ETH-ID-830192', tlbRef: 'TLB-920194812' },
    { seat: '4B', name: 'Fikirte Wolde', phone: '+251 922 619 384', emergency: '+251 922 777 888 (Sister)', pickup: 'Mexico Square', docRef: 'ETH-ID-619284', tlbRef: 'TLB-920194812' },
    { seat: '4C', name: 'Yonas Kassaye', phone: '+251 944 102 938', emergency: '+251 944 555 666 (Brother)', pickup: 'Meskel Square', docRef: 'ETH-ID-501928', tlbRef: 'CBE-819204918' },
    { seat: '4D', name: 'Tigist Ayele', phone: '+251 955 938 102', emergency: '+251 955 333 222 (Spouse)', pickup: 'Meskel Square', docRef: 'ETH-ID-401928', tlbRef: 'CBE-819204918' },
    { seat: '5A', name: 'Kidus Yohannes', phone: '+251 911 638 192', emergency: '+251 911 222 333 (Mother)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-301928', tlbRef: 'TLB-719204918' },
    { seat: '5B', name: 'Hanna Berhanu', phone: '+251 922 519 283', emergency: '+251 922 111 999 (Brother)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-201928', tlbRef: 'TLB-719204918' },
    { seat: '5C', name: 'Samuel Belay', phone: '+251 933 401 928', emergency: '+251 933 888 777 (Father)', pickup: 'Megenagna / CMC', docRef: 'ETH-ID-101928', tlbRef: 'TLB-619204918' },
    { seat: '5D', name: 'Marta Getachew', phone: '+251 944 391 029', emergency: '+251 944 666 555 (Sister)', pickup: 'Megenagna / CMC', docRef: 'ETH-ID-991029', tlbRef: 'TLB-619204918' },
    { seat: '6A', name: 'Henok Tilahun', phone: '+251 911 281 930', emergency: '+251 911 444 555 (Father)', pickup: 'Meskel Square', docRef: 'ETH-ID-881029', tlbRef: 'TLB-519204918' },
    { seat: '6B', name: 'Meron Sisay', phone: '+251 922 192 837', emergency: '+251 922 333 222 (Mother)', pickup: 'Meskel Square', docRef: 'ETH-ID-771029', tlbRef: 'TLB-519204918' },
    { seat: '6C', name: 'Abel Teshome', phone: '+251 933 091 827', emergency: '+251 933 222 111 (Brother)', pickup: 'Mexico Square', docRef: 'ETH-ID-661029', tlbRef: 'TLB-419204918' },
    { seat: '6D', name: 'Tsion Hailemariam', phone: '+251 944 981 726', emergency: '+251 944 111 000 (Spouse)', pickup: 'Mexico Square', docRef: 'ETH-ID-551029', tlbRef: 'TLB-419204918' },
    { seat: '7A', name: 'Natnael Demissie', phone: '+251 911 871 625', emergency: '+251 911 000 999 (Father)', pickup: 'Meskel Square', docRef: 'ETH-ID-441029', tlbRef: 'TLB-319204918' },
    { seat: '7B', name: 'Blair C. (Tourist)', phone: '+1 415 555 0192', emergency: '+1 415 555 9999 (USA Contact)', pickup: 'Meskel Square', docRef: 'USA-PASS-819204', tlbRef: 'CHAPA-USD-9102' },
    { seat: '7C', name: 'Eskinder Nega', phone: '+251 922 761 524', emergency: '+251 922 888 777 (Sister)', pickup: 'Meskel Square', docRef: 'ETH-ID-331029', tlbRef: 'TLB-219204918' },
    { seat: '7D', name: 'Lukas M. (Tourist)', phone: '+49 170 555 1234', emergency: '+49 170 555 9999 (Germany)', pickup: 'Bole Medhanialem', docRef: 'DEU-PASS-102948', tlbRef: 'CHAPA-USD-9103' },
    { seat: '7E', name: 'Genet Kassa', phone: '+251 933 651 423', emergency: '+251 933 777 666 (Mother)', pickup: 'Bole Medhanialem', docRef: 'ETH-ID-221029', tlbRef: 'TLB-119204918' }
  ];

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation & Print Action Bar (Hidden when printing) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trips</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Manifest (PDF)</span>
            </button>
          </div>
        </div>

        {/* The Official Ministry of Tourism Document Sheet */}
        <div className="bg-white rounded-3xl border border-stone-300 shadow-xl p-8 sm:p-12 print:border-none print:shadow-none print:p-0 space-y-6 text-stone-900 font-sans">
          
          {/* Document Header with Federal Emblem & MoT Title */}
          <div className="border-b-2 border-stone-900 pb-6 text-center space-y-2">
            <div className="flex items-center justify-between mb-2">
              <GuzoLogo size="sm" showText={false} />
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                  Official MoT Dispatch ID
                </span>
                <span className="text-xs font-black font-mono text-stone-900">
                  ET-MOT-MNF-2026-0941
                </span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-stone-900 font-serif">
              FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA
            </h1>
            <h2 className="text-base sm:text-lg font-extrabold text-emerald-900 uppercase">
              MINISTRY OF TOURISM • የቱሪዝም ሚኒስቴር
            </h2>
            <p className="text-xs font-bold text-stone-600 uppercase tracking-widest">
              OFFICIAL HIGHWAY CHECKPOINT PASSENGER MANIFEST & VEHICLE DISPATCH CLEARANCE
            </p>
          </div>

          {/* Expedition & Vehicle Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block text-[10px] uppercase font-bold">Trip Title & Destination</span>
              <strong className="text-stone-900 font-bold block mt-0.5">{trip.title}</strong>
              <span className="text-stone-500">{trip.destination || 'Wenchi, Oromia'}</span>
            </div>

            <div>
              <span className="text-stone-500 block text-[10px] uppercase font-bold">Departure Date & Time</span>
              <strong className="text-stone-900 font-bold block mt-0.5">{trip.nextDeparture}</strong>
              <span className="text-emerald-800 font-mono font-bold">06:00 AM Sharp</span>
            </div>

            <div>
              <span className="text-stone-500 block text-[10px] uppercase font-bold">Dispatched Vehicle</span>
              <strong className="text-stone-900 font-bold block mt-0.5">Toyota Coaster (28 Seats)</strong>
              <span className="text-stone-700 font-mono">Plate: 3 - A.A 84920</span>
            </div>

            <div>
              <span className="text-stone-500 block text-[10px] uppercase font-bold">Certified Tour Operator</span>
              <strong className="text-stone-900 font-bold block mt-0.5">{trip.organizer}</strong>
              <span className="text-emerald-800 font-mono">License: MoT-LIC-2024-889</span>
            </div>
          </div>

          {/* Captain & Guide Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-3 rounded-xl bg-stone-100/60 border border-stone-200">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <span className="text-stone-500 text-[10px] uppercase font-bold block">Designated Bus Captain (Driver):</span>
                <strong className="text-stone-800 font-bold">Mulugeta Bekele</strong> — License: Commercial Heavy Passenger Grade 4
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <span className="text-stone-500 text-[10px] uppercase font-bold block">Certified Lead Guide & Scout:</span>
                <strong className="text-stone-800 font-bold">Dawit Mengistu</strong> — Phone: +251 911 234 567
              </div>
            </div>
          </div>

          {/* Full 28-Seat Passenger Roster Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-stone-800">
                Verified Passenger Roster (28/28 Seats Confirmed & Escrow Cleared)
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                Full Capacity Dispatched
              </span>
            </div>

            <div className="overflow-x-auto border border-stone-300 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 border-b border-stone-300 text-stone-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2 text-center font-mono">Seat</th>
                    <th className="p-2">Passenger Full Name</th>
                    <th className="p-2">Phone Number</th>
                    <th className="p-2">Emergency Contact</th>
                    <th className="p-2">Addis Pickup Hub</th>
                    <th className="p-2 font-mono">ID / Passport</th>
                    <th className="p-2 font-mono text-right">Escrow Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-[11px]">
                  {manifestPassengers.map((p) => (
                    <tr key={p.seat} className="hover:bg-stone-50/80">
                      <td className="p-2 text-center font-mono font-bold text-emerald-800 bg-stone-50/50">
                        {p.seat}
                      </td>
                      <td className="p-2 font-bold text-stone-900">
                        {p.name}
                      </td>
                      <td className="p-2 font-mono text-stone-600">
                        {p.phone}
                      </td>
                      <td className="p-2 text-stone-600">
                        {p.emergency}
                      </td>
                      <td className="p-2 text-stone-700">
                        {p.pickup}
                      </td>
                      <td className="p-2 font-mono text-stone-500">
                        {p.docRef}
                      </td>
                      <td className="p-2 font-mono text-right text-emerald-700 font-semibold">
                        {p.tlbRef}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicle Safety & Mandatory Checkpoint Clearance Sheet */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider block text-[11px]">
              Vehicle Safety & Checkpoint Equipment Clearance:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-stone-700">First Aid Kit [VERIFIED]</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-stone-700">2kg Fire Extinguisher [PASS]</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-stone-700">Spare Tire & Jack [CHECKED]</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-stone-700">National Park Permit [CLEARED]</span>
              </div>
            </div>
          </div>

          {/* Official Signatures & Regional Police Clearance Stamp Block */}
          <div className="pt-6 border-t-2 border-stone-900 grid grid-cols-3 gap-6 text-xs text-center">
            
            <div className="space-y-8">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block">
                Tour Operator Authorized Signature
              </span>
              <div className="border-b border-stone-400 pb-1 font-serif italic text-stone-600">
                Dawit Mengistu, Tour Lead
              </div>
              <span className="text-[10px] text-stone-400 block font-mono">Date: Sep 6, 2026</span>
            </div>

            <div className="space-y-8">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block">
                Designated Driver Confirmation
              </span>
              <div className="border-b border-stone-400 pb-1 font-serif italic text-stone-600">
                Mulugeta Bekele, Captain
              </div>
              <span className="text-[10px] text-stone-400 block font-mono">Vehicle Passed Inspection</span>
            </div>

            <div className="space-y-2 border-2 border-dashed border-stone-400 rounded-2xl p-4 min-h-[90px] flex flex-col items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                Tourism Police Highway Checkpoint Stamp
              </span>
              <span className="text-[9px] text-stone-400 font-mono">
                [ Ambo / Debre Berhan Outpost ]
              </span>
            </div>

          </div>

          {/* Security & SOS Hotline Footer */}
          <div className="border-t border-stone-200 pt-4 flex flex-wrap items-center justify-between text-[10px] text-stone-500 font-mono">
            <span>Verified GuzoTribe Secure Booking Hash: #GZ-MOT-991048-2026</span>
            <span>24/7 Federal Tourism SOS Hotline: 8333 / 991</span>
          </div>

        </div>

      </div>
    </div>
  );
}
