import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import OTPModal from '../components/OTPModal';

const AuthPage = () => {
  const { navigate, setUser } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showOTP, setShowOTP] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Signup state
  const [signupForm, setSignupForm] = useState({
    name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '',
    phone: '', address: '', pincode: '', city: '', state: '', country: ''
  });
  const [signupError, setSignupError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill all fields.');
      return;
    }
    // Demo: any valid email/pass works
    const mockUser = {
      name: 'Demo User',
      email: loginForm.email,
      phone: '9876543210',
      dob: '1995-06-15',
      gender: 'Male',
      address: '123 Main Street',
      pincode: '641001',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
      photo: null
    };
    setUser(mockUser);
    navigate('home');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const f = signupForm;
    if (!f.name || !f.dob || !f.gender || !f.email || !f.password || !f.confirmPassword || !f.phone || !f.address || !f.pincode || !f.city || !f.state || !f.country) {
      setSignupError('Please fill all fields.');
      return;
    }
    if (f.password !== f.confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    if (f.password.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    setPendingUser({ ...f });
    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    setShowOTP(false);
    setMode('login');
    setSignupForm({
      name: '', dob: '', gender: '', email: '', password: '', confirmPassword: '',
      phone: '', address: '', pincode: '', city: '', state: '', country: ''
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-gray-800 placeholder-gray-400 text-sm";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col">
      {showOTP && (
        <OTPModal
          title="Verify Your Account"
          subtitle={`OTP sent to ${pendingUser?.email}`}
          onVerify={handleOTPVerified}
          onClose={() => setShowOTP(false)}
        />
      )}

      {/* Top Logo */}
      <div className="flex flex-col items-center pt-10 pb-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl mb-3">
          <span className="text-white text-4xl font-black">F</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">FeastZone</h1>
        <p className="text-gray-400 text-sm mt-1">Your favourite brands, delivered fast</p>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 pb-10">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setMode('login'); setLoginError(''); }}
              className={`flex-1 py-4 font-bold text-sm transition-all ${mode === 'login' ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('signup'); setSignupError(''); }}
              className={`flex-1 py-4 font-bold text-sm transition-all ${mode === 'signup' ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6">
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" className={inputClass} placeholder="you@example.com"
                    value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" className={inputClass} placeholder="Your password"
                    value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
                </div>
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <button type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all">
                  Login →
                </button>
                <p className="text-center text-sm text-gray-400">
                  New here?{' '}
                  <button type="button" onClick={() => setMode('signup')} className="text-orange-500 font-bold hover:underline">
                    Create an account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={labelClass}>Full Name</label>
                    <input className={inputClass} placeholder="John Doe"
                      value={signupForm.name} onChange={e => setSignupForm({ ...signupForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input type="date" className={inputClass}
                      value={signupForm.dob} onChange={e => setSignupForm({ ...signupForm, dob: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Gender</label>
                    <select className={inputClass} value={signupForm.gender} onChange={e => setSignupForm({ ...signupForm, gender: e.target.value })}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Email Address</label>
                    <input type="email" className={inputClass} placeholder="you@example.com"
                      value={signupForm.email} onChange={e => setSignupForm({ ...signupForm, email: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <input type="password" className={inputClass} placeholder="Min 6 chars"
                      value={signupForm.password} onChange={e => setSignupForm({ ...signupForm, password: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <input type="password" className={inputClass} placeholder="Repeat password"
                      value={signupForm.confirmPassword} onChange={e => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" className={inputClass} placeholder="10-digit mobile number"
                      value={signupForm.phone} onChange={e => setSignupForm({ ...signupForm, phone: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Address</label>
                    <input className={inputClass} placeholder="House no, Street, Area"
                      value={signupForm.address} onChange={e => setSignupForm({ ...signupForm, address: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Pincode</label>
                    <input className={inputClass} placeholder="600001"
                      value={signupForm.pincode} onChange={e => setSignupForm({ ...signupForm, pincode: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input className={inputClass} placeholder="Chennai"
                      value={signupForm.city} onChange={e => setSignupForm({ ...signupForm, city: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <input className={inputClass} placeholder="Tamil Nadu"
                      value={signupForm.state} onChange={e => setSignupForm({ ...signupForm, state: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input className={inputClass} placeholder="India"
                      value={signupForm.country} onChange={e => setSignupForm({ ...signupForm, country: e.target.value })} />
                  </div>
                </div>
                {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
                <button type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all">
                  Sign Up & Verify →
                </button>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-orange-500 font-bold hover:underline">
                    Login here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;