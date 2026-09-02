import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building, 
  ArrowRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function SignupPage({ lang }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState('traveler'); // 'traveler' | 'host'
  const [formData, setFormData] = useState({
    name: '',
    phone: '+251 9',
    email: '',
    password: '',
    city: 'Addis Ababa',
    businessName: '',
    licenseNumber: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await register({
        ...formData,
        role
      });
      addToast(
        lang === 'am'
          ? `እንኳን ደህና መጡ ${newUser.name}! መለያዎ በተሳካ ሁኔታ ተፈጥሯል።`
          : `Welcome to GuzoTribe, ${newUser.name}! Account registered successfully.`,
        'success'
      );
      if (role === 'host') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-12 pb-24 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      
      <div className="max-w-lg w-full space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Join GuzoTribe</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'አዲስ መለያ ይፍጠሩ' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-stone-500">
            {lang === 'am'
              ? 'የኢትዮጵያ ቀዳሚውን የማህበረሰብ ጉዞ ማዕከል ይቀላቀሉ'
              : 'Join thousands of adventurers, hikers, and verified Ethiopian tour organizers'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/90 shadow-xl space-y-6">
          
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 text-center">
              Choose Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('traveler')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  role === 'traveler'
                    ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/40'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Users className={`w-5 h-5 mb-2 ${role === 'traveler' ? 'text-amber-300' : 'text-emerald-700'}`} />
                <div>
                  <strong className="block text-xs sm:text-sm font-bold">Traveler / Hiker</strong>
                  <span className={`text-[10px] ${role === 'traveler' ? 'text-emerald-200' : 'text-stone-500'}`}>
                    Book & compare trips
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('host')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  role === 'host'
                    ? 'bg-amber-950 text-white border-amber-800 shadow-md ring-2 ring-amber-500/40'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Building className={`w-5 h-5 mb-2 ${role === 'host' ? 'text-amber-300' : 'text-amber-600'}`} />
                <div>
                  <strong className="block text-xs sm:text-sm font-bold">Tour Operator / Club</strong>
                  <span className={`text-[10px] ${role === 'host' ? 'text-amber-200' : 'text-stone-500'}`}>
                    List departures & get paid
                  </span>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Full Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Abebe Bikila"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Phone Number (Telebirr) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 9..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Host-Specific Fields */}
            {role === 'host' && (
              <div className="space-y-4 pt-2 border-t border-stone-100 animate-slide-up">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Tour Club / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Simien Highland Trekkers"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Ministry of Tourism License #</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="e.g. MOT-ET-2026-XXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{role === 'host' ? 'Register Tour Club' : 'Create Traveler Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Login Link */}
          <div className="text-center pt-2 text-xs text-stone-500">
            <span>Already have an account? </span>
            <Link to="/login" className="text-emerald-700 font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
