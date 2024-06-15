import React , {useState} from "react";
import "../Style/style.css";
import x from "./1.png";
import axios from "axios";
import {NavLink} from "react-router-dom";
import{useNavigate} from "react-router-dom";

const ForgetPassword = () => {

  const [kpmg_id, setKpmgId] = useState("");
  const navigate = useNavigate();

  const otpgenerate = () => {
    const otpLength = 6; // Length of the OTP
    const otpDigits = "0123456789"; // Possible digits for the OTP

    let otp = "";
    for (let i = 0; i < otpLength; i++) {
      const randomIndex = Math.floor(Math.random() * otpDigits.length);
      otp += otpDigits[randomIndex];
    }

    localStorage.setItem("otp", otp);
    localStorage.setItem("kpmg_id", kpmg_id);

    // emailsender(kpmg_id, otp);

    console.log("OTP generated:", otp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      otpgenerate();
      const code = localStorage.getItem("otp");
      // console.log(code);

      const body = JSON.stringify({
        kpmg_id,
        code,
      });

      axios
        .post("http://localhost:3001/user/password-reset", body, config)
        .then((res) => {
         
          // window.location.href = "/login";
          navigate("/otp2");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      
    }
  }
  return (
    <div className="container">
      <div className="left-side">
        <div className="logo">
          <img alt="" src={x} style={{ width: "180px" }} />
        </div>
      </div>
      <div className="right-side">
        <div className="card" style={{ marginTop: "5vh", paddingTop: "2rem" }}>
          <h2 className="register-heading">Forgot Password</h2>
          <form id="registrationForm">
            <input
              className="ff"
              type="text"
              id="kpmgId"
              name="kpmgId"
              placeholder="KPMG ID"
              required
              value={kpmg_id}
              onChange = {(e) => setKpmgId(e.target.value)}
            />
            <button type="submit" style={{ paddingTop: "20px" }} onClick={handleSubmit}>
              <NavLink to="/otp2" className="otp-btn">
                Send OTP
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

