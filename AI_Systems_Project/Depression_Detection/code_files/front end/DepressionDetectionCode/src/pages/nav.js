import * as React from 'react';
import { FormGroup,AppBar, Menu, MenuItem, Switch,FormControlLabel,IconButton,Typography,Toolbar,Box, MenuList, Paper } from '@mui/material';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function MenuAppBar({logout,userDetails}) {
  let navigate = useNavigate();
  const [username,setUsername] = React.useState("");
  const path = window.location.pathname;
  const [openProfile, setOpenProfile] = React.useState(false);

  React.useEffect(()=>{
    setUsername(userDetails?.firstname + " " + userDetails?.lastname)
  },[userDetails])
  
  const handleChange = (event) => {
    setOpenProfile(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {

    axios.get("http://localhost:3001/logout",{withCredentials:true}).then((res)=>{
      logout();
    })

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#148a61' }} position="static" >
        <Toolbar style={{justifyContent:"space-between",display:"flex"}}>
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor:"pointer" }} onClick={()=>{navigate("/profileSettings")}}>
              Depression Detection
            </Typography>
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Typography variant="h6" onClick={()=>{navigate("/profileSettings")}} style={{cursor:"pointer",marginRight:"20px"}}>{userDetails?.firstname + " " + userDetails?.lastname}</Typography>
            <div>
              <FontAwesomeIcon  onClick={()=>{setOpenProfile(!openProfile)}} icon={faUser} style={{color: "#fff",cursor:"pointer",fontSize:"22px"}} />
              <div style={{position:"relative"}}>
              {openProfile && (
                <div style={{position:"absolute",top:"13px",right:"0px"}}>
                <Paper>
                  <MenuList
                    id="menu-appbar"

                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={()=>{navigate("/profileSettings")}} className={(path=="/profileSettings") ? "active":""} >Profile Settings</MenuItem>
                    <MenuItem onClick={()=>{navigate("/patientList")}} className={(path=="/patientList") ? "active":""}  >Patient List</MenuItem>
                    <MenuItem  onClick={()=>{navigate("/patientHistory")}} className={(path=="/patientHistory") ? "active":""}>Patient History</MenuItem>
                    <MenuItem  onClick={()=>{navigate("/session")}} className={(path=="/session") ? "active":""}>Conduct a Session</MenuItem>
                    <MenuItem style={{color:"red",cursor:"pointer"}} onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Paper>
                </div>
              )}
              </div>
            </div>

          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
