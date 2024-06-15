import React, { useState } from "react";
import "../Style/style.css";
import x from "./1.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();

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
        .post("http://localhost:3001/user/password-form", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Password created successfully");
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  const passwordComplexityValidator = (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the passwords match
    if (password !== cpassword) {
      alert("Passwords do not match");
      return false;
    }
    if (!passwordComplexityValidator(password)) {
      alert(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one special character, and one number"
      );
      navigate("/createpass");
      return false;
    }

    // Save the password
    savePassword(password);
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
          <h2 className="register-heading">Create Password</h2>
          <form id="registrationForm">
            <input
              className="ff"
              type="password"
              id="password"
              value={password}
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="ff"
              type="password"
              id="cpassword"
              value={cpassword}
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

export default CreatePassword;
