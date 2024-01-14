import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Typography } from "@mui/material";
import AddComponent from "./AddComponent";
import useStore from "../store/store";
import Details from "./details";

const drawerWidth = 180;

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState({});
  const { nodes, edges } = useStore(selector);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailsOpen = (text) => {
    setSelected(text);
    setOpenDetails(true);
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
  };

//   console.log("edges", edges);
  const drawer = (
    <div>
      <List>
        <Typography sx={{ fontSize: 18, fontWeight: 700, my:1 }}>
          Model View
        </Typography>
        {nodes.map((text, index) => (
          <ListItem key={text.id} disablePadding>
            <ListItemButton sx={{my:-0.5}}>
              <ListItemText
                onClick={() => handleDetailsOpen(text)}
                primary={text.data["label"]}
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        sx={{ mx: 1, px:1, fontSize: 12 ,fontWeight:600 }}
        onClick={handleOpen}
      >
        CREATE COMPONENT
      </Button>
      <AddComponent open={open} handleClose={handleClose} />
      {openDetails && selected && (
        <Details
          open={openDetails}
          handleClose={handleDetailsClose}
          text={selected}
        />
      )}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              position: "fixed",
              top: "4rem",
              border: "none",
              height:'fit-content',
              overflowY:'auto'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Sidebar;
