import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Style/LandingPage.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Camera, { IMAGE_TYPES, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import HomeIcon from "@mui/icons-material/Home";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Additem = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [tlNames, setTlNames] = useState([]);
  const [selectedTLName, setSelectedTLName] = useState("");
  const [shopNames, setShopNames] = useState([]);
  const [selectedShopName, setSelectedShopName] = useState("");
  const [value, setValue] = React.useState(0);
  const [selectedMaterialDescription, setSelectedMaterialDescription] =
    useState([]);
  const [MaterialDescription, setMaterialDescription] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const isFullscreen = false;

  const [dataUri, setDataUri] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/master/");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeamMemberChange = async (event) => {
    const teamMember = event.target.value;
    setSelectedTeamMember(teamMember);
    setSelectedTLName("");
    setTlNames([]);
    setSelectedShopName("");
    setShopNames([]);
    setMaterialDescription([]);
    await getTL(teamMember);
  };

  const handleTLNameChange = async (event) => {
    const tlName = event.target.value;
    setSelectedTLName(tlName);
    setSelectedShopName("");
    setShopNames([]);
    setMaterialDescription([]);

    await getShop(tlName, selectedTeamMember);
  };

  const handleShopNameChange = async (event) => {
    const shopName = event.target.value;
    setSelectedShopName(shopName);
    setSelectedMaterialDescription("");
    setMaterialDescription([]);

    await getMaterialDescription(selectedTLName, shopName);
  };

  const getTL = async (teamMember) => {
    try {
      const response = await axios.get(`http://localhost:3001/master/tl`, {
        params: { teamMember },
      });
      setTlNames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getShop = async (tlName, teamMember) => {
    try {
      const response = await axios.get(`http://localhost:3001/master/shop`, {
        params: { tlName, teamMember },
      });
      setShopNames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleCaptureClick() {
    setShowCamera(true);
  }

  function handleTakePhotoAnimationDone(dataUri) {
    setDataUri(dataUri);
    setShowCamera(false);
    // Handle storing the captured image data
  }

  const getMaterialDescription = async (tlName, shopName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/master/materialdescription`,
        {
          params: { tlName, shopName },
        }
      );
      setMaterialDescription(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      teamMember: selectedTeamMember,
      tlName: selectedTLName,
      shopName: selectedShopName,
      materialDescription: selectedMaterialDescription,
      quantityNoted: document.getElementById("outlined-basic").value,
      size: document.getElementById("size-cal").value,
      condition: document.getElementById("item").value,
      yearOfPurchase: document.getElementById("yop").value,
      remarks: document.getElementById("remarks").value,
      importedImage: dataUri,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3001/master/submit",
        data
      );
      console.log(response);

      setSelectedTeamMember("");
      setSelectedTLName("");
      setTlNames([]);
      setSelectedShopName("");
      setShopNames([]);
      setSelectedMaterialDescription("");
      setMaterialDescription([]);
      setDataUri(null);

      // Optionally, you can also clear the text inputs
      document.getElementById("outlined-basic").value = "";
      document.getElementById("size-cal").value = "";
      document.getElementById("item").value = "";
      document.getElementById("yop").value = "";
      document.getElementById("remarks").value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/landing":
        setValue(0);
        break;
      case "/additem":
        setValue(1);
        break;
      case "/submissions":
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div>
        <div className="curved-card">
          <div className="dropdown">
            <label htmlFor="teamMember">Team Member</label>
            <select
              id="teamMember"
              onChange={handleTeamMemberChange}
              value={selectedTeamMember}
            >
              <option value="" disabled>
                Select
              </option>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <option key={`team_${item.id}_${index}`} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="tlName">TL Name</label>
            <select
              id="tlName"
              onChange={handleTLNameChange}
              value={selectedTLName}
            >
              <option value="" disabled>
                Select
              </option>
              {Array.isArray(tlNames) &&
                tlNames.map((item, index) => (
                  <option key={`tl_${item.id}_${index}`} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="shopName">Shop Name</label>
            <select
              id="shopName"
              value={selectedShopName}
              onChange={(e) => handleShopNameChange(e)}
            >
              <option value="" disabled>
                Select
              </option>
              {Array.isArray(shopNames) &&
                shopNames.map((item, index) => (
                  <option key={`shop_${item.id}_${index}`} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="dropdown">
          <label htmlFor="materialDescription" style={{ marginBottom: "0.7rem" }}>
            Material Description
          </label>
          <TextField
            id="outlined-basic"
            label="Material Description"
            variant="outlined"
            style={{ width: "100%", marginBottom: "0.5rem" }}
            size="small"
          />
          </div>
          <label htmlFor="quantityNoted" style={{ marginBottom: "0.7rem" }}>
            Quantity Noted
          </label>
          <TextField
            id="outlined-basic"
            label="Quantity Noted"
            variant="outlined"
            style={{ width: "100%", marginBottom: "1.5rem" }}
            size="small"
          />
          <label htmlFor="size-cal" style={{ marginBottom: "0.7rem" }}>
            Size (Left to Right in ft){" "}
          </label>
          <TextField
            id="size-cal"
            label="Size (Left to Right in Feet)"
            variant="outlined"
            style={{ width: "100%", marginBottom: "1.5rem" }}
            size="small"
          />
          <div className="dropdown">
            <label htmlFor="item">Condition of Assets</label>
            <select id="item" style={{ marginBottom: "0.5rem" }}>
              <option value="Select"> Select </option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
              <option value="Scrap">Scrap</option>
              <option value="NotFound">Not Found</option>
            </select>
          </div>
          <label htmlFor="yop" style={{ marginBottom: "0.7rem" }}>
            Year of Purchase
          </label>
          <TextField
            id="yop"
            label="Year of Purchase"
            variant="outlined"
            style={{ width: "100%", marginBottom: "1rem" }}
            size="small"
          />

          {/* <input type="file" accept="image/*" capture="environment" />
          <br /> */}
          <div>
            {showCamera && (
              <Camera
                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                isFullscreen={isFullscreen}
                ref={cameraRef}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                idealResolution={{ width: 640, height: 480 }}
                imageType={IMAGE_TYPES.JPG}
                isImageMirror={false}
                sizeFactor={1}
              />
            )}
            <Button
              variant="outlined"
              style={{
                marginTop: "1em",
                marginBottom: "0em",
                width: "fit-content",
                color: "#003380",
                border: "1px solid #003380",
                borderRadius: "2rem",
                // marginRight: "1rem",
              }}
              onClick={handleCaptureClick}
            >
              Capture Photo
            </Button>
            {dataUri &&
              (console.log(dataUri),
              (
                <div>
                  <h3>Preview:</h3>
                  <img src={dataUri} className="picture" alt="Captured" />
                </div>
              ))}
          </div>
          <TextField
            id="remarks"
            label="Remarks"
            variant="outlined"
            style={{ width: "100%", marginTop: "2rem" }}
            size="small"
          />
          <br />
          <Button
            variant="outlined"
            style={{
              marginTop: "3em",
              marginBottom: "1em",
              width: "9rem",
              color: "#003380",
              border: "1px solid #003380",
              borderRadius: "2rem",
              marginRight: "1rem",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Box sx={{ width: "100%" }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction 
              label="Home" 
              icon={<HomeIcon />}
              component={Link}
                  to="/landing"
                   />

              <BottomNavigationAction
                label="Additional"
                icon={<AddToPhotosIcon />}
                  component={Link}
                  to="/additem"
              />
              <BottomNavigationAction
                label="Submissions"
                icon={<RestoreIcon />}
              />
            </BottomNavigation>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Additem;

