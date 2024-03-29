import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  return (
    <nav>
      <AppBar component="nav" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", lexGrow: 1 }}
          >
            Task
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
