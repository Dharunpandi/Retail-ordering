import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('login');
  const [pageParams, setPageParams] = useState({});
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // [{brandId, brandName, brandLogo, itemId, name, price, image, qty}]
  const [cartBrandId, setCartBrandId] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  const addToCart = (brandId, brandName, brandLogo, item, qty) => {
    setCartBrandId(brandId);
    setCart(prev => {
      const existing = prev.find(c => c.itemId === item.id && c.brandId === brandId);
      if (existing) {
        return prev.map(c => c.itemId === item.id && c.brandId === brandId
          ? { ...c, qty: c.qty + qty }
          : c
        );
      }
      return [...prev, { brandId, brandName, brandLogo, itemId: item.id, name: item.name, price: item.price, image: item.image, qty }];
    });
  };

  const updateCartQty = (itemId, delta) => {
    setCart(prev => {
      const updated = prev.map(c => c.itemId === itemId ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
        .filter(c => c.qty > 0);
      if (updated.length === 0) setCartBrandId(null);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartBrandId(null);
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <AppContext.Provider value={{
      currentPage, pageParams, navigate,
      user, setUser,
      cart, addToCart, updateCartQty, clearCart, cartTotal, cartCount, cartBrandId,
      orderHistory, setOrderHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);