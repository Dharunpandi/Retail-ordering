import React from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import { BRANDS } from '../data';

const CartPage = () => {
  const { cart, updateCartQty, cartTotal, cartBrandId, navigate } = useApp();

  const brand = BRANDS.find(b => b.id === cartBrandId);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar showCart={false} />
        <div className="flex flex-col items-center justify-center mt-32 px-4">
          <span className="text-7xl mb-4">🛒</span>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6 text-center">Add items from a restaurant to get started</p>
          <button
            onClick={() => navigate('home')}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:shadow-lg transition-all"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const deliveryFee = 40;
  const taxes = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar showCart={false} />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('home')} className="text-gray-400 hover:text-gray-600 text-xl">←</button>
          <div>
            <h1 className="text-xl font-black text-gray-900">Your Cart</h1>
            {brand && (
              <p className="text-sm text-gray-400">
                <span>{brand.emoji}</span> {brand.name}
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow divide-y divide-gray-50">
          {cart.map(item => (
            <div key={item.itemId} className="flex items-center gap-4 p-4">
              <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                <p className="text-orange-600 font-bold text-sm">₹{item.price} × {item.qty}</p>
                <p className="text-xs text-gray-400">Subtotal: ₹{item.price * item.qty}</p>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <button
                  onClick={() => updateCartQty(item.itemId, -1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 font-bold text-lg transition-colors"
                >−</button>
                <span className="w-6 text-center text-sm font-bold text-gray-800">{item.qty}</span>
                <button
                  onClick={() => updateCartQty(item.itemId, 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 font-bold text-lg transition-colors"
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill summary */}
        <div className="mt-4 bg-white rounded-2xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-3">Bill Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST & Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-2 mt-2">
              <span>Total Amount</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('brand', { brandId: cartBrandId })}
            className="py-3.5 rounded-xl border-2 border-orange-500 text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors"
          >
            + Need to Order More
          </button>
          <button
            onClick={() => navigate('checkout')}
            className="py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm hover:shadow-lg transition-all"
          >
            Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;