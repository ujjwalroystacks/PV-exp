// import React from "react";
// import "../Style/style.css";
// import x from "./1.png";
// import { NavLink, Link, redirect } from "react-router-dom";
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

//       navigate("/createpass");
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
//             {/* <div className='timer'>Resend after: 57</div> */}
//             <button className="next-button" style={{marginLeft:"8rem", backgroundColor:"#003380"}} type="submit" onClick={checkOTP}>
//               <Link to="/createpass" style={{textDecoration:"none", color:"white"}}>
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

      navigate("/createpass");
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
        <div className="card" >
          <h2 className="otp-heading">Enter OTP</h2>
          <form id="otpForm">
            <div className="otp-input-container" style={{ width: "" }}>
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
            {/* <div className='timer'>Resend after: 57</div> */}
            <button
              className="next-button"
              style={{  backgroundColor: "#003380" }}
              type="submit"
              onClick={checkOTP}
            >
              <Link
                to="/createpass"
                style={{ textDecoration: "none", color: "white" }}
              >
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
