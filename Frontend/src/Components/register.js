import React, { useState } from "react";
import "../Style/style.css";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import x from "./1.png";
import { useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import Card from "@mui/material/Card";
// import OpenRepo from "./OpenRepo";

const initialState = {
  name: "",
  designation: "",
  department: "",
  kpmg_id: "",
  location: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, designation, department, kpmg_id, location } = formData;

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const [open, setOpen] = useState(false);

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!kpmg_id || !kpmg_id.includes("@kpmg")) {
  //     alert("Please enter a valid KPMG email address.");
  //     navigate("/register");
  //     return false;
  //   } else {
  //     // console.log("Form data:", formData);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       otpgenerate();
  //       const code = localStorage.getItem("otp");
  //       console.log(code);

  //       const body = JSON.stringify({
  //         name,
  //         designation,
  //         department,
  //         kpmg_id,
  //         location,
  //         code,
  //       });

  //       axios
  //         .post("http://localhost:3001/user/register", body, config)
  //         .then((response) => {
  //           console.log(response);
  //           navigate("/otp");
  //         })
  //         .catch((error) => {
  //           if (error.response && error.response.status === 400) {
  //             alert("User already exists with this KPMG email address.");
  //             navigate("/register");
  //           } else {
  //             alert("An error occurred. Please try again later.");
  //           }
  //           console.log(error);
  //         });

  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kpmg_id || !kpmg_id.includes("@kpmg")) {
      alert("Please enter a valid KPMG email address.");
      navigate("/register");
      return false;
    }

    // console.log("Form data:", formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      otpgenerate();
      const code = localStorage.getItem("otp");
      console.log(code);

      const body = JSON.stringify({
        name,
        designation,
        department,
        kpmg_id,
        location,
        code,
      });

      axios
        .post("http://localhost:3001/user/register", body, config)
        .then((response, error) => {
          if (response.status === 200) {
            alert("OTP has been sent to your email");
            navigate("/otp");
          } else {
            if (error.response && error.response.status === 400) {
              alert("User already exists with this KPMG email address.");
              localStorage.removeItem("otp")
              navigate("/register");
            }
            alert("User registration failed. Please try again.");
            
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert("User already exists with this KPMG email address.");
          } else {
            alert("An error occurred. Please try again later.");
            // Ensure to navigate to the appropriate page in case of an error
            navigate("/register");
          }
        });
    } catch (error) {
      console.error(error); // Logging the error for debugging purposes
      alert("An error occurred. Please try again later.");
      // Ensure to navigate to the appropriate page in case of an error
      navigate("/register");
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
        <div className="card">
          <h2 className="register-heading">Register</h2>
          <form id="registrationForm">
            <input
              onChange={(e) => onValueChange(e)}
              value={name}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required={true}
            />
            <input
              onChange={(e) => onValueChange(e)}
              value={designation}
              className="ff"
              type="text"
              id="designation"
              name="designation"
              placeholder="Designation"
              required={true}
            />
            <input
              onChange={(e) => onValueChange(e)}
              value={department}
              className="ff"
              type="text"
              id="department"
              name="department"
              placeholder="Department"
              required={true}
            />
            <input
              onChange={(e) => onValueChange(e)}
              value={kpmg_id}
              className="ff"
              type={"email"}
              id="kpmg_id"
              name="kpmg_id"
              placeholder="KPMG Email ID"
              required={true}
            />

            <input
              onChange={(e) => onValueChange(e)}
              value={location}
              className="ff"
              type="text"
              id="location"
              style={{ marginBottom: "25px" }}
              name="location"
              placeholder="Base Location"
              required={true}
            />
            <button
              type="submit"
              style={{ padding: "20px" }}
              onClick={handleSubmit}
            >
              <Link
                to="/otp"
                style={{ textDecoration: "none", color: "white" }}
              >
                Generate OTP
              </Link>
            </button>
          </form>
          <p className="login-link">
            Already have an account? <NavLink to="/">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
