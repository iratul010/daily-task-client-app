import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Avatar, Tabs } from "@mui/material";

import { Container } from "@mui/system";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const drawerWidth = 240;

// let navItems = [
//   { name: "Home", link: "/" },
//   { name: "Add Task", link: "/addtask" },
//   { name: "My Task", link: "/mytask" },
//   { name: "Completed Task", link: "/completedtask" },
// ];
// navItems.map((item) => console.log(item.name));

export default function Navbar(props) {
  const { logOut, user } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then((res) => {})
      .error((err) => {
        console.log(err.message);
      });
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const menuItems = (
    <React.Fragment>
      <ListItem>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          <ListItemButton sx={{ textAlign: "start" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/addTasks" style={{ textDecoration: "none", color: "#333" }}>
          <ListItemButton sx={{ textAlign: "start" }}>
            <ListItemText primary="Add Tasks" />
          </ListItemButton>
        </Link>
      </ListItem>

      <>
        {user?.uid ? (
          <>
            <ListItem>
              <Link to="/myTasks" style={{ textDecoration: "none", color: "#333" }}>
                <ListItemButton sx={{ textAlign: "start" }}>
                  <ListItemText primary="My Tasks" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/completedTasks" style={{ textDecoration: "none", color: "#333" }}>
                <ListItemButton sx={{ textAlign: "start" }}>
                  <ListItemText primary="Completed Tasks" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link onClick={handleLogOut} style={{ textDecoration: "none", color: "#333" }}>
                <ListItemButton sx={{ textAlign: "start" }}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
              <ListItemButton sx={{ textAlign: "start" }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </>
    </React.Fragment>
  );
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "#76c893" }}>
          ADT-TASK
        </Link>
      </Typography>
      <Divider />
      <Box>{menuItems}</Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: "6rem" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                color="#fff"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block", textDecoration: "none" } }}
              >
                ADT-TASK
              </Typography>
            </Link>
            <Tabs value={0} sx={{ display: { xs: "none", sm: "block" } }}>
              {menuItems}
            </Tabs>
            <Switch {...label} defaultChecked sx={{ bgcolor: "primary.light", margin: "1rem" }} />
            {/* edit */}
            {user?.photoURL && <Avatar src={user?.photoURL} style={{ padding: 4, marginLeft: 3 }}></Avatar>}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav" style={{ backgroundColor: "#76c893" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
