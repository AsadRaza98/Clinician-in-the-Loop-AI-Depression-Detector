import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import PassChange from "../components/PassChange";

const ProfileSettings = ({userDetails,logout}) => {
    let [email,setEmail] = useState("");
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let [age,setAge] = useState("");
    let [city,setCity] = useState("");
    let [country,setCountry] = useState("");
    let [passChange,setPassChange] = useState(false);
    let [open,setOpen] = useState(false);
    let [isError,setIsError] = useState(false);
    let [errorTxt,setErrorTxt] = useState("");
    let [btnTxt,setBtnTxt] = useState("Change Password");

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    const getProfileSettings = () => {
        axios.get("http://localhost:3001/current",{withCredentials:true}).then((response)=>{
            setEmail(response.data.email);
            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setAge(response.data.age);
            setCity(response.data.city);
            setCountry(response.data.country);
        }).catch((err)=>{
            console.log(err)
        })
    } 

    useEffect(()=>{
        getProfileSettings();
    },[])

    const handleClick = () =>{
        axios.post("http://localhost:3001/editProfile",{
          firstname:firstName,
          lastname:lastName,
          email:email,
          age:(String(age)?.length == 0) ? undefined : age,
          city:(city?.length == 0) ? undefined : city,
          country:(country?.length == 0) ? undefined : country
        },{withCredentials:true})
        .then((response)=>{
            setIsError(false);
            setErrorTxt("");
            setOpen(true);
            getProfileSettings();
            
        })
        .catch((error)=>{
            if (error?.response?.status == 400){
                setIsError(true);
                setErrorTxt(error.response.data.split(",")[0])
              }
        })
    }
    return (
        <div>
            <Nav userDetails={userDetails} logout={logout}/>
            <Button
              className="login-btn"
              variant="contained"
              color="success"
              sx={{width:"200px",margin:"20px 5px"}}
              onClick={()=>{
                if (passChange){
                  setBtnTxt("Change Password");
                  getProfileSettings();
                }else {
                  setBtnTxt("Back")
                }
                setPassChange(!passChange);
                
              }}
            >
              {btnTxt}
            </Button>
            {(!passChange) ? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Profile Updated Successfully
                </Alert>
              </Snackbar>
              <form className="form" style={{width:"450px"}}>
              <h1 className="sign-in" style={{marginBottom:"30px",color:"#148a61"}}>Edit Profile</h1>
              <div style={{width:"100%",marginBottom:"8px"}}>
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="First Name"
                  value={firstName}
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  placeholder="First Name"
                  size="small"
                  margin="none"
                  required
                />
              </div>
              <div style={{width:"100%",marginBottom:"8px"}}>
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="Last Name"
                  value={lastName}
                  onChange={(e)=>{setLastName(e.target.value)}}
                  placeholder="Last Name"
                  size="small"
                  margin="none"
                  required
                />
              </div>
              <div style={{width:"100%",marginBottom:"8px"}}>

                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="Email"
                  disabled
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="Email"
                  size="small"
                  margin="none"
                  required
                />
              </div>
              <div style={{width:"100%",marginBottom:"8px"}}>

                  <TextField
                    className=""
                    sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                    color="primary"
                    variant="filled"
                    type="number"
                    label="Age"
                    id="outlined-disabled"
                    value={age}
                    onChange={(e)=>{setAge(e.target.value)}}
                    placeholder="Age"
                    size="small"
                    margin="none"
                    
                  /> 
                  
              </div>
              <div style={{width:"100%",marginBottom:"8px"}}>
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="City"
                  value={city}
                  onChange={(e)=>{setCity(e.target.value)}}
                  placeholder="City"
                  size="small"
                  margin="none"
                  
                />
              </div>
              <div style={{width:"100%",marginBottom:"8px"}}>
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="Country"
                  value={country}
                  onChange={(e)=>{setCountry(e.target.value)}}
                  placeholder="Country"
                  size="small"
                  margin="none"
                  
                />
              </div>

              <Button
                className="login-btn"
                variant="contained"
                onClick={handleClick}
                color="success"
                sx={{width:"100%"}}
              >
                Edit
              </Button>
              <div style={{width:"100%",margin:"10px 0 20px 0"}}>
              {(isError) ? (<div ><Alert severity="error">{errorTxt}</Alert> </div> ):null}
            </div>
            </form>

        </div>:<PassChange/>}
        </div>
    )
}

export default ProfileSettings