import React, { useState, useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom'
import '../../assets/styles/profile.css'
import ViewOrders from '../ProductInfo/viewOrders';
axios.defaults.withCredentials = true;

const Profile = () =>{

  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const handleUpdate = (productId) => {
    navigate(`/updateProduct/${productId}`);
  };
  
  const handleViewOrders = () => {
    navigate('/viewOrders'); 
  };

  const navigate = useNavigate();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8090/User/profile", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const sendProductRequest = async (sellerId) => {
    const res = await axios
      .get(`http://localhost:8070/products/${sellerId}/products`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };



  useEffect(()=>{
    sendRequest().then((data)=>{setUser(data.user)
    sendProductRequest(data.user._id).then((data)=>setProducts(data))
  })}, [])

  const handleDeleteAcc = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete your account?",
      icon: "warning",
      dangerMode: true
    }).then((willDelete)=>{
      if(willDelete){
        swal({
          title: "Your account is being deleted",
          icon: "info",
          buttons: false,
          timer: 2000
        });
        
        axios.delete("http://localhost:8090/User/deleteUser")
          .then(() => {
            swal({
              title: "Your account has been deleted",
              icon: "success",
              buttons: false,
              timer: 2000
            }).then(() => {
              setTimeout(() => {
                window.location.href = "/login";
              }, 1500); // navigate to login page after 2 seconds
            });
          })
          .catch((error) => {
            console.log(error);
            swal({
              title: "An error occurred while deleting your account",
              icon: "error",
              buttons: false,
              timer: 2000
            });
          });
      }else{
        swal({
          title: "Your account is saved",
          buttons: false,
          timer: 2000
        });
      }
    });
  }

  const handleDelete = (product_id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this Product?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Product is deleted", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        axios.delete(
          `http://localhost:8070/products/deleteProduct/${product_id}`
        );

        console.log(product_id);

        const newProductlist = products.filter(
          (product) => product._id !== product_id
        );

        setProducts(newProductlist);
      } else {
        swal({
          text: "Your Products is saved!",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>{user &&(<div>
      <h1>Name:{user.name}</h1>
      <h1>Mobile:{user.mobile}</h1>
      <h1>E-mail:{user.email}</h1>
      <h1>Address:{user.address}</h1>
      <h1>I am a {user.role}</h1>
      </div>)}
      <br/>
      
{user.role === 'seller' && (
  <button
    className="btn btn-danger btn-small-width float-end"
    onClick={handleViewOrders}
  >
    View Orders
  </button>
)}

<button className="btn btn-info p-1 me-2 btn-small-width" onClick={()=>navigate(`/updateUser/${user._id}`)}>UPDATE ACC</button>

<button className="btn btn-info p-1 me-2 btn-small-width" onClick={()=>navigate(`/updatePWD/${user._id}`)}>UPDATE PASSWORD</button>

<button className="btn btn-danger btn-small-width float-end" onClick={handleDeleteAcc}>DELETE ACC</button>
<br/>
<br/>

{user.role==="seller" && (<div>
<button className="btn btn-primary p-1 me-2" onClick={()=>navigate("/addProduct")}>ADD PRODUCT</button>
      <h2><center>MY PRODUCTS</center></h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>
              <center>ID</center>
            </th>
            <th>
              <center>Name</center>
            </th>
            <th>
              <center>Brand</center>
            </th>
            <th>
              <center>Price</center>
            </th>
            <th>
              <center>Description</center>
            </th>
            <th>
              <center>weight</center>
            </th>
            <th>
              <center>Actions</center>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 && (
            <>
              {products.map((myProduct) => (
                <tr key={myProduct._id}>
                  <td>
                    <center>{myProduct._id}</center>
                  </td>
                  <td>
                    <center>{myProduct.name}</center>
                  </td>
                  <td>
                    <center>{myProduct.brand}</center>
                  </td>
                  <td>
                    <center>{myProduct.price}</center>
                  </td>
                  <td>
                    <center>{myProduct.description}</center>
                  </td>
                  <td>
                    <center>{myProduct.weight}</center>
                  </td>
                  <th>
                    <center>
                     <button
  className="btn btn-info p-1 me-2"
  onClick={() => handleUpdate(myProduct._id)}
>
  Update
</button>

                      <button
                        className="btn btn-danger p-1 me-2"
                        onClick={() => handleDelete(myProduct._id)}
                      >
                        Delete
                      </button>
                    </center>
                  </th>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      :<h1><center>There is no any Products</center></h1>
      </div>)}  
      
    </div>
  );
};

export default Profile;
