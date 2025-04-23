import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/cart.css?v1";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom'

const KEY =
  "pk_test_51Q5kUrKs4ldJ96PWJsuoDCG9WwlLqb5rS6eBXsrdEGMMifKnRIrabnhta1MvPcabDAZEsuf3lK4V3I01d7eUcvWp00o91jsc6s";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const [deliveryType, setDeliveryType] = useState();

  const [address, setAddress] = useState("");
  const [cheapDelivery, setCheapDelivery] = useState();
  const [fastDelivery, setFastDelivery] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [finalTotal, setFinalTotal] = useState();
  const [cheapDeliveryTime, setCheapDeliveryTime] = useState();
  const [fastDeliveryTime, setFastDeliveryTime] = useState();
  const [visibility, setVisibility] = useState(false);

  const getDeliveryPrices = async () => {
    console.log("function called");
    const randomWeight = (Math.random() * 4.9) + 1.0;

    const deliveryData = {
      "shipfrom": "Colombo",
      "shipto": address,
      "weight": randomWeight
    };

    const deliveryResult = await axios.post("http://localhost:8300/delivery/rate", deliveryData);
    console.log(deliveryResult.data);
    setVisibility("block");

    setCheapDelivery(deliveryResult.data.cheapDelivery.rate /10);
    setFastDelivery(deliveryResult.data.fastDelivery.rate / 10);
    setCheapDeliveryTime(deliveryResult.data.cheapDelivery.duration);
    setFastDeliveryTime(deliveryResult.data.fastDelivery.duration);
  };

  const handleOptionChange = (event) => {
    setDeliveryType(event.target.value);
    setFinalTotal(cart.withCommision + deliveryCharge);
    setDeliveryCharge(deliveryType == "fast" ? cheapDelivery: fastDelivery);
  };

  const navigate = useNavigate();

  useEffect(()=>{
    console.log(address);
    console.log(deliveryCharge);
    setFinalTotal(cart.withCommision);
    console.log(finalTotal);
  },[cheapDelivery, fastDelivery, address, deliveryCharge, finalTotal])

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8020/Order/payment", {
          tokenId: stripeToken.id,

          amount: cart.total,
        });

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      products: cart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
      })),

      amount: cart.withCommision,

      status: "pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:8020/Order/addOrder",
        orderData
      );
      console.log(orderData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Shopping Cart</h1><br></br>
        <table>
          <th>
            <center>Product</center>
          </th>
          <th>
            <center>Quantity</center>
          </th>
          <th>
            <center>Price</center>
          </th>

          {cart.products.map((product) => (
            <tbody>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                {product.quantity}*{product.price}
              </td>
            </tbody>
          ))}
          <tfoot>
            <br />
            <br />
            <br />

            <div class="input-group mb-3">
              <input type="text" class="form-input" placeholder="Address" aria-label="Address" 
                onChange={(e)=>setAddress(e.target.value)}
              />
              <button type="button" id="button-addon2" onClick={getDeliveryPrices} >Get Prices for Destination</button>
            </div>

            <div style={{ visibility: visibility ? "visible" : "hidden" }}>            
            <div class="form-check" >
              <input class="form-check-input" type="radio" name="delivery" id="fastDelivery" value="fast"
                checked={deliveryType === "fast"}
                onChange={handleOptionChange}
               />
              <label class="form-check-label" for="fastDelivery">
                Fast Delivery: Rs.{fastDelivery}, {fastDeliveryTime} hrs
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="delivery" id="cheapDelivery" value="cheap" 
                checked={deliveryType === "cheap"}
                onChange={handleOptionChange}
              />
              <label class="form-check-label" for="cheapDelivery">
                Cheap Delivery: Rs.{cheapDelivery}, {cheapDeliveryTime} days
              </label>
            </div>
            </div>
        <br />
            <h2>Order Summary</h2>
            <br></br>
            <tr>
              <th className="cart-total">Cart Total:</th>
              <td className="cart-total">
                <strong>{cart.total}</strong>
              </td>

              <th className="cart-total">With Commission:</th>
              <td className="cart-total">
                <strong>{cart.withCommision}</strong>
              </td>

              <th className="cart-total">Delivery Charges:</th>
              <td className="cart-total">
                <strong>{deliveryCharge}</strong>
              </td>

              <th className="cart-total">Total:</th>
              <td className="cart-total">
                <strong>{finalTotal}</strong>
              </td>

              <th className="cart-total">Item Count:</th>
              <td className="cart-total">
                <strong>{cart.products.length}</strong>
              </td>
            </tr>
          </tfoot>
        </table>

        <br />
        <br />

        <StripeCheckout
          name="engada kada Shop"
          image
          src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png"
          description={`Your total is Rs. ${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <button type="submit">CheckOut with Strip</button>
        </StripeCheckout>
      
{/* <button type="submit">CheckOut with Stripe</button> */}
<button type="submit" onClick={()=>navigate('/dummyPayment')}>CheckOut with Dummy</button>

</form>
    </div>
  );
};

export default Cart;


