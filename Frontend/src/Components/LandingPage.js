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

const LandingPage = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [tlNames, setTlNames] = useState([]);
  const [selectedTLName, setSelectedTLName] = useState("");
  const [shopNames, setShopNames] = useState([]);
  const [selectedShopName, setSelectedShopName] = useState("");
  const [value, setValue] = React.useState(0);
  const [
    selectedMaterialDescription,
    setSelectedMaterialDescription,
  ] = useState([]);
  const [MaterialDescription, setMaterialDescription] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const isFullscreen = false;
  const [dataUri, setDataUri] = useState(null);
  const [cameraInputs, setCameraInputs] = useState([]);
  const [conditionInputs, setConditionInputs] = useState([]);
  const [quantityNoted, setQuantityNoted] = useState("");
  const [images, setImages] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [conditions, setConditions] = useState([]);
  const [capturedImages, setCapturedImages] = useState([]);


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

  // const handleCaptureClick = () => {
  //   setShowCamera(true); // Ensure camera is shown
  // };

  const handleCaptureClick = () => {
    if (photoCount < parseInt(quantityNoted, 10)) {
      setShowCamera(true);
    } else {
      alert("You have already captured the required number of photos.");
    }
  };

  // var array = [];
  // function handleTakePhotoAnimationDone() {
  //   setDataUri(dataUri);
  //   // console.log(x);
  //   array.push(dataUri);
  //   console.log(array);
  //   setShowCamera(false);
  //   // Handle storing the captured image data
  // }

  const handleTakePhotoAnimationDone = (dataUri) => {
    setShowCamera(false); // Hide camera after taking a photo
    setImages((prevImages) => [...prevImages, dataUri]); // Store captured image
    setPhotoCount((prevCount) => prevCount + 1); // Increment photo count
  };

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

  // const handleSubmit = async () => {
  //   const data = {
  //     teamMember: selectedTeamMember,
  //     tlName: selectedTLName,
  //     shopName: selectedShopName,
  //     materialDescription: selectedMaterialDescription,
  //     quantityNoted: document.getElementById("outlined-basic").value,
  //     size: document.getElementById("size-cal").value,
  //     condition: document.getElementById("item").value,
  //     yearOfPurchase: document.getElementById("yop").value,
  //     remarks: document.getElementById("remarks").value,
  //     importedImage: dataUri,
  //   };
  //   console.log(data);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/master/submit",
  //       data
  //     );
  //     console.log(response);

  //     // setSelectedTeamMember("");
  //     // setSelectedTLName("");
  //     // setTlNames([]);
  //     // setSelectedShopName("");
  //     // setShopNames([]);
  //     setSelectedMaterialDescription("");
  //     // setMaterialDescription([]);
  //     setDataUri(null);

  //     // Optionally, you can also clear the text inputs
  //     document.getElementById("outlined-basic").value = "";
  //     document.getElementById("size-cal").value = "";
  //     document.getElementById("item").value = "";
  //     document.getElementById("yop").value = "";
  //     document.getElementById("remarks").value = "";

  //     // Show a success message
  //     alert("Data submitted successfully");

  //     // setHighlightedItem(selectedMaterialDescription);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async () => {
    const data = {
      teamMember: selectedTeamMember,
      tlName: selectedTLName,
      shopName: selectedShopName,
      materialDescription: selectedMaterialDescription,
      quantityNoted: document.getElementById("outlined-basic").value,
      size: document.getElementById("size-cal").value,
      conditions: conditions,
      yearOfPurchase: document.getElementById("yop").value,
      remarks: document.getElementById("remarks").value,
      // importedImage: dataUri,
      importedImages: capturedImages, // Use captured images directly
    };

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:3001/master/submit",
        data
      );
      console.log(response);

      // Clear the states and input fields after submission
      setSelectedTeamMember("");
      setSelectedTLName("");
      setSelectedShopName("");
      setSelectedMaterialDescription("");
      setQuantityNoted("");
      setConditions([]);
      setImages([]);
      setDataUri(null);
      setCapturedImages([]);

      document.getElementById("outlined-basic").value = "";
      document.getElementById("size-cal").value = "";
      document.getElementById("item").value = "";
      document.getElementById("yop").value = "";
      document.getElementById("remarks").value = "";

      alert("Data submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const generateInputs = (quantity) => {
    // Reset the conditions array with empty strings for each input
    let initialConditions = new Array(quantity).fill(""); // Fill with empty string or a placeholder value
    setConditions(initialConditions);

    const inputs = initialConditions.map((condition, i) => (
      <div key={`condition${i}`} className="dropdown">
        <label htmlFor={`item${i}`}>Condition of Assets {i + 1}</label>
        <select
          id={`item${i}`}
          style={{ marginBottom: "0.5rem" }}
          value={conditions[i]}
          onChange={(e) => handleConditionChange(e, i)}
        >
          <option value="">Select</option>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Poor">Poor</option>
          <option value="Scrap">Scrap</option>
          <option value="NotFound">Not Found</option>
        </select>
      </div>
    ));

    setConditionInputs(inputs);
  };

  const handleConditionChange = (event, index) => {
    const newConditions = [...conditions];
    newConditions[index] = event.target.value;
    setConditions(newConditions);
  };

  useEffect(() => {
    if (parseInt(quantityNoted, 10) > 0) {
      generateInputs(parseInt(quantityNoted, 10));
    }
  }, [quantityNoted]);

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
            <label htmlFor="shopName">Material Description</label>
            <select
              id="materialdescription"
              value={selectedMaterialDescription}
              onChange={(e) => setSelectedMaterialDescription(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {Array.isArray(MaterialDescription) &&
                MaterialDescription.map((item, index) => (
                  <option
                    key={`shop_${item.id}_${index}`}
                    value={item}
                    // style={{
                    //   Color:
                    //     highlightedItem === item ? "green" : "transparent",
                    // }}
                  >
                    {item}
                  </option>
                ))}
            </select>
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
            onChange={(e) => setQuantityNoted(e.target.value)}
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
          {/* <div className="dropdown">
            <label htmlFor="item">Condition of Assets</label>
            <select id="item" style={{ marginBottom: "0.5rem" }}>
              <option value="Select"> Select </option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
              <option value="Scrap">Scrap</option>
              <option value="NotFound">Not Found</option>
            </select>
          </div> */}
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

          <div>
            {showCamera && (
              <Camera
                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                isFullscreen={false}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                idealResolution={{ width: 640, height: 480 }}
                imageType={IMAGE_TYPES.JPG}
                isImageMirror={false}
              />
            )}
            <Button
              variant="outlined"
              onClick={handleCaptureClick}
              style={
                {
                  /* Button styling */
                }
              }
            >
              Capture Photo
            </Button>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Captured ${index + 1}`}
                style={{ width: "100px", height: "100px" }}
              />
            ))}
            {conditionInputs}
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

export default LandingPage;
