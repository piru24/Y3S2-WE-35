import React , {useEffect, useState} from "react";
import "../assets/styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "./Store";


const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const quantity = useSelector((state) => state.cart.quantity);

  //console.log(cart)

  const navigate = useNavigate();

const [role, setRole] = useState('');  
const dispatch = useDispatch();
const sendLogoutReq = async () => {
  try {
    const res = await axios.post("http://localhost:8090/User/logout", {}, { withCredentials: true });
    if (res.status === 200) {
      return res;
    }
    throw new Error("Unable To Logout. Please try again");
  } catch (err) {
    console.error("Logout failed:", err);
    // Optionally, redirect to login or show a message
  }
};

  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
    
  };

          useEffect(() => {
            const getProductById = () => {
              axios
              .get(`http://localhost:8090/User/profile`).then((res) => {
                setRole(res.data.user.role);
                console.log(res.data.user.role)
                //console.log(res.data);
              });
            };
            getProductById();
          }, [isLoggedIn]);
          console.log(role)
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <img src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png" alt="Logo" />
          <h1 className="header__title">AyurHerb Store</h1>
        </div>

        <nav className="header__nav">
          <ul className="header__list">
            {!isLoggedIn && (
              <>
                <li className="header__item">
                  <Link className="login" to="./login">
                    Login
                  </Link>
                </li>

                <li className="header__item">
                  <Link className="register" to="./signUp">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            
            <li className="header__item">
              {isLoggedIn && (
                <Link onClick={handleLogout} className="logout" to="./login">
                  Log Out
                </Link>
              )}
             
              <Link to="./cart">
                {isLoggedIn && role === 'buyer' &&(
                  <div>
                    <span className="badge bg-primary">{quantity}</span>
                    <i className="bi bi-cart-fill"></i>
                  </div>
                )}
              </Link>

              {isLoggedIn && role === 'buyer' && (
                <Link className="orderHistory" to="./getOrders">
                  Order History
                </Link>
              )}

              {/* <span>{isLoggedIn && role === 'buyer' && <Link to="./notify">Notifications</Link>}</span> */}

              <br />

              <span>{isLoggedIn && role === 'buyer' && <Link to="./profile">Profile</Link>}</span>

              {/* delivery person navigation */}

              {isLoggedIn && role === 'delivery' && (
                <>
                  {/* Delivery Person Profile */}
                  <span>
                    <Link to="./profile">
                    {/* <i className="bi bi-person-circle"></i> */} Profile </Link>
                  </span>
                  <br />
                </>
              )}

            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
