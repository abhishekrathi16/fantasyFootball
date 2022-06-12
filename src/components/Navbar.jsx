import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Football from "../images/Football.png"

const Navbar = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{"background":"black"}}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={Football} alt="" style={{"height":"50px", "width":"60px", "margin":"15px"}}/>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Fantasy Football
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
