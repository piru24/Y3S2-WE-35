import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../../assets/styles/Forms.css'
import swal from 'sweetalert'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateACC= () => {


  const id = useParams()
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name:"",
    mobile:"",
    email:"",
    address:""
  })

 

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState, 
      [e.target.name] : e.target.value
    }))

  }


  useEffect(()=>{
      const getUser = async() => {
          try {
             await axios.get("http://localhost:8090/User/profile").then((res)=>{
                setInputs(res.data.user)
                console.log(res.data.user)
            })} catch (err) {
              console.log(err)
            }
          }
      getUser()
  }, [id])

  const sendData = async () => {
    try {
      const res = await axios.patch("http://localhost:8090/User/update", {
        name: inputs.name,
        mobile: inputs.mobile,
        email: inputs.email,
        address: inputs.address,
        // id: id, // Uncomment and use if needed
      });
      swal({
        title: "Item updated!",
        icon: "success",
        button: "OK",
        timer: 3000
      });
      navigate("/profile");
      return res.data;
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data);
        swal({
          title: "Update failed!",
          text: err.response.data.message || "Invalid input",
          icon: "error"
        });
      } else {
        console.error('Error:', err);
      }
      return null;
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendData();
  };
  

  return (
    <div className='forms'>

      <h1>Update Account Details</h1>
      <form onSubmit={handleSubmit}>

        <div className='inputs'>
        <label>Name:</label>
        <input type="text" name='name' value={inputs.name} onChange={handleChange}/>
        </div>
        

        <div className='inputs'>
        <label>Mobile:</label>
        <input type="text" name='mobile' value={inputs.mobile} onChange={handleChange}/>
        </div>
        

        <div className='inputs'> 
        <label>Email:</label>
        <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
        </div>
        

        <div className='inputs'>
        <label>Address:</label>
        <input type="text" name='address' value={inputs.address} onChange={handleChange}/>
        </div>
        
        
        <div className='inputs'>
        <button type="submit" className="btn btn-primary">Update</button>
        </div>
        
        
      </form>
    </div>
  )
}

export default UpdateACC