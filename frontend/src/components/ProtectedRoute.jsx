import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    return children; // render admin page
};

export default ProtectedRoute;
