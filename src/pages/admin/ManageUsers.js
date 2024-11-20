/*
    1. create a users state variable to store all the users information
    2. using useEffect hook, make an api call to get all the users information
    3. display the users data in a table format
        Status Email Role Created At
    4. for the status column, use a checkbox to show if a user's account is active or deactive
    5. if the account is active, check the box, else make it unchecked
    6. if the users role is admin, then disable the checkbox

    7. onchange of status, make an api call to update the user's status
    8. if the user account is deactivated, show the error msg when they login
*/
import axios from "axios";
import { useState, useEffect } from "react"
export default function ManageUsers(){
    const [users, setUsers] = useState([]); 

    useEffect(() => {
      (async()=>{
        try { 
            const response = await axios.get('http://localhost:3010/api/users', { 
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }); 
            setUsers(response.data); 
        } catch(err) {
            console.log(err); 
        }
      })();
    }, []);

    const handleStatusChange = async (userObj) => {
        try {
          const formData = { status: userObj.status == 'active' ? 'deactive' : 'active' };
          const response = await axios.put(`http://localhost:3010/api/users/${userObj._id}/status`, formData, { headers: { Authorization: localStorage.getItem('token')}}); 
          const newArr = users.map((ele) => {
            if(ele._id === response.data._id) {
                return response.data; 
            } else {
                return ele; 
            }
          });
          setUsers(newArr); 
        } catch(err) {
            alert(err.message); 
        }
    }

    return (
        <div>
            <h2>Manage Users - { users.length } </h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td><input 
                                        type="checkbox" 
                                        checked={ele.status == 'active'} 
                                        onChange={() => {
                                                handleStatusChange(ele); 
                                        }}
                                        disabled={ele.role == 'admin'}
                                    /></td>
                                <td>{ ele.email }</td>
                                <td>{ ele.role }</td>
                                <td>{ ele.createdAt }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}