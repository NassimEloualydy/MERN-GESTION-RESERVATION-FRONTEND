import React from 'react'
import {Navigate,Outlet} from "react-router-dom";
const isAuthenticated=()=>{
    const jwt=localStorage.getItem('JWT_INFO');
    if(jwt){
        return JSON.stringify(jwt);
    }
    return false;
}
const PraviteRoute=()=>{
  return isAuthenticated() ? <Outlet/>:<Navigate to='/Login'/>;
  
}

export default PraviteRoute