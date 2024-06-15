import React from "react";
import "../Style/style.css";
import x from "./1.png";
import axios from "axios";
import { useState } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const[newPassword, setNewPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const savePassword = (password) => {
    const kpmg_id = localStorage.getItem("kpmg_id");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        password,
        kpmg_id,
      });
      axios
        .post("http://localhost:3001/user/change-pass", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Password created successfully");
          navigate("/landing");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the passwords match
    if (newPassword !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Save the password
    savePassword(newPassword);
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="logo">
          <img alt="hi " src={x} style={{ width: "180px" }} />
        </div>
      </div>
      <div className="right-side">
        <div className="card" style={{ marginTop: "5vh", paddingTop: "2rem" }}>
          <h2 className="register-heading">Change Password</h2>
          <form id="registrationForm">
            <input
              className="ff"
              value={newPassword}
              type="password"
              id="password"
              name="password"
              placeholder=" New Password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="ff"
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              required
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button
              type="submit"
              style={{ paddingTop: "20px" }}
              onClick={handleSubmit}
            >
              <NavLink to="/" className="otp-btn">
                Login
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
