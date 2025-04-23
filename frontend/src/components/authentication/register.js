import React, { useState } from 'react'
import axios from "axios"
import '../../assets/styles/Forms.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';
const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name:"",
    mobile:"",
    email:"",
    address:"",
    role:"",
    password:""
  })

 

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState, 
      [e.target.name] : e.target.value
    }))

  }

  const sendData = async() =>{

    const res = await axios.post("http://localhost:8090/User/signUp", {
      name:inputs.name,
      mobile:inputs.mobile,
      email:inputs.email,
      address:inputs.address,
      role:inputs.role,
      password:inputs.password,
    }).catch((err)=>console.log(err));

    const data = await res.data;
    return data;

  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await sendData();

      console.log(response.User.role)

      if (response.User.role === "admin") {
        navigate("/admin");
      } else if (response.User.role === "seller") {
        navigate("/profile");
      } else {
        navigate("/products");
      }

      dispatch(authActions.login());
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='forms'>

      <h1>Register</h1>
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
        <label>Choose your Role:</label>

          <select name='role' value={inputs.role} onChange={handleChange}>
            <option>Select the Role</option>
            <option value="buyer"> I am a buyer</option>
            <option value="seller">I am a seller</option>
          </select>

        </div>

        <div className='inputs'>
        <label>Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
        </div>
        
        <div className='inputs'>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        
        
      </form>
    </div>
  )
}

export default Register