import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


const AddPatient = ({setShowPatients,setBtnTxt,getPatientsForUser,setOpen,userdetails,isAdd}) => {
    let [email,setEmail] = useState(userdetails?.email);
    let [firstName,setFirstName] = useState(userdetails?.firstName);
    let [lastName,setLastName] = useState(userdetails?.lastName);
    let [number,setNumber] = useState(userdetails?.number);
    let [city,setCity] = useState(userdetails?.city);
    let [country,setCountry] = useState(userdetails?.country);
    let [isError,setIsError] = useState("");
    let [errorTxt,setErrorTxt] = useState("");
    



    const handleClick = () => {
        if (isAdd == true){
            axios.post("http://localhost:3001/patient/add",{
              email:email,
              city:city,
              country:country,
              number:number,
              patient_lname:lastName,
              patient_fname:firstName,
           //   age:age
            },{ withCredentials: true })
            .then((response)=>{
              setIsError(false);
              setErrorTxt("");
              setShowPatients(true);
              setBtnTxt("Add a new Patient");
              getPatientsForUser();
              setOpen(true);
            })
            .catch((error)=>{
              if (error?.response?.status == 400){
                setIsError(true);
                setErrorTxt(error.response.data.split(",")[0])
              }
            })
        }else {
            axios.post("http://localhost:3001/patient/edit",{
              email:email,
              city:city,
              country:country,
              number:number,
              patient_lname:lastName,
              patient_fname:firstName,
              id:userdetails.id
           //   age:age
            },{ withCredentials: true })
            .then((response)=>{
              setIsError(false);
              setErrorTxt("");
              setShowPatients(true);
              setBtnTxt("Add a new Patient");
              getPatientsForUser();
              setOpen(true);
            })
            .catch((error)=>{
              if (error?.response?.status == 400){
                setIsError(true);
                setErrorTxt(error.response.data.split(",")[0])
              }
            })
        }
      }



    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <form className="form" style={{width:"450px"}}>
        <h1 className="sign-in" style={{marginBottom:"30px",color:"#148a61"}}>{isAdd ? "Add A Patient": "Edit Patient"}</h1>
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
              {isAdd?
              <TextField
                className=""
                sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                color="primary"
                variant="filled"
                type="text"
                label="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Email"
                size="small"
                margin="none"
                required
              />:
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
              }
            </div>
            <div style={{width:"100%",marginBottom:"8px"}}>
                {isAdd?
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  value={number}
                  onChange={(e)=>{setNumber(e.target.value)}}
                  placeholder="Phone Number"
                  size="small"
                  margin="none"
                  required
                /> :
                <TextField
                  className=""
                  sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                  color="primary"
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  disabled
                  id="outlined-disabled"
                  value={number}
                  onChange={(e)=>{setNumber(e.target.value)}}
                  placeholder="Phone Number"
                  size="small"
                  margin="none"
                  required
                /> 
                
                }
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
                label="Country"
                value={country}
                onChange={(e)=>{setCountry(e.target.value)}}
                placeholder="Country"
                size="small"
                margin="none"
                required
              />
            </div>

            <Button
              className="login-btn"
              variant="contained"
              onClick={handleClick}
              color="success"
              sx={{width:"100%"}}
            >
              {isAdd ? "Add" : "Edit"}
            </Button>
            <div style={{width:"100%",margin:"10px 0 20px 0"}}>
            {(isError) ? (<div ><Alert severity="error">{errorTxt}</Alert> </div> ):null}
            </div>
            </form>
        </div>
    )
}


export default AddPatient;