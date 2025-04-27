import React from "react";

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Profile from "./components/Profile/profile";
import Header from "./components/header";
import Admin from "./components/home_Pages/Admin";
import Products from "./components/home_Pages/Products";
import Productinfo from "./components/ProductInfo/productinfo";
import Cart from "./components/ProductInfo/cart";
import OrderHistory from "./components/ProductInfo/orderHistory";
import ViewOrders from "./components/ProductInfo/viewOrders";
import RateForm from "./components/rate&Review/RateForm";
import AddProducts from "./components/products/addProduct";
import UpdateProducts from "./components/products/updateProduct";
import UpdateACC from "./components/Profile/updateProfile";
import UpdatePWD from "./components/Profile/updatePWD";
import AddPayment from "./components/payment/dummyPayment";
import RateFormSeller from "./components/rate&Review/RateFormSeller";
import { useSelector } from "react-redux";
import Home from "./components/home_Pages/Home";


const App = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role); 
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/signUp" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    {isLoggedIn && <Route path="/profile" element={<Profile />} />}
    {isLoggedIn && role === "seller" && (
      <Route path="/addProduct" element={<AddProducts />} />
    )}
    {isLoggedIn && role === "seller" && (
      <Route path="/updateProduct/:id" element={<UpdateProducts />} />
    )}
    {isLoggedIn && role === "buyer" && (
      <Route path="/cart" element={<Cart />} />
    )}
    {isLoggedIn && role === "buyer" && (
      <Route path="/getOrders" element={<OrderHistory />} />
    )}
    {isLoggedIn && role === "admin" && (
      <Route path="/admin" element={<Admin />} />
    )}
    {isLoggedIn && role === "admin" && (
      <Route path="/admin/viewOrders" element={<ViewOrders />} />
    )}
    {isLoggedIn && (
      <Route path="/rateProduct/:id" element={<RateForm />} />
    )}
    {isLoggedIn && (
      <Route path="/rateSeller/:sellerName/:id" element={<RateFormSeller />} />
    )}
    {isLoggedIn && (
      <Route path="/updateUser/:id" element={<UpdateACC />} />
    )}
    {isLoggedIn && (
      <Route path="/updatePWD/:id" element={<UpdatePWD />} />
    )}
    {isLoggedIn && (
      <Route path="/dummyPayment" element={<AddPayment />} />
    )}
  </Routes>
</BrowserRouter>
  );
}

export default App;