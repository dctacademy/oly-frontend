import AuthContext from "../context/AuthContext";
import axios from 'axios'; 
import { useReducer, useEffect } from "react";
import userReducer from "../reducers/user-reducer";

const initialState = { 
    isLoggedIn: false, 
    user: null
};

function AuthProvider(props){
    const [userState, userDispatch] = useReducer(userReducer, initialState)
    const handleLogin = (user) => {
        userDispatch({ type: 'LOGIN', payload: { isLoggedIn: true, user: user}}); 
    }
    const handleLogout = () => {
        userDispatch({ type: 'LOGOUT', payload: { isLoggedIn: false, user: null }})
    }

    useEffect(() => {
       (async () => {
        if(localStorage.getItem('token')) {
            const response = await axios.get('http://localhost:3010/api/users/account', { headers: { Authorization: localStorage.getItem('token')}}) 
            handleLogin(response.data); 
        }
       })();
    }, []);

    // handle page reloads
    if(localStorage.getItem('token') && !userState.user) {
        return <p>loading...</p>
    }

    return (
        <div>
            <AuthContext.Provider value={{ userState, handleLogin, handleLogout }}>
                { props.children }
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider; 