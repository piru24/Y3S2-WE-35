import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "./Store";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "./ui/Logo";
import NavItem from "./ui/NavItem";
import MobileMenu from "./MobileMenu";
import ConfirmationModal from "./authentication/ConfirmationModal";
import LoginModal from "./authentication/login";
import RegisterModal from "./authentication/register";
import { Link } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8090";

const NAV_CONFIG = {
  buyer: [
    { path: "/products", label: "Browse" },
    { path: "/cart", label: (qty) => `Cart (${qty})` },
    { path: "/getOrders", label: "Orders" },
    { path: "/profile", label: "Profile" },
  ],
  seller: [
    { path: "/seller/dashboard", label: "Dashboard" },
    { path: "/seller/products", label: "My Products" },
    { path: "/seller/orders", label: "Sales" },
    { path: "/profile", label: "Profile" },
  ],
  admin: [
    { path: "/admin/users", label: "Users" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/analytics", label: "Analytics" },
  ],
  delivery: [
    { path: "/profile", label: "Profile" },
    { path: "/assignedDeliveries", label: "Assigned Deliveries" },
  ],
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role: reduxRole } = useSelector((s) => s.auth);
  const cartQuantity = useSelector((s) => s.cart.quantity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(reduxRole || "");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch user role on login
  useEffect(() => {
    if (!isLoggedIn) return setUserRole("");
    
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/User/profile`, { 
          withCredentials: true 
        });
        
        // Add null checks and use optional chaining
        if (res.data?.user?.role) {
          setUserRole(res.data.user.role);
        } else {
          console.error("Invalid user data structure:", res.data);
          setUserRole("");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setUserRole("");
      }
    };
    
    getUserProfile();
  }, [isLoggedIn]);
  
  // Logout
  const sendLogoutReq = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/User/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        return res;
      }
      throw new Error("Unable to logout. Please try again.");
    } catch (err) {
      console.error("Logout failed:", err);
      throw err; // Ensure the error is propagated
    }
  };

  const handleLogout = async () => {
    try {
      await sendLogoutReq();
      dispatch(authActions.logout());
      localStorage.clear();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  const navItems =
    isLoggedIn && NAV_CONFIG[userRole]
      ? NAV_CONFIG[userRole].map((item) => ({
          path: item.path,
          label:
            typeof item.label === "function"
              ? item.label(cartQuantity)
              : item.label,
        }))
      : [];

  return (
    <header className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + Nav */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-2xl font-extrabold text-white tracking-wide">
              Food@Door
              </span>
            </Link>

            {isLoggedIn && (
              <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </nav>
            )}
          </div>

          {/* Right: Auth buttons + Mobile toggle */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {!isLoggedIn ? (
                <>
                  <NavItem
                    onClick={() => setShowLogin(true)}
                    className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
                  >
                    Log In
                  </NavItem>
                  <NavItem
                    onClick={() => setShowRegister(true)}
                    variant="primary"
                    className="bg-yellow-400 text-green-900 font-bold px-5 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
                  >
                    Sign Up
                  </NavItem>
                </>
              ) : (
                <NavItem
                  as="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
                >
                  Logout
                </NavItem>
              )}
            </div>
            <ConfirmationModal
              isOpen={showLogoutConfirm}
              onClose={() => setShowLogoutConfirm(false)}
              onConfirm={handleLogout}
              message="Are you sure you want to log out?"
            />

            <LoginModal
              isOpen={showLogin}
              onClose={() => setShowLogin(false)}
              onSuccess={() => setShowLogin(false)}
            />

            <RegisterModal
              isOpen={showRegister}
              onClose={() => setShowRegister(false)}
              onSuccess={() => setShowRegister(false)}
            />

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HiX className="h-7 w-7" />
              ) : (
                <HiMenu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        isAuthenticated={isLoggedIn}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
