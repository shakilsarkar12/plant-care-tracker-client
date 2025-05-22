import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Loader/Loader"

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading && !user?.email) {
    return <Loader />;
  }

  if (user) {
    return children;
    }
    
    return <Navigate state={location.pathname} to="/login" />;
};

export default Private;
