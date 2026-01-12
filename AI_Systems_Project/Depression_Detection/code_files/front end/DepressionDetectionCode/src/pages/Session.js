import { Alert, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextareaAutosize } from "@mui/material";
import "./Desktop1.css";
import Nav from "./nav";
import axios from "axios";
import { useEffect, useState } from "react";
import {MDBInput} from "mdbreact";
import Mcq from "../components/mcq";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "../components/DepressionDialog";



const Session = ({logout,userDetails}) => {
  let [patients,setPatients] = useState([]);
  let [selectedPatient,setSelectedPatient] = useState(0);
  let [sessionTxt,setSessionTxt] = useState("");
  let [depressionResult,setDepressionResult] = useState("");
  let [isError,setIsError] = useState(false);
  let [errorTxt,setErrorTxt] = useState("");
  let [open,setOpen] = useState(false);
  let [value,setValue] = useState(""); 
  const [open1, setOpen1] = useState(false);


  const handleClose1 = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  let [ansMcqs,setAnsMcqs] = useState({
    answer_1:"",
    answer_2:"",
    answer_3:"",
    answer_4:"",
    answer_5:"",
    answer_6:"",
    answer_7:"",
    answer_8:"",
    answer_9:"",
  });

  useEffect(()=>{
    console.log(ansMcqs)
  },[ansMcqs])
  const questionnaire = [
    {
      id:1,
      question:"Interest or pleasure in doing things?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:2,
      question:"Feeling down, depressed, or hopeless?	",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:3,
      question:"Trouble falling or staying asleep, or sleeping too much?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:4,
      question:"Feeling tired or having little energy?	",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:5,
      question:"Poor appetite or overeating?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:6,
      question:"Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:7,
      question:"Trouble concentrating on things, such as reading the newspaper or watching television?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:8,
      question:"Moving or speaking so slowly that other people could have noticed?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    {
      id:9,
      question:"Thoughts that you would be better off dead, or of hurting yourself in some way?",
      options:[["Not at all","I am happy"],["Several days","I am Happy"],["More than half the days","I am depressed"],["Nearly every day","I am Depressed"]],
    },
    
  ];


  const removeAnswers = () => {
    setAnsMcqs({
      answer_1:"",
      answer_2:"",
      answer_3:"",
      answer_4:"",
      answer_5:"",
      answer_6:"",
      answer_7:"",
      answer_8:"",
      answer_9:"",
    })
  }

  

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    
    
  };

  const handleClick = ()=>{
    let mcqNotFilled = Object.values(ansMcqs).filter((a)=>{return a.length==0 || a==undefined || a==null})
    
    if (mcqNotFilled.length > 0){
      setIsError(true);
      setErrorTxt("MCQ's Not Filled")
    }
    else {
      let mcqString = Object.values(ansMcqs).join(".");
      axios.post("http://localhost:3001/session/add",{text:mcqString+"."+sessionTxt,patientId:selectedPatient,mcqString:mcqString},{withCredentials:true})
      .then((response)=>{
        setOpen(true);
        setIsError(false);
        setErrorTxt("");
        setOpen1(true);
        setDepressionResult(response.data.depressionResult)
        // setOpen(false);
        setSessionTxt("");
        setSelectedPatient(0);
        removeAnswers();
        console.log(response);


      }).catch((error)=>{
          setIsError(true);
          setErrorTxt(error.response.data.split(",")[0])
      })
    }
  }

  useEffect(()=>{
    axios.get("http://localhost:3001/patient",{withCredentials:true})
    .then((response)=>{
      setPatients(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <div>
      <Nav userDetails={userDetails} logout={logout}/>
      <div style={{marginTop:"30px",marginBottom:"20px"}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose}   severity="success" sx={{ width: '100%' }}>
          Session Added Successfully
        </Alert>
      </Snackbar>
      <SimpleDialog
        open={open1}
        setOpen1={setOpen1}
        onClose={handleClose1}
        depressionResult={depressionResult}
      />
        <h2  className="sign-in" style={{marginBottom:"30px",color:"#148a61",fontSize:"48px"}}>Psychologist Session</h2>
        <form style={{width:"50%",margin:"0 auto"}}>
          <div>
          <FormControl sx={{width:"225px"}}>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPatient}
              label="Patient"
              onChange={(e)=>{setSelectedPatient(e.target.value)}}
            >
              <MenuItem value={0}>Select One</MenuItem>
              {
                patients.map((patient)=>{
                  return (<MenuItem value={patient._id}>{patient.patient_fname} {patient.patient_lname}</MenuItem>)
                })
              }
            </Select>
          </FormControl>
          </div>
          <div>
              {
                questionnaire.map((ques)=>{
                  return <Mcq id={ques.id} value={value} ansMcqs={ansMcqs} setAnsMcqs={setAnsMcqs} question={ques.question} options={ques.options} />
                })
              }
          </div>
          <div>
            <textarea value={sessionTxt} onChange={(e)=>{setSessionTxt(e.target.value)}} id="textArea" placeholder="Enter Text" style={{maxWidth:"1000px",fontFamily:"sans-serif",padding:"10px 6px",minWidth:"200px",minHeight:"200px",border:"1px solid lightgray",borderRadius:"5px",marginTop:"30px",width:"100%"}}></textarea>
          </div>
          <div style={{marginTop:"10px"}}>
            <Button
              className="login-btn"
              variant="contained"
              color="success"
              sx={{width:"100%"}}
              onClick={handleClick}
            >
              Send
            </Button>
          </div>
          <div style={{width:"100%",margin:"10px 0 20px 0"}}>
              {(isError) ? (<div ><Alert severity="error">{errorTxt}</Alert> </div> ):null}
            </div>
        </form>

      </div>
    </div>
  );
};

export default Session;