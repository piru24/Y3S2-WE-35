
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from './Store';
import { HiMenu, HiX } from 'react-icons/hi';
import Logo from './ui/Logo';
import NavItem from './ui/NavItem';
import MobileMenu from './MobileMenu';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8090';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_CONFIG = {
    buyer: [
      { path: '/products', label: 'Browse' },
      { path: '/cart', label: `Cart (${cartQuantity})` },
      { path: '/orders', label: 'Orders' }
    ],
    seller: [
      { path: '/seller/dashboard', label: 'Dashboard' },
      { path: '/seller/products', label: 'My Products' },
      { path: '/seller/orders', label: 'Sales' }
    ],
    admin: [
      { path: '/admin/users', label: 'Users' },
      { path: '/admin/orders', label: 'Orders' },
      { path: '/admin/analytics', label: 'Analytics' }
    ]
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/User/logout`, null, {
        withCredentials: true,
        headers: { 'CSRF-Token': document.cookie.split('=')[1] }
      });
      
      dispatch(authActions.logout());
      localStorage.clear();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Logo />
            <div className="hidden md:flex md:space-x-8 ml-10">
              {isLoggedIn && NAV_CONFIG[role]?.map((item) => (
                <NavItem key={item.path} to={item.path}>
                  {item.label}
                </NavItem>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <NavItem to="/login">Sign In</NavItem>
                  <NavItem to="/signup" variant="primary">
                    Sign Up
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem as="button" onClick={handleLogout}>
                    Logout
                  </NavItem>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={isLoggedIn ? NAV_CONFIG[role] : []}
        isAuthenticated={isLoggedIn}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
