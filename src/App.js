import "./App.css"; 
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import {Routes, Route, Link, useNavigate } from 'react-router-dom'; 
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ManageUsers from "./pages/admin/ManageUsers";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  const navigate = useNavigate(); 
  const { userState, handleLogin, handleLogout} = useContext(AuthContext); 
  return (
    <div className="App">
      <h1>Oly</h1>
      <ul id="top-nav">
        <li><Link to="/">Home</Link></li>
        { !userState.isLoggedIn ? (
          <>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
          <li><Link to="/dashboard">Dashboard</Link></li>
          { userState.user?.role == 'admin' && <li><Link to="/manage-users">Manage Users</Link></li>}
          { userState.user?.role == 'seller' && <li><Link to="/add-product">Add Product</Link></li> }
          <li><Link to="/account">Account</Link></li>
          <li><button onClick={() => {
            handleLogout();
            localStorage.removeItem('token');
            navigate('/');
          }}>logout</button></li>
          </>
        )}
      </ul> 

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/manage-users" element={<PrivateRoute permittedRoles={['admin']}>
          <ManageUsers />
        </PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute>
          <Dashboard />
        </PrivateRoute>} /> 
        <Route path="/account" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
         } />
        <Route path="/add-product" element={ 
          <PrivateRoute permittedRoles={['seller']}>
            <AddProduct />
          </PrivateRoute> 
        }/>
      </Routes>
    </div>
  );
}

export default App;

