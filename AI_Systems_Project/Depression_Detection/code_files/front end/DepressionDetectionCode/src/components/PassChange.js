import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";



const PassChange = () => {
    let [open,setOpen] = useState(false);
    let [currentPass,setCurrentPass] = useState("");
    let [newPassword,setNewPass] = useState("");
    let [reEnterPass,setReenterPass] = useState("");
    let [isError,setIsError] = useState(false);
    let [errorTxt,setErrorTxt] = useState("");

    const handleClick = () => {
        axios.post("http://localhost:3001/changePassword",{
            currentPassword:currentPass,
            newPassword:newPassword,
            reEnterPassword:reEnterPass
        },{withCredentials:true})
        .then((response)=>{
            setOpen(true);
            setCurrentPass("");
            setNewPass("");
            setIsError(false);
            setErrorTxt("");
            setReenterPass("");

        })
        .catch((error)=>{
            setIsError(true);
            setErrorTxt(error.response.data.split(",")[0])
        })
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Password Changed Successfully
            </Alert>
        </Snackbar>
        <form style={{margin:"0 auto",width:"450px"}} className="form" >
            <h3  className="sign-in" style={{marginBottom:"30px",color:"#148a61",fontSize:"48px"}}>Change Password</h3>
            <div style={{width:"100%",marginBottom:"8px"}}>
                <TextField
                    className=""
                    sx={{ width:"100%",input: { color: 'black',backgroundColor:"#dcdcdc" },label:{color:"black"} }}
                    color="primary"
                    variant="filled"
                    type="password"
                    label="Current Password"
                    value={currentPass}
                    onChange={(e)=>{setCurrentPass(e.target.value)}}
                    placeholder="Current Password"
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
                    type="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e)=>{setNewPass(e.target.value)}}
                    placeholder="New Password"
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
                    type="password"
                    label="Re-Enter Password"
                    value={reEnterPass}
                    onChange={(e)=>{setReenterPass(e.target.value)}}
                    placeholder="Re-Enter Password"
                    size="small"
                    margin="none"
                    required
                />
            </div>
            <div style={{width:"100%"}}>
                <Button
                    className="login-btn"
                    variant="contained"
                    onClick={handleClick}
                    color="success"
                    sx={{width:"100%"}}
                >
                Change
              </Button>
            </div>
            <div style={{width:"100%",margin:"10px 0 20px 0"}}>
                {(isError) ? (<div ><Alert severity="error">{errorTxt}</Alert> </div> ):null}
            </div>
        </form>
    </div>
    )

}

export default PassChange;