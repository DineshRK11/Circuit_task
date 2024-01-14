import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";


const labelStyle ={
    fontFamily:'sans-serif',
    fontWeight:500,
    color:"#000",    
}

const spanStyle= {
    fontWeight:600
}

const PositiveStyle={
    fontWeight:600,
    color:'green'
}

const NegativeStyle={
    fontWeight:600,
    color:'red'
}
export default function Details({ open, handleClose, text }) {
    console.log('text', text)
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{fontWeight:700 ,fontFamily:'sans-serif'}}>Model Details</DialogTitle>
        <Divider sx={{borderBottom:1 ,mx:2 }}/>
        <DialogContent>
            <div style={{display:'flex',flexDirection:"column",gap:"0.8rem"}}>
            <label style={labelStyle}>Name : <span style={spanStyle}>{text.data["label"]}</span></label>
            <label style={labelStyle}>Properties : <span style={spanStyle}>{text["properties"].join(", ")}</span></label>
            <label style={labelStyle}>Position-X : <span style={Math.sign(text["position"]['x'])===1?PositiveStyle:NegativeStyle}>{text["position"]['x'].toFixed(3)}</span></label>
            <label style={labelStyle}>Position-Y : <span style={Math.sign(text["position"]['y'])===1?PositiveStyle:NegativeStyle}>{text["position"]['y'].toFixed(3)}</span></label>
            </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"color="warning" onClick={handleClose} >Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
