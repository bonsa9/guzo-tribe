import React, { useState } from 'react';
import { 
  Smartphone, 
  Send, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function LoginPage({ lang }) {
  const navigate = useNavigate();
  const { loginWithPhone, loginWithTelegram, loginWithEmail, switchDemoRole } = useAuth();
  const { addToast } = useToast();

  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'telegram' | 'email'

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('+251 911 482910');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Helper to redirect immediately to the respective dashboard
  const redirectByRole = (user) => {
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'host') {
      navigate('/organizer/dashboard');
    } else {
      navigate('/profile');
    }
  };

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      addToast('Please enter a valid Ethiopian phone number', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCode('8492'); // Pre-fill mock OTP for seamless testing
      addToast(`SMS OTP sent to ${phoneNumber} (Test Code: 8492) 📱`, 'info');
    }, 800);
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = loginWithPhone(phoneNumber, otpCode);
      addToast(`Welcome back, ${user.name}! 🎒`, 'success');
      redirectByRole(user);
    }, 600);
  };

  // Handle Telegram Login
  const handleTelegramLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = loginWithTelegram({
        first_name: 'Dawit',
        last_name: 'Kebede',
        username: 'dawit_hiker'
      });
      addToast(`Logged in via Telegram as ${user.name}! ✈️`, 'success');
      redirectByRole(user);
    }, 600);
  };

  // Handle Email Login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = loginWithEmail(email, password);
      addToast(`Welcome back, ${user.name}!`, 'success');
      redirectByRole(user);
    }, 600);
  };

  const handleQuickDemoLogin = (roleKey) => {
    switchDemoRole(roleKey);
    addToast(`Switched session to Demo ${roleKey.toUpperCase()} account!`, 'success');
    if (roleKey === 'admin') navigate('/admin');
    else if (roleKey === 'host') navigate('/organizer/dashboard');
    else navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-12 pb-24 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>GuzoTribe Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif">
            {lang === 'am' ? 'ወደ መለያዎ ይግቡ' : 'Sign in to GuzoTribe'}
          </h1>
          <p className="text-xs text-stone-500">
            {lang === 'am'
              ? 'ወደ እርስዎ ዳሽቦርድ፣ ትኬቶች እና የጎን ዝርዝር ለመግባት'
              : 'Sign in to access your personal dashboard, e-tickets, and sidebar controls'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-7 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xl space-y-6">
          
          {/* Method Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => { setAuthMethod('phone'); setOtpSent(false); }}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                authMethod === 'phone' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>SMS OTP</span>
            </button>

            <button
              onClick={() => setAuthMethod('telegram')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                authMethod === 'telegram' ? 'bg-white text-sky-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Telegram</span>
            </button>

            <button
              onClick={() => setAuthMethod('email')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                authMethod === 'email' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>Email</span>
            </button>
          </div>

          {/* METHOD 1: Phone + OTP (Ethio Telecom / Telebirr SMS) */}
          {authMethod === 'phone' && (
            <div className="space-y-4 animate-slide-up">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'am' ? 'የስልክ ቁጥር (ቴሌብር / ኢትዮ ቴሌኮም)' : 'Ethiopian Phone Number'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+251 9..."
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      We'll send a 4-digit verification code via SMS
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? 'Sending SMS...' : 'Send Verification OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-900 text-center">
                    <span className="block text-[11px]">Verification code sent to</span>
                    <strong className="font-mono text-xs">{phoneNumber}</strong>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1 text-center">
                      Enter 4-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      autoFocus
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="8 4 9 2"
                      className="w-full text-center tracking-widest text-2xl font-mono font-black py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold transition-all cursor-pointer"
                    >
                      Change Number
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>Verify & Open Dashboard</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: Telegram 1-Click Login */}
          {authMethod === 'telegram' && (
            <div className="space-y-4 text-center py-2 animate-slide-up">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto border border-sky-200">
                <Send className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-stone-900">Telegram Instant Login</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  One-tap login synced with your `@GuzoTribeBot` tickets and alerts.
                </p>
              </div>
              <button
                onClick={handleTelegramLogin}
                disabled={isLoading}
                className="w-full py-3 bg-[#24A1DE] hover:bg-[#1E88E5] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Continue with Telegram</span>
              </button>
            </div>
          )}

          {/* METHOD 3: Email & Password */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs animate-slide-up">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>Sign in & Open Dashboard</span>
              </button>
            </form>
          )}

          {/* 1-Click Demo Account Quick Switcher */}
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 text-center">
              ⚡ 1-Click Demo Dashboards
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
              <button
                onClick={() => handleQuickDemoLogin('traveler')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span>🎒 Traveler</span>
                <span className="text-[9px] font-normal text-emerald-700">Bethlehem</span>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('host')}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 transition-all cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span>🏔️ Tour Host</span>
                <span className="text-[9px] font-normal text-amber-800">Addis Hikers</span>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition-all cursor-pointer flex flex-col items-center gap-0.5"
              >
                <span>🛡️ Platform Admin</span>
                <span className="text-[9px] font-normal text-stone-300">Bole Ops</span>
              </button>
            </div>
          </div>

          {/* Sign up redirect */}
          <div className="text-center pt-2 text-xs text-stone-500">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="text-emerald-700 font-bold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
