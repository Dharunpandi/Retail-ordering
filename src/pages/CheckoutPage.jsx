import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import OTPModal from '../components/OTPModal';
import { COUPONS } from '../data';

const CheckoutPage = () => {
  const { user, cart, cartTotal, clearCart, navigate, setOrderHistory, orderHistory } = useApp();

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    landmark: '',
    pincode: user?.pincode || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
  });

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otpNotif, setOtpNotif] = useState(false);

  const deliveryFee = 40;
  const taxes = Math.round(cartTotal * 0.05);
  const discountAmt = Math.round((cartTotal + deliveryFee + taxes) * (discount / 100));
  const grandTotal = cartTotal + deliveryFee + taxes - discountAmt;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      setCouponMsg(`✅ "${code}" applied! ${COUPONS[code]}% off`);
    } else {
      setDiscount(0);
      setCouponMsg('❌ Invalid coupon code');
    }
  };

  const handleConfirmOrder = () => {
    setOtpNotif(true);
    setTimeout(() => {
      setOtpNotif(false);
      setShowOTP(true);
    }, 2000);
  };

  const handleOrderVerified = () => {
    setShowOTP(false);
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: grandTotal,
    };
    setOrderHistory(prev => [order, ...prev]);
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('home');
    }, 2500);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:border-orange-400 transition-all text-gray-800 text-sm";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar showCart={false} />

      {/* OTP sent notification */}
      {otpNotif && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm animate-bounce">
          📨 OTP sent to your email!
        </div>
      )}

      {/* Order success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-500">Redirecting to home...</p>
          </div>
        </div>
      )}

      {showOTP && (
        <OTPModal
          title="Confirm Your Order"
          subtitle={`OTP sent to ${address.email}`}
          onVerify={handleOrderVerified}
          onClose={() => setShowOTP(false)}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('cart')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
          <h1 className="text-xl font-black text-gray-900">Checkout</h1>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Order Items</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.itemId} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {item.image} {item.name} <span className="text-gray-400">×{item.qty}</span>
                </span>
                <span className="font-semibold text-gray-800">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl shadow p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Delivery Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelClass}>Full Name</label>
              <input className={inputClass} value={address.name}
                onChange={e => setAddress({ ...address, name: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} value={address.phone}
                onChange={e => setAddress({ ...address, phone: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} value={address.email}
                onChange={e => setAddress({ ...address, email: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Address</label>
              <input className={inputClass} value={address.address}
                onChange={e => setAddress({ ...address, address: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Landmark (optional)</label>
              <input className={inputClass} placeholder="Near bus stand, opposite mall..."
                value={address.landmark}
                onChange={e => setAddress({ ...address, landmark: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Pincode</label>
              <input className={inputClass} value={address.pincode}
                onChange={e => setAddress({ ...address, pincode: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input className={inputClass} value={address.city}
                onChange={e => setAddress({ ...address, city: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input className={inputClass} value={address.state}
                onChange={e => setAddress({ ...address, state: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input className={inputClass} value={address.country}
                onChange={e => setAddress({ ...address, country: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Bill */}
        <div className="bg-white rounded-2xl shadow p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span><span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span><span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST & Taxes (5%)</span><span>₹{taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount ({discount}%)</span><span>−₹{discountAmt}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-2 mt-2">
              <span>Grand Total</span><span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="bg-white rounded-2xl shadow p-5 mb-4">
          <h3 className="font-bold text-gray-800 mb-2">Coupon Code</h3>
          <p className="text-xs text-gray-400 mb-3">Try: SAVE10, TASTY20, FEAST15, WELCOME30</p>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:border-orange-400 text-sm uppercase font-bold tracking-wider"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={e => { setCoupon(e.target.value); setCouponMsg(''); }}
            />
            <button
              onClick={applyCoupon}
              className="px-5 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              Apply
            </button>
          </div>
          {couponMsg && <p className="text-sm mt-2 font-medium text-gray-600">{couponMsg}</p>}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('cart')}
            className="py-3.5 rounded-xl border-2 border-red-400 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
          >
            🗑 Delete Order
          </button>
          <button
            onClick={handleConfirmOrder}
            className="py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm hover:shadow-lg transition-all"
          >
            Confirm Order →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;