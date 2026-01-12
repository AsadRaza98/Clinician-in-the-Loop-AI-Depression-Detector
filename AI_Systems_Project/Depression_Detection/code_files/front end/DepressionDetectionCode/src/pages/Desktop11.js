import { useEffect, useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Input,
  Alert,
  Icon,
} from "@mui/material";
import "./Desktop11.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUp from "./Signup";




const Desktop1 = ({login}) => {
  const navigate = useNavigate();
  const handleClick = (email,password) => {
    axios.post("http://localhost:3001/login",{
      email:email,
      password:password
    },{ withCredentials: true })
    .then((response)=>{
      setIsError(false);
      setErrorTxt("");
      login();
     // navigate("/");
    })
    .catch((error)=>{
      if (error?.response?.status == 400){

      setIsError(true);
      setErrorTxt(error.response.data)
      }
    })
  }
  let [isError,setIsError] = useState(false)
  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("");
  let [errorTxt,setErrorTxt] = useState("");
  let [isSignIn,setIsSignIn] = useState(true);
  
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className="desktop-11">
      <div className="dashboard-login-dark-theme">
        <div class="main-signin">
          <div>
          { isSignIn &&
          <form className="form" style={{width:"450px"}}>
            <h1 className="sign-in" style={{marginBottom:"30px"}}>Sign in</h1>
            <div style={{width:"100%",marginBottom:"15px"}}>
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
                size="medium"
                margin="none"
                required
              />
            </div>
            <div className="password" style={{width:"100%",marginBottom:"40px"}}>
              <TextField
                sx={{ width:"100%",input: { color: 'white' },label:{color:"white"} }}
                color="primary"
                variant="filled"
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                size="medium"
                margin="none"
                required
              />
            </div>
            <Button
              className="login-btn"
              variant="contained"
              onClick={()=>{handleClick(email,password)}}
              color="success"
              sx={{width:"100%"}}
            >
              login
            </Button>
             <div className="password-props">
              <div style={{height:"40px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <small style={{marginRight:"8px",textDecoration:"underline",cursor:"pointer",color:"#148a61"}} onClick={()=>{setIsSignIn(false)}} className="remember-me">Sign Up</small>
              </div>
            </div> 
          </form>
          }
          {!isSignIn && 
            <SignUp login={login} setIsError={setIsError} setErrorTxt={setErrorTxt} setIsSignIn={setIsSignIn}/>
          }
            <div>
            {(isError) ? (<div style={{position:"relative",top:"25px"}}><Alert severity="error">{errorTxt}</Alert> </div> ):null}
            </div>
            </div>
          <div>
            <img
              className="psichologo-konsult-1-869x550-r-icon"
              alt="Phycologist sitting with patient"
              loading="eager"
              src="../psichologo-konsult1869x550removebgpreview-1@2x.png"
            />
          </div>
        </div>
        
        <div className="vectors-icon">
          <img style={{width:"100%"}} alt="" src="../vectors.svg" />
        </div>

      </div>
    </div>
  );
};

export default Desktop1;
