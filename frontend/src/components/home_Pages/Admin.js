import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
axios.defaults.withCredentials = true;
const Admin = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

        
    const getUsers = async() => {
        try {
            const response = await axios.get("http://localhost:8090/User/users", {withCredentials:true});
            const users = response.data.users.map(users => ({
              id:users._id, 
              name: users.name,
              address: users.address,
              phone: users.mobile,
              email:users.email,
              role:users.role
            }));
            setUsers(users)
            console.log(users)
          } catch (err) {
            console.log(err)
          }
        }
    getUsers()
}, [])



  return (
    <div><div className='allUsers'>

    <h1><center>Users</center></h1>

    <button><Link to="./viewOrders">View Orders</Link></button>

<table className="table">
  <thead className="thead-dark">  
  <tr>
          <th><center>ID</center></th>
          <th><center>Name</center></th>
          <th><center>Address</center></th>
          <th><center>Phone</center></th>
          <th><center>Email</center></th>
          <th><center>Role</center></th>
  </tr>
  </thead>


         
<tbody>
{users.map((user, key)=>(
           <tr key={key}>
           <td><center>{user.id}</center></td>
           <td><center>{user.name}</center></td>
           <td><center>{user.address}</center></td>
           <td><center>{user.phone}</center></td>
           <td><center>{user.email}</center></td>
           <td><center>{user.role}</center></td>
          </tr>
))}

</tbody>
      
      </table>
  </div></div>
  )
}

export default Admin