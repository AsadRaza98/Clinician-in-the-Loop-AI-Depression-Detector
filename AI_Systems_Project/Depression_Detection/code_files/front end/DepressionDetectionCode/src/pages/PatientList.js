import { useEffect, useState } from "react";
import Nav from "./nav";
import axios from "axios";
import PatientListTodo from "../components/patientListFront";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import AddPatient from "../components/addPatient";





const PatientList = ({logout,userDetails}) => {
    let [patients,setPatients] = useState([]);
    let [showPatients,setShowPatients] = useState(true);
    let [btnTxt,setBtnTxt] = useState("Add a new Patient");
    let [open,setOpen] = useState(false);
    let [userdetails,setUserDetails] = useState({});
    let [isAdd,setIsAdd] = useState(true);

    function addPatient(){
      
      setShowPatients(!showPatients);
      if (showPatients == true ) {
        // add patient
        setShowPatients(false);
        setBtnTxt("Back");
        setUserDetails({});
        setIsAdd(true);
      }else {
        // show patient
        setShowPatients(true);
        setBtnTxt("Add a new Patient")
      }
    }

    const editPatient = (userdetails) => {
      setBtnTxt("Back");
      setShowPatients(false);
      setUserDetails(userdetails);
      setIsAdd(false);
    }
    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    function getPatientsForUser(){
      axios.get("http://localhost:3001/patient",{withCredentials:true}).then((res)=>{
        console.log(res);
        setPatients(res.data);
      })
      .catch((err)=>{

      })
    }

    useEffect(()=>{
      getPatientsForUser();
    },[])
  
    return (
    <div>
      <Nav userDetails={userDetails} logout={logout}/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Patient Added Successfully
        </Alert>
      </Snackbar>

      <Button
        className="login-btn"
        variant="contained"
        onClick={addPatient}
        color="success"
        sx={{width:"200px",margin:"20px 5px"}}
      >
        {btnTxt}
      </Button>

      {(showPatients == true) ? 
      <div>
        <div><h1 className="sign-in" style={{marginBottom:"30px",color:"#148a61"}}>Patient List</h1></div>
        <div style={{width:"80%",margin:"30px auto",display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}>
          
          {(patients.length > 0) ?  patients.map((patient)=>{
            return <PatientListTodo editPatient={editPatient} city={patient['contact']['from']['city']} country={patient['contact']['from']['country']} email={patient['contact']['email']} number={patient['contact']['number']} id={patient["_id"]} patientFirstName={patient['patient_fname']} patientLastName={patient['patient_lname']}/>
          }) : <Typography gutterBottom variant="h5" component="div">No Patients</Typography>}
        </div>
      </div>
      : <AddPatient isAdd={isAdd} userdetails={userdetails} setBtnTxt={setBtnTxt} setShowPatients={setShowPatients} getPatientsForUser={getPatientsForUser} setOpen={setOpen}/>}
    </div>
  );
};

export default PatientList;
