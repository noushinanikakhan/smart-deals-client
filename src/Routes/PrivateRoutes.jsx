import React from "react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import {  Navigate, useLocation } from "react-router";

const  PrivateRoute = ({children}) => {
    const {user, loading} = use (AuthContext)

   const location = useLocation();

   if (loading) {
    return <span className="loading loading-spinner loading-xl text-success"></span>
   }

   if (user) {
    return children
   }

   return <Navigate state={location?.pathname} to="/register"></Navigate>
}


export default PrivateRoute;