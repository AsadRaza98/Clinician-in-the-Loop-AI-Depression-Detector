import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function PatientListFront({id,patientFirstName,patientLastName,email,number,city,country,editPatient}) {
  return (
    <Card sx={{ width:320,paddingTop:"20px", maxWidth: 345,margin:"15px" }}>
      <CardActionArea>
		<div style={{display:"flex",justifyContent:"center"}}>
			<FontAwesomeIcon style={{fontSize:"120px", color:"#1e3050"}} icon={faBrain}/>
		</div>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {patientFirstName} {patientLastName}
          </Typography>
		  <div style={{padding:"7px 0 3px 0"}}>
			<Typography variant="h6" sx={{marginBottom:"4px"}} color="text.secondary">
				Contact Details :
			</Typography>
			<Typography variant="p"   color="text.secondary">
				Email: {email}
			</Typography><br/>
			<Typography variant="p"  color="text.secondary">
				Phone: {number}
			</Typography><br/>
			<Typography variant="p"   color="text.secondary">
				{city},{country}
			</Typography>
		  </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button style={{cursor:"pointer"}} onClick={()=>{let userdetails ={id:id,firstName:patientFirstName,lastName:patientLastName,email,number,city,country};editPatient(userdetails)}} size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}