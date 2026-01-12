import { Button, Dialog, DialogTitle } from "@mui/material";


function SimpleDialog({ open,setOpen1 ,depressionResult}) {

  const handleClose =() => {
    setOpen1(false)
  }
  

  
    return (
      <Dialog  open={open}>
        <div style={{width:"300px",padding:"10px 30px"}}>
          <h2 style={{textAlign:"center"}}>Session Outcome</h2>
          <div style={{textAlign:"center"}}>
            <p style={{fontSize:"20px"}}>{depressionResult}</p>
          </div>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dialog>
    );
  }


  export default SimpleDialog