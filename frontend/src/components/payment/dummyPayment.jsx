import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux'
import swal from "sweetalert2";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//import '../../assets/images/AddProducts.css';

export default function AddPayment() {

  const cart = useSelector((state) => state.cart)
  const [payments, setPayemtns] = useState({
        email: "", 
        mobile: "",
        number: "",
        expiration: "",
        cvv: "",
        name: "",
        amount:"",
  });

  const handleChangeText = (name, value) => {
    setPayemtns({ ...payments, [name]: value.target.value });
    console.log(payments);
  };

const newPayment = {
  email:payments.email,
  mobile:payments.mobile,
  card:{
    number:payments.number,
    expiration:payments.expiration,
    cvv:payments.cvv,
    name:payments.name
  },
  amount:payments.amount

}



const AddPayment = async (e) => {
  e.preventDefault();
  try {
    // 1. Make dummy payment
    const paymentRes = await axios.post("http://localhost:8500/payment/card", newPayment, { withCredentials: true });
    swal.fire(`Payment Successful`);

    // 2. Now create the order (just like Stripe flow)
    const orderData = {
      products: cart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
      })),
      amount: cart.withCommision,
      status: "pending",
    };
    const orderRes = await axios.post("http://localhost:8020/Order/addOrder", orderData, { withCredentials: true });

    // 3. Navigate to order history or show success
    navigate("/getOrders");
  } catch (error) {
    console.error(error);
    swal.fire(`Payment or Order Failed`);
  }
};

  const navigate = useNavigate();
  return (
    
    <Container fluid>
       <h1 className="mb-4">Payment</h1>
      <Form onSubmit={AddPayment}>
        
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                name="email"
                type="email" 
                placeholder="Email"   
                title="Email must be required"
                required
                onChange={(val) => handleChangeText("email", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control 
                name="mobile"
                type="number" 
                placeholder="Mobile"   
                title="Mobile must be required"
                required
                onChange={(val) => handleChangeText("mobile", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicNumber">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control 
                name="number"
                type="text" 
                placeholder="xxxx xxxx xxxx xxxx"   
                title="Number must be required"
                required
                onChange={(val) => handleChangeText("number", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicExpiration">
            <Form.Label>Expire In</Form.Label>
            <Form.Control 
                name="expiration"
                type="text" 
                placeholder="eg:01/25(mm/yy)"   
                title="expiration must be required"
                required
                onChange={(val) => handleChangeText("expiration", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicCCV">
            <Form.Label>CVV</Form.Label>
            <Form.Control 
                name="cvv"
                type="number" 
                placeholder="CVV"   
                title="Upload Date must be required"
                required
                onChange={(val) => handleChangeText("cvv", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicaName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                name="name"
                type="text" 
                placeholder="Name"   
                title="Name must be required"
                required
                onChange={(val) => handleChangeText("name", val)}/>
          </Form.Group>
        </Row> 
        <Form.Group className="mb-3" controlId="formGroupAmount">
        <Form.Label>Amount (Rs. )</Form.Label>
            <Form.Control 
                name="amount"
                type="number" 
                placeholder="Amount"   
                title="Amount must be required"
                onChange={(val) => handleChangeText("amount", val)}/>
      </Form.Group>  

          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>
        </Container>
  );
}