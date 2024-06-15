import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./Components/Login";
import Register from "./Components/register";
import ForgetPassword from "./Components/ForgetPassword";
import ChangePassword from "./Components/ChangePassword";
import CreatePassword from "./Components/CreatePassword";
import Otp from "./Components/Otp";
import Otp2 from "./Components/Otp2";
import LandingPage from "./Components/LandingPage";
import AddItem from "./Components/AddItem";
// import Addnewproject from "./Components/Addnewproject";
// import Telecom from "./Components/Telecom";
// import ExistingProjects from "./Components/ExistingProjects";

// import KpiExecute from "./Components/KpiExecute";
// import FinTech from "./Components/FinTech";
// import HealthCare from "./Components/HealthCare";
// import OpenRepo from "./Components/OpenRepo";
// import Utilities from "./Components/Utilities";
// import Ecommerce from "./Components/Ecommerce";
// import Toll from "./Components/Toll";
// import Masterdata from "./Components/MasterData";
// import ChatBot from "./Components/ChatBot";
// import AddNewKPI from "./Components/AddNewKPI_Copy";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgetpass" element={<ForgetPassword />} />
        <Route path="/changepass" element={<ChangePassword />} />
        <Route path="/createpass" element={<CreatePassword />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/otp2" element={<Otp2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/additem" element={<AddItem />} />
        {/* <Route path="/addnewproject" element={<Addnewproject />} />
        <Route path="/existing" element={<ExistingProjects />} />
        <Route path="/telecom" element={<Telecom />} />
        <Route path="/kpiexecute" element={<KpiExecute />} />
        <Route path="/fintech" element={<FinTech />} />
        <Route path="/toll" element={<Toll />} />
        <Route path="/healthcare" element={<HealthCare />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/openrepo" element={<OpenRepo />} />
        <Route path="/masterdata" element={<Masterdata />} />
        <Route path="/addnewkpi" element={<AddNewKPI />} /> */}

        <Route path="*" element={<Login />} />
      </Routes>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
