import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const SignUp = ({setIsError,setErrorTxt,login,setIsSignIn}) => {
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let navigate = useNavigate();

    const handleClick = (email,password,firstName,lastName) => {
        axios.post("http://localhost:3001/",{
          email:email,
          password:password,
          lastname:lastName,
          firstname:firstName,
        },{ withCredentials: true })
        .then((response)=>{
          setIsError(false);
          setErrorTxt("");
          login();
     //     navigate("/");
        })
        .catch((error)=>{
          if (error?.response?.status == 400){
            setIsError(true);
            setErrorTxt(error.response.data.split(",")[0])
          }
        })
      }


    return (
        <form className="form" style={{width:"450px"}}>
        <h1 className="sign-in" style={{marginBottom:"30px"}}>Sign Up</h1>
            <div style={{width:"100%",marginBottom:"8px"}}>
              <TextField
                className=""
                sx={{ width:"100%",input: { color: 'white' },label:{color:"white"} }}
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
                sx={{ width:"100%",input: { color: 'white' },label:{color:"white"} }}
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
                sx={{ width:"100%",input: { color: 'white' },label:{color:"white"} }}
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
              />
            </div>
            <div className="password" style={{width:"100%",marginBottom:"20px"}}>
              <TextField
                sx={{ width:"100%",input: { color: 'white' },label:{color:"white"} }}
                color="primary"
                variant="filled"
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                size="small"
                margin="none"
                required
              />
            </div>
            <Button
              className="login-btn"
              variant="contained"
              onClick={()=>{handleClick(email,password,firstName,lastName,)}}
              color="success"
              sx={{width:"100%"}}
            >
              login
            </Button>
            <div className="password-props">
              <div style={{height:"40px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <small style={{marginRight:"8px",textDecoration:"underline",cursor:"pointer",color:"#148a61"}} onClick={()=>{setIsSignIn(true)}} className="remember-me">Login</small>
              </div>
            </div> 
            </form>
    )
}


export default SignUp;