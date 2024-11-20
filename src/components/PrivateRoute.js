import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function PrivateRoute(props){
    const { userState } = useContext(AuthContext); 
    if(!localStorage.getItem('token') && !userState.user) { 
        return <Navigate to="/login" replace/>;
    }else if(props.permittedRoles && props.permittedRoles.includes(userState.user.role)) {
        return props.children; 
    } else if( props.permittedRoles && !props.permittedRoles.includes(userState.user.role)  ) {
        return <p>Unauthorized</p>
    } else if(userState) {
        return props.children; 
    } 
}