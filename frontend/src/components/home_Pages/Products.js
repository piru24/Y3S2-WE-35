import React, { useEffect, useState } from "react";
import "../../assets/styles/product.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;


const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        axios.get("http://localhost:8070/products/getProducts", { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setProducts(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const searchProduct = async (e) => {
    e.preventDefault();

    const searchValue = e.target.value;
    try {
      const { data } = await axios.get(
        `http://localhost:8070/products/search/?search=${searchValue}`
      );

      console.log(data);
      setProducts(data.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home container">
      <h1>Products page</h1>

      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={searchProduct}
          name="search"
        />
      </form>

      <div className="home-products container">
      <div className="product-tiles">
      {products.map((product, key) => (
          
          <div className="product-tile" key={key}>
            
            <img src={product.image}/>
            <p>Name:{product.name}</p>
            <p>
  Restaurant: {product.sellerName} <br />
  <span style={{color: product.sellerAvailable ? "green" : "red"}}>
    {product.sellerAvailable ? "Available" : "Not Available"}
  </span>
</p>

            <button
              className="btn btn-info p-1 me-2"
              onClick={() => navigate(`/getProduct/${product._id}`)}
            >
              INFO
            </button>
            <button
              className="btn btn-success p-1 me-2"
              onClick={() => navigate(`/rateBuyer/${product._id}`)}
            >
              ⭐⭐⭐
            </button>

            <br />
            <br />
          </div>
        ))}
      </div>
        
      </div>
    </div>
  );
};

export default Products;
