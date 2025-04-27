import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import '../../assets/styles/Forms.css'
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';
axios.defaults.withCredentials = true;

const Login = () => {

  const dispatch = useDispatch()
    const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email:"",
    password:""
  })

  

  const handleChange = (e) => {
    setInputs((prevState)=> ({
      ...prevState, 
      [e.target.name] : e.target.value
    }))
  }


  const sendData = async () => {
    const res = await axios.post("http://localhost:8090/User/login", {
      email: inputs.email,
      password: inputs.password
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(inputs)
    try{
      const response = await sendData();

      console.log(response.User.role)

      if (response.User.role === "admin") {
        navigate("/admin");
      } else if (response.User.role === "seller") {
        navigate("/profile");
      } else if (response.User.role === "delivery") {
        navigate("/deliveryDashboard");
      } else {
        navigate("/products");
      }

      dispatch(authActions.login());
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>

      <h1>Login</h1>
        

        <div>
        <label>Email:</label>
        <input type="email" name='email' value={inputs.email} onChange={handleChange}/>
        </div>
        

        
       
        <div>
        <label>Password:</label>
        <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
        </div>
        
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        
        
      </form>
    </div>
  )
}

export default Login