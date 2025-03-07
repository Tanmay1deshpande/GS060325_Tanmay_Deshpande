import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import styles from "./Login.module.css";
// import {ReactComponent as Logo} from "../../assets/images/logo.svg"
// import { loginUser } from "../services/authService";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   const { token } = await loginUser({ email, password });
      //   dispatch(login(token));
      console.log("Logged In");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="AllCenteredFlex" style={{ width: "100%", height: "90vh" }}>
      <div className={`AllCenteredFlex ${styles.login_section}`}>
        <img
          src="data-viewer\src\assets\images\logo_main.svg"
          alt="Main Logo"
        />
        <h1 className="login_heading">Welcome to Data Viewer</h1>
        <form
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
        </form>
      </div>
    </div>
  );
};

export default Login;
