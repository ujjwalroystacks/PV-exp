import React from "react";
import { NavLink } from "react-router-dom";
import x from "./1.png";
import "../Style/Navbar.css";
// import { NavLink } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaArrowRight } from "react-icons/fa6";

const Navbar = () => {
  const y = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("kpmg_id");
    localStorage.removeItem("conversation");
    window.location = "/login";
  };

  const z = () => {
    window.location = "/landing";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className="navbar">
      <img
        src={x}
        width="70"
        height="30"
        alt=""
        style={{ marginLeft: "10vh", backgroundColor: " #0c233c," }}
        onClick={z}
      />

{/* <Button aria-describedby={id} variant="contained" onClick={handleClick}style={{backgroundColor:"#003380", marginLeft: "77%", boxShadow:"none"}}>
<LiveHelpOutlinedIcon style={{ color: "white", fontSize: "30px" }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}> <FaArrowRight /> Automate KPIs for quick data reconciliation.</Typography>
        <Typography sx={{ p: 2 }}><FaArrowRight /> Real-time revenue insights for proactive decision-making.</Typography>
        <Typography sx={{ p: 2 }}> <FaArrowRight /> Predict future trends with ML forecasting.</Typography>
        <Typography sx={{ p: 2 }}> <FaArrowRight /> Get interactive dashboards for data exploration.</Typography>
        <Typography sx={{ p: 2 }}> <FaArrowRight /> Ask questions with NLP-powered Co-Pilot.</Typography>
      </Popover> */}

      <NavLink
        to={"/login"}
        style={{
          marginLeft: "auto",
          marginRight: "2rem",
          color: "white",
          textDecoration: "none",
        }}
      >
        <LogoutIcon style={{ color: "white", fontSize: "30px" }} onClick={y}/>
      </NavLink>
    </div>
  );
};

export default Navbar;