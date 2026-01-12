import { Alert, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {MDBInput} from "mdbreact";


const Mcq = ({id,ansMcqs,setAnsMcqs,question,options}) =>{
    

    
  return (
    <div style={{marginTop:"15px",marginBottom:"15px"}}>
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize:"25px"}}>{question}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={ansMcqs["answer_"+id]}
        onChange={(e)=>{
            setAnsMcqs({...ansMcqs,["answer_"+id]:e.target.value})
        }}
      >
        {options.map((option)=>{
            return <FormControlLabel  value={option[1]} control={<Radio/>} label={option[0]} />
        })}
      </RadioGroup>
    </FormControl>
  </div>
  )
};

export default Mcq;