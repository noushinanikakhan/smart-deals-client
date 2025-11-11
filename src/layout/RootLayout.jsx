import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
         <Navbar></Navbar>
         <Outlet></Outlet>
        </div>
    )
};

export default RootLayout;