import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import useStore from "../store/store";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const names = [
  "Confidentiality",
  "Integrity",
  "Authenticity",
  "Authorization",
  "Non-repudiation",
  "Availability",
];

const selector = (state) => ({
  nodeState: state.nodes,
  addNode: state.addNode,
});

function getStyles(name, nodes, theme) {
  return {
    fontWeight:
      nodes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddComponent = ({ open, handleClose }) => {
  const theme = useTheme();
  const [nodes, setNodes] = useState([]);
  const [nodeName, setNodename] = useState("");
  const { addNode, nodeState } = useStore(selector);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Id = nodeState.length;
    console.log("nodes.length", nodeState.length);
    const dataNode = {
      id: `${Id + 1}`,
      data: { label: nodeName },
      position: { x: 250, y: 200 },
      properties: nodes,
    };
    const dataEdge = {
      id: `e${Id + 1}-${Id + 2}`,
      source: `${Id + 1}`,
      target: `${Id + 2}`,
    };
    addNode(dataNode, dataEdge);
    handleClose();
    setNodes([]);
    setNodename("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add New "}</DialogTitle>
      <DialogContent >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2,my:1 }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setNodename(e.target.value)}
          />
          <FormControl sx={{ width:350 }}>
            <InputLabel notched id="demo-multiple-chip-label">Properties</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={nodes}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Properties" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, nodes, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="warning">cancel</Button>
        <Button variant="contained" onClick={handleSubmit}  disabled={!nodeName || !nodes.length>0}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddComponent;
