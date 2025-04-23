import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../../assets/images/AddProducts.css';

export default function AddProducts() {

  const [products, setProducts] = useState({
        name: "", 
        brand: "",
        price: "",
        weight: "",
        upload_date: "",
        description: "",
        image: "",
  });

  const handleChangeText = (name, value) => {
    setProducts({ ...products, [name]: value.target.value });
  };

  const addProducts = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:8070/products/addProduct", products)
      .then(() => {
        swal.fire(`successfully added`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  return (
    
    <Container fluid>
       <h1 className="mb-4">Add Products</h1>
      <Form onSubmit={addProducts}>
        
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                name="name"
                type="text" 
                placeholder="Username"   
                title="Name must be required"
                required
                onChange={(val) => handleChangeText("name", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control 
                name="brand"
                type="text" 
                placeholder="Brand"   
                title="Brand must be required"
                required
                onChange={(val) => handleChangeText("brand", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
                name="price"
                type="text" 
                placeholder="Price"   
                title="Price must be required"
                required
                onChange={(val) => handleChangeText("price", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control 
                name="weight"
                type="text" 
                placeholder="weight"   
                title="Weight must be required"
                required
                onChange={(val) => handleChangeText("weight", val)}/>
          </Form.Group>
        </Row> 
        <Row className="mb-3">
          <Form.Group as={Col}  controlId="formBasicUpload_date">
            <Form.Label>Upload Date</Form.Label>
            <Form.Control 
                name="upload_date"
                type="date" 
                placeholder="Upload Date"   
                title="Upload Date must be required"
                required
                onChange={(val) => handleChangeText("upload_date", val)}/>
            
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicaImage">
            <Form.Label>Image</Form.Label>
            <Form.Control 
                name="image"
                type="text" 
                placeholder="Image"   
                title="Image must be required"
                required
                onChange={(val) => handleChangeText("image", val)}/>
          </Form.Group>
        </Row> 
        <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Description</Form.Label>
            <Form.Control 
                name="description"
                type="text" 
                placeholder="Description"   
                title="Description must be required"
                required
                onChange={(val) => handleChangeText("description", val)}/>
      </Form.Group>  

          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>
        </Container>
  );
}