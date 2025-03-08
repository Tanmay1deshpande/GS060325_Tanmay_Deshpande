import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import Cookies from "js-cookie";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Chart from "./pages/Chart/Chart";

function App() {
  const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
    element,
  }) => {
    const token =
      useSelector((state: RootState) => state.auth.token) ||
      Cookies.get("token");
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/romeo" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
