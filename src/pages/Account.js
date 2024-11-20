import AuthContext from "../context/AuthContext"
import { useContext } from "react"
export default function Account(){
    const { userState } = useContext(AuthContext); 
    console.log('account page', userState); 
    return (
        <div>
            <h2>Account page</h2>
            <p>id - { userState.user._id }</p>
            <p>email - { userState.user.email }</p>
            <p>role - { userState.user.role } </p>
        </div>
    )
}