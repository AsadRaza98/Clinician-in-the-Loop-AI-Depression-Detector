import { Button } from "@mui/material";
import "./Desktop1.css";
import Nav from "./nav";
import RenderRow from "../components/patientHistorySingle";
import { useEffect, useState } from "react";
import axios from "axios";





const PatientHistory = ({logout,userDetails}) => {
  let [patients,setPatients] = useState([]);
  let [session,setSession] = useState([]);
  let [patientClicked,setPatientClicked] = useState(["",""]);

  function getPatientsForUser(){
    axios.get("http://localhost:3001/patient",{withCredentials:true}).then((res)=>{
      console.log(res);
      setPatients(res.data);
    })
    .catch((err)=>{

    })
  }

  const getPatientSession = (patientId,patientName) => {
    setPatientClicked([patientId,patientName])
    axios.post(`http://localhost:3001/session/getOne`,{patientId},{withCredentials:true})
    .then((response)=>{
      setSession(response.data.session);
      console.log(response.data.session);
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getPatientsForUser();
  },[])
  return (
    <div style={{height:"100vh"}}>
      <Nav userDetails={userDetails} logout={logout}/>
      <div style={{height:"90.2%",display:"flex"}}>
        <div id="sidebar" style={{padding:"20px 0",height:"100%",width:"25%"}}>
          {(patients.length>0) ?
          patients.map((p)=>{
            return <div className={patientClicked[0]==p._id ? "active" : null} onClick={()=>{getPatientSession(p._id,p.patient_fname+" "+p.patient_lname)}}><RenderRow name={p.patient_fname+" "+p.patient_lname}/></div>
          })
          : <div style={{textAlign:"center"}}>No Patients yet</div>}
        </div>
        <div id="patientHistory" style={{width:"75%"}}>
          {(patientClicked[1].length>0) ? <h1 style={{fontSize:"30px",color:"black",textAlign:"center"}}>Patient History of {patientClicked[1]}</h1> : null}
          <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>{(session.length == 0 && patientClicked[1].length>0) ?
          "No session of this patient conducted yet"
            : session.map((sess,ind)=>{
              return (
                <div style={{padding:"10px 15px",margin:"6px 0",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(0,0,0,0.2)",height:"37px",width:"80%",display:"flex"}}>
                  <div>{ind+1}</div>
                  <div>{sess.result}</div>
                  <div>{sess.date ? new Date(sess.date).toLocaleString("en-GB",  {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "N/A"
                    }
                  </div>
                </div>
              )


              
            })
          }</div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
