import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

const Router = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'login':
    case 'signup':
      return <AuthPage />;
    case 'home':
      return <HomePage />;
    case 'brand':
      return <BrandPage />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'profile':
      return <ProfilePage />;
    default:
      return <AuthPage />;
  }
};

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;