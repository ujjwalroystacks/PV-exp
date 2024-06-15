// import React from "react";
// import "../Style/style.css";
// import x from "./1.png";
// import { NavLink, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom"

// const OTP = () => {

//   const navigate = useNavigate();
//   const checkOTP = () => {
//     const enteredOTP =
//       document.getElementById("digit1").value +
//       document.getElementById("digit2").value +
//       document.getElementById("digit3").value +
//       document.getElementById("digit4").value +
//       document.getElementById("digit5").value +
//       document.getElementById("digit6").value;

//     const storedOTP = localStorage.getItem("otp");
//     console.log(storedOTP);

//     if (storedOTP === enteredOTP) {
//       // OTP is correct
//       console.log("OTP is correct");

//       navigate("/changepass");
//     } else {
//       // OTP is incorrect
//       alert("OTP is incorrect");
//       navigate("/otp");
//       console.log("OTP is incorrect");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="left-side">
//         <div className="logo">
//           <img alt="" src={x} style={{ width: "180px" }} />
//         </div>
//       </div>
//       <div className="right-side">
//         <div className="card" style={{ marginTop: "5vh" }}>
//           <h2 className="otp-heading">Enter OTP</h2>
//           <form id="otpForm">
//             <div className="otp-input-container">
//               <input
//                 type="text"
//                 id="digit1"
//                 name="digit1"
//                 maxLength="1"
//                 required
//               />
//               <input
//                 type="text"
//                 id="digit2"
//                 name="digit2"
//                 maxLength="1"
//                 required
//               />
//               <input
//                 type="text"
//                 id="digit3"
//                 name="digit3"
//                 maxLength="1"
//                 required
//               />
//               <input
//                 type="text"
//                 id="digit4"
//                 name="digit4"
//                 maxLength="1"
//                 required
//               />
//               <input
//                 type="text"
//                 id="digit5"
//                 name="digit5"
//                 maxLength="1"
//                 required
//               />
//               <input
//                 type="text"
//                 id="digit6"
//                 name="digit6"
//                 maxLength="1"
//                 required
//               />
//             </div>

//             <button className="next-button" type="submit" onClick={checkOTP}>
//               <Link to="/changepass" className="otp-btn">
//                 Next
//               </Link>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTP;

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../Style/style.css";
import x from "./1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();
  const checkOTP = () => {
    const enteredOTP = otp;

    const storedOTP = localStorage.getItem("otp");
    console.log(storedOTP);

    if (storedOTP === enteredOTP) {
      // OTP is correct
      console.log("OTP is correct");

      navigate("/changepass");
    } else {
      // OTP is incorrect
      alert("OTP is incorrect");
      navigate("/otp");
      console.log("OTP is incorrect");
    }
  };

  const [otp, setOtp] = useState("");

  return (
    <div className="container">
      <div className="left-side">
        <div className="logo">
          <img alt="" src={x} style={{ width: "180px" }} />
        </div>
      </div>
      <div className="right-side">
        <div className="card">
          <h2 className="otp-heading">Enter OTP</h2>
          <form id="otpForm">
            <div className="otp-input-container">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                // style ={{width:"5em"}}
                renderSeparator={
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                }
                inputType="tel"
                // containerStyle={{width:"2em"}}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <button
              className="next-button"
              type="submit"
              onClick={checkOTP}
            >
              <Link to="/changepass" className="otp-btn">
                Next
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
