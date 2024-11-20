import '../App.css';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
export default function Register(){
    const navigate = useNavigate(); 
    const [formData, setFormadata] = useState({
        email : "",
        password : "",
        role : ""
    });
    const [clientErrors, setClientErros] = useState(null);
    const [serverErrors, setServerErrors] = useState(null); 
    const clientValidationsErrors = {};


    const runClientValidations = ()=>{
        if(formData.password.trim().length === 0){
            clientValidationsErrors.password = 'password is required'
        }

        if(formData.email.trim().length === 0){
            clientValidationsErrors.email = 'email is required'
        }

        if(formData.role.trim().length === 0){
            clientValidationsErrors.role = 'role is required'
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        runClientValidations();
        console.log(clientValidationsErrors); 
        if(Object.keys(clientValidationsErrors).length == 0) {
            try {
                const response = await axios.post('http://localhost:3010/api/users/register', formData) 
                navigate('/login'); 
            } catch(err) {
                setServerErrors(err.response.data.errors); 
            }
            setClientErros({})
        } else {
            setClientErros(clientValidationsErrors); 
        }
    }

    return(
        <>
            <h2>Register page</h2>
            { serverErrors && (
                <div>
                    <h3>Server Errors</h3>
                    <ul>
                        { serverErrors.map((ele,i) => {
                            return <li key={i}>{ele.msg}</li>
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e)=> setFormadata({...formData, email:e.target.value})}
                    placeholder="Enter email" 
                /><br/>
                {clientErrors && <p className="clientErrors">{clientErrors.email}</p>}


                <input 
                    type="password" 
                    value={formData.password} 
                    onChange={(e)=> setFormadata({...formData, password:e.target.value})}
                    placeholder="Enter password"
                /> <br />
                {clientErrors && <p className="clientErrors">{clientErrors.password}</p>}

                <input 
                    type="radio" 
                    name="role"  
                    value="buyer"
                    id="buyer" 
                    onChange={(e)=> setFormadata({...formData, role:e.target.value})} 
                /><label htmlFor="buyer">Buyer</label>

                <input 
                    type="radio" 
                    name="role" 
                    value="seller" 
                    id="seller"
                    onChange={(e)=> setFormadata({...formData, role:e.target.value})} 
                />
                <label htmlFor="seller" name="seller">Seller</label><br />
                {clientErrors && <p className="clientErrors">{clientErrors.role}</p>}

                <input type="submit"/>
            </form>
        </>
    )
}