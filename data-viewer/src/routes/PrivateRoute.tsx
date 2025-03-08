import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token ? true : false;
};

interface PrivateRouteProps {
  element: React.ReactNode; // The component to render when authenticated
  path: string;
}

// PrivateRoute component
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  return (
    <Route
      {...rest} // Spread rest of the route props like `path`, `exact`, etc.
      element={isAuthenticated() ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
