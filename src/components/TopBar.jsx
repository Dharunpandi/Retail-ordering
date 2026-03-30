import React from 'react';
import { useApp } from '../context/AppContext';

const TopBar = ({ showCart = true, showProfile = true, centerBrand = null }) => {
  const { navigate, cartCount, cartBrandId, cart } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo Left */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-black">F</span>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">
            FeastZone
          </span>
        </button>

        {/* Center brand (for brand page) */}
        {centerBrand && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-2xl">{centerBrand.emoji}</span>
            <span className="font-bold text-gray-800 text-lg">{centerBrand.name}</span>
          </div>
        )}

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {showCart && (
            <button
              onClick={() => navigate('cart')}
              className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-50 flex items-center justify-center transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          )}
          {showProfile && (
            <button
              onClick={() => navigate('profile')}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow"
            >
              <span className="text-sm">👤</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;