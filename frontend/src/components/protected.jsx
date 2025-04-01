import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/register" />
      }
    />
  );
};

export default ProtectedRoute;
// This code defines a ProtectedRoute component that checks if a user is authenticated before rendering the specified component. If the user is not authenticated, they are redirected to the login page. You can use this component to wrap any route that requires authentication in your React Router setup.
