import React, { useState, useEffect } from 'react';

const OTPModal = ({ title, subtitle, onVerify, onClose, correctOTP = '123456' }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp === correctOTP) {
      onVerify();
    } else {
      setError('Invalid OTP. Try 123456 (demo)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📨</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">{title}</h2>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          <p className="text-xs text-orange-600 mt-1 font-semibold">Demo OTP: 123456</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
            placeholder="Enter 6-digit OTP"
            className="w-full text-center text-2xl tracking-[0.5em] font-bold border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-400 transition-colors"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            Verify OTP
          </button>

          <div className="text-center text-sm text-gray-500">
            {timer > 0 ? (
              <span>Resend in <span className="font-bold text-orange-500">{timer}s</span></span>
            ) : (
              <button className="text-orange-500 font-bold hover:underline" onClick={() => setTimer(60)}>
                Resend OTP
              </button>
            )}
          </div>

          {onClose && (
            <button onClick={onClose} className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPModal;