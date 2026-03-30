import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import OTPModal from '../components/OTPModal';

const ProfilePage = () => {
  const { user, setUser, navigate, orderHistory, setOrderHistory, cart, addToCart, clearCart } = useApp();

  const [form, setForm] = useState({
    name: user?.name || '',
    dob: user?.dob || '',
    email: user?.email || '',
    address: user?.address || '',
    pincode: user?.pincode || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
  });

  const [editMode, setEditMode] = useState(false);
  const [emailChange, setEmailChange] = useState('');
  const [showEmailOTP, setShowEmailOTP] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteOTP, setShowDeleteOTP] = useState(false);
  const [msg, setMsg] = useState('');

  const saveBasicInfo = () => {
    setUser({ ...user, name: form.name, dob: form.dob, address: form.address, pincode: form.pincode, city: form.city, state: form.state, country: form.country });
    setEditMode(false);
    setMsg('✅ Profile updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleEmailChange = () => {
    if (!emailChange) return;
    setShowEmailOTP(true);
  };

  const handleEmailVerified = () => {
    setUser({ ...user, email: emailChange });
    setForm({ ...form, email: emailChange });
    setEmailChange('');
    setShowEmailOTP(false);
    setMsg('✅ Email updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDeleteAccount = () => {
    if (!deletePassword) return;
    setShowDeleteOTP(true);
  };

  const handleDeleteVerified = () => {
    setShowDeleteOTP(false);
    clearCart();
    setUser(null);
    setOrderHistory([]);
    navigate('login');
  };

  const handleReorder = (order) => {
    clearCart();
    order.items.forEach(item => {
      addToCart(item.brandId, item.brandName, item.brandLogo, { id: item.itemId, name: item.name, price: item.price, image: item.image }, item.qty);
    });
    navigate('cart');
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:border-orange-400 transition-all text-gray-800 text-sm";
  const inputReadClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-700 text-sm";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {showEmailOTP && (
        <OTPModal
          title="Verify New Email"
          subtitle={`OTP sent to ${emailChange}`}
          onVerify={handleEmailVerified}
          onClose={() => setShowEmailOTP(false)}
        />
      )}
      {showDeleteOTP && (
        <OTPModal
          title="Confirm Account Deletion"
          subtitle="This action is irreversible. OTP sent to your email."
          onVerify={handleDeleteVerified}
          onClose={() => setShowDeleteOTP(false)}
        />
      )}

      {/* Top brand header */}
      <div className="bg-white border-b border-gray-100 shadow-sm py-4 text-center">
        <div className="flex justify-between items-center px-4 max-w-2xl mx-auto">
          <button onClick={() => navigate('home')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md mb-1">
              <span className="text-white text-lg font-black">F</span>
            </div>
            <span className="text-sm font-black text-gray-800">FeastZone</span>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Profile photo */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-4xl font-black shadow-lg mb-2">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>

        {msg && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-medium text-center">
            {msg}
          </div>
        )}

        {/* Basic info */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Personal Info</h3>
            <button
              onClick={() => editMode ? saveBasicInfo() : setEditMode(true)}
              className={`text-sm font-bold px-4 py-1.5 rounded-xl transition-colors ${editMode ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}
            >
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelClass}>Full Name</label>
              {editMode
                ? <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                : <div className={inputReadClass}>{form.name}</div>
              }
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              {editMode
                ? <input type="date" className={inputClass} value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
                : <div className={inputReadClass}>{form.dob || '—'}</div>
              }
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <div className={inputReadClass}>{user?.gender || '—'}</div>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Address</label>
              {editMode
                ? <input className={inputClass} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                : <div className={inputReadClass}>{form.address || '—'}</div>
              }
            </div>
            <div>
              <label className={labelClass}>Pincode</label>
              {editMode
                ? <input className={inputClass} value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
                : <div className={inputReadClass}>{form.pincode || '—'}</div>
              }
            </div>
            <div>
              <label className={labelClass}>City</label>
              {editMode
                ? <input className={inputClass} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                : <div className={inputReadClass}>{form.city || '—'}</div>
              }
            </div>
            <div>
              <label className={labelClass}>State</label>
              {editMode
                ? <input className={inputClass} value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
                : <div className={inputReadClass}>{form.state || '—'}</div>
              }
            </div>
            <div>
              <label className={labelClass}>Country</label>
              {editMode
                ? <input className={inputClass} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                : <div className={inputReadClass}>{form.country || '—'}</div>
              }
            </div>
          </div>
        </div>

        {/* Email change */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-3">Email Address</h3>
          <p className="text-sm text-gray-500 mb-3">Current: <span className="font-semibold text-gray-800">{user?.email}</span></p>
          <p className="text-xs text-gray-400 mb-2">Changing email requires OTP verification</p>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-orange-400"
              placeholder="New email address"
              value={emailChange}
              onChange={e => setEmailChange(e.target.value)}
            />
            <button
              onClick={handleEmailChange}
              className="px-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              Change
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">To change password, use Forgot Password on the login page.</p>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-3">Order History</h3>
          {orderHistory.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orderHistory.map(order => (
                <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <span className="font-black text-orange-600">₹{order.total}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {order.items.map(i => `${i.image} ${i.name} ×${i.qty}`).join(', ')}
                  </div>
                  <button
                    onClick={() => handleReorder(order)}
                    className="w-full py-2 rounded-xl bg-orange-50 text-orange-600 font-bold text-xs hover:bg-orange-100 transition-colors"
                  >
                    🔁 Reorder
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={() => { setUser(null); clearCart(); navigate('login'); }}
          className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
        >
          Logout
        </button>

        {/* Delete account */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h3 className="font-bold text-red-600 mb-2">Delete Account</h3>
          <p className="text-xs text-red-400 mb-3">This will permanently delete all your data, orders, and account.</p>
          {!showDeleteModal ? (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
            >
              Delete My Account
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border-2 border-red-200 bg-white text-sm focus:outline-none focus:border-red-400"
                placeholder="Enter your password to confirm"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm"
                >Cancel</button>
                <button
                  onClick={handleDeleteAccount}
                  className="py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                >Confirm & Send OTP</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;