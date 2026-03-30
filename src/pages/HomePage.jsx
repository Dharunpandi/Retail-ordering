import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/TopBar';
import { BRANDS } from '../data';

const HomePage = () => {
  const { navigate, user } = useApp();
  const [search, setSearch] = useState('');

  const filtered = BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      {/* Hero greeting */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 px-4 pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-orange-200 text-sm font-medium mb-1">Good {getGreeting()},</p>
          <h2 className="text-white text-3xl font-black mb-1">{user?.name?.split(' ')[0] || 'Foodie'} 👋</h2>
          <p className="text-orange-100 text-sm">What are you craving today?</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg flex items-center px-4 py-3 gap-3">
          <span className="text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
          )}
        </div>
      </div>

      {/* Brands grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8 pb-10">
        <h3 className="text-gray-800 font-black text-lg mb-4">
          {search ? `Results for "${search}"` : 'All Restaurants'}
          <span className="text-gray-400 font-normal text-sm ml-2">({filtered.length})</span>
        </h3>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">🍽️</span>
            <p className="text-gray-400 mt-3">No restaurants found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(brand => (
              <BrandCard key={brand.id} brand={brand} onClick={() => navigate('brand', { brandId: brand.id })} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BrandCard = ({ brand, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition-all text-left overflow-hidden group"
    >
      {/* Brand color banner */}
      <div
        className="h-24 flex items-center justify-center text-5xl"
        style={{ backgroundColor: brand.color + '15' }}
      >
        <span className="group-hover:scale-110 transition-transform duration-200">{brand.emoji}</span>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-gray-900 text-base">{brand.name}</h4>
            <p className="text-gray-400 text-xs mt-0.5">{brand.tag}</p>
          </div>
          <span
            className="text-xs font-bold px-2 py-1 rounded-lg text-white"
            style={{ backgroundColor: brand.color }}
          >
            {brand.rating}★
          </span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <span>⏱</span>
          <span>{brand.time}</span>
        </div>
      </div>
    </button>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
};

export default HomePage;