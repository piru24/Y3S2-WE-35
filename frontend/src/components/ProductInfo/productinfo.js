import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";
import { addProduct } from "../Store";
import { useDispatch } from "react-redux";

import "../../assets/styles/Productinfo.css";

const Productinfo = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/products/getProduct/${id}`
        );
        setProduct(response.data.product);
        console.log(response.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddtoCart = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <div className="thu">
      <p>image {product.image}</p>
      <p>Name : {product.name}</p>
      <p>Brand : {product.brand}</p>
      <p>Price : {product.price}</p>
      <p>Weight : {product.weight}g</p>
      <p>{product.sellerName}</p>
      <button 
        className='btn btn-info p-1 me-2 btn-small-width' 
        onClick={()=>navigate(`/rateSeller/${product.sellerName}/${product.sellerId}`)}>
          Rate This seller
      </button>

      <div className="amount-container">
        <button className="remove-button" onClick={() => handleQuantity("dec")}>
          -
        </button>
        <span className="amount">{quantity}</span>
        <button className="add-button" onClick={() => handleQuantity("inc")}>
          +
        </button>
      </div>
      <button className="btn btn-success p-1 me-2" onClick={handleAddtoCart}>
        ADD TO CART🛒
      </button>
    </div>
  );
};

export default Productinfo;
