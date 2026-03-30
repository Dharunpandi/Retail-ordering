import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import { BRANDS, MENU } from '../data';

const BrandPage = () => {
  const { pageParams, navigate, addToCart, cart, cartCount, cartBrandId } = useApp();
  const brand = BRANDS.find(b => b.id === pageParams.brandId);
  const menu = MENU[pageParams.brandId] || [];

  // Local qty selectors per item
  const [qtys, setQtys] = useState(() => Object.fromEntries(menu.map(i => [i.id, 0])));

  if (!brand) return null;

  const getCartQtyForItem = (itemId) => {
    const inCart = cart.find(c => c.itemId === itemId && c.brandId === brand.id);
    return inCart ? inCart.qty : 0;
  };

  const handleAdd = (item) => {
    const qty = qtys[item.id];
    if (qty > 0) {
      addToCart(brand.id, brand.name, brand.emoji, item, qty);
      setQtys(prev => ({ ...prev, [item.id]: 0 }));
    }
  };

  const changeQty = (itemId, delta) => {
    setQtys(prev => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) + delta) }));
  };

  const hasCart = cartCount > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      {/* Brand hero */}
      <div
        className="relative py-10 text-center"
        style={{ background: `linear-gradient(135deg, ${brand.color}22, ${brand.accent}22)` }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl">{brand.emoji}</span>
          <h1 className="text-2xl font-black text-gray-900">{brand.name}</h1>
          <span className="text-xs bg-white rounded-full px-3 py-1 text-gray-500 shadow-sm">{brand.tag}</span>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span style={{ color: brand.color }} className="font-bold">{brand.rating}★</span>
            <span>•</span>
            <span>⏱ {brand.time}</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
        <h2 className="text-lg font-black text-gray-800 mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menu.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              brand={brand}
              qty={qtys[item.id]}
              cartQty={getCartQtyForItem(item.id)}
              onIncrease={() => changeQty(item.id, 1)}
              onDecrease={() => changeQty(item.id, -1)}
              onAdd={() => handleAdd(item)}
            />
          ))}
        </div>
      </div>

      {/* Floating cart button */}
      {hasCart && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => navigate('cart')}
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-2xl hover:shadow-red-300 hover:scale-105 transition-all text-sm"
          >
            <span className="bg-white/20 rounded-lg px-2 py-0.5 text-xs font-bold">{cartCount}</span>
            View Cart
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};

const FoodCard = ({ item, brand, qty, cartQty, onIncrease, onDecrease, onAdd }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${hovered ? 'shadow-xl scale-[1.04] ring-2 ring-orange-200' : 'shadow hover:shadow-md'}`}
    >
      {/* Food image area */}
      <div
        className="h-28 flex items-center justify-center text-5xl"
        style={{ backgroundColor: brand.color + '12' }}
      >
        <span className={`transition-transform duration-200 ${hovered ? 'scale-125' : 'scale-100'}`}>
          {item.image}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
          <span className="text-orange-600 font-black text-sm ml-2 whitespace-nowrap">₹{item.price}</span>
        </div>
        <p className="text-gray-400 text-xs mb-2">{item.desc}</p>

        <div className={`transition-all duration-200 ${hovered ? 'opacity-100 max-h-40' : 'opacity-100 max-h-40'}`}>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>Available: <span className="font-semibold text-gray-600">{item.available}</span></span>
            {cartQty > 0 && (
              <span className="text-green-600 font-semibold">In cart: {cartQty}</span>
            )}
          </div>

          {/* Qty selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={onDecrease}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold text-lg transition-colors"
              >−</button>
              <span className="w-6 text-center text-sm font-bold text-gray-800">{qty}</span>
              <button
                onClick={onIncrease}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold text-lg transition-colors"
              >+</button>
            </div>
            <button
              onClick={onAdd}
              disabled={qty === 0}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={qty > 0 ? { backgroundColor: brand.color, color: 'white' } : { backgroundColor: '#f3f4f6', color: '#9ca3af' }}
            >
              {qty > 0 ? 'Add to Cart' : 'Select Qty'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;