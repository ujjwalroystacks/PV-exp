import React, { useState } from "react";
import "../Style/style.css";
import { NavLink } from "react-router-dom";
import x from "./1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [kpmg_id, setKpmgId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log("hello");
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        kpmg_id,
        password,
      });

      axios
        .post("http://localhost:3001/user/login", body, config)
        .then((res) => {
          if (res.status === 404) {
            alert("User not found");
          } else if (res.status === 401) {
            alert("Invalid password");
          }
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("kpmg_id", kpmg_id);
          navigate("/landing");
          // console.log(res.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
          // console.log(err.response.data.message);
        });
    } catch (err) {
      // console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="logo">
          <img alt="" src={x} style={{ width: "180px" }} />
        </div>
      </div>
      <div className="right-side">
        <div className="card" style={{ marginTop: "5vh", paddingTop: "2rem" }}>
          <h2 className="register-heading">Login</h2>
          <form id="registrationForm">
            <input
              onChange={(e) => setKpmgId(e.target.value)}
              className="ff"
              type="text"
              id="kpmgId"
              name="kpmgId"
              placeholder="KPMG Email ID"
              required
              value={kpmg_id}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="ff"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
            />

            <button
              type="submit"
              style={{ paddingTop: "20px" }}
              onClick={handleSubmit}
            >
              {/* <NavLink to="/landing" className="otp-btn">Login</NavLink> */}
              Login
            </button>
            <p className="login-link">
              <NavLink to="/forgetpass">Forgot Password ?</NavLink>
            </p>
          </form>
          <p className="login-link">
            Not a member yet? <NavLink to="/register" className="registerBtn">Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
