import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import styles from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import { APP_NAME } from "../../constants/general/generalConstants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import logoMain from "../../assets/images/logo_main.svg";
// import {ReactComponent as Logo} from "../../assets/images/logo.svg"
// import { loginUser } from "../services/authService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     //   const { token } = await loginUser({ email, password });
  //     //   dispatch(login(token));
  //     console.log("Logged In");
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !username ||
      !password ||
      username.length > 20 ||
      password.length > 20
    ) {
      console.log("Invalid Credentials");
      alert("Invalid Credentials");
    }
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      login(response.data.token);
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="AllCenteredFlex" style={{ width: "100%", height: "90vh" }}>
      <div className={`AllCenteredFlex ${styles.login_section}`}>
        <img src={logoMain} alt="Main Logo" />
        <h1 className="login_heading">Welcome to {APP_NAME}</h1>
        {/* <form
          onSubmit={handleSubmit}
          className="AllCenteredFlex"
          style={{ flexDirection: "column", gap: "20px", width: "25%" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.fancy_input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.fancy_input}
          />
          <ButtonPrimary label="Login" onClick={handleSubmit} type="submit" />
        </form> */}

        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          fullWidth
        ></TextField>
        <TextField
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          fullWidth
        ></TextField>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleLogin}
          size="large"
          fullWidth
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
