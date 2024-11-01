import React from "react";
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useThemeToggle } from "./ThemeToggleProvider";

const drawerWidth = 240;

function DashboardLayoutBasic() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleTheme = useThemeToggle();
  const [darkMode, setDarkMode] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const storedUser = localStorage.getItem("user");
  let parsedUser;
  if (storedUser) {
    parsedUser = JSON.parse(storedUser);
    console.log(parsedUser);
    // use the parsedUser object
  } else {
    parsedUser = "Not yer Recived";
    // handle the case where the value is not set
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    toggleTheme();
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Dashboard", "Orders", "Reports"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <DashboardIcon />
              ) : index === 1 ? (
                <ShoppingCartIcon />
              ) : (
                <BarChartIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>

          {/* Align to the right */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {/* Theme Toggle */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="toggle theme"
              onClick={handleToggle}
              sx={{ mr: 2 }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Message and Notification Icons */}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="profile"
              onClick={handleProfileClick}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  margin: 0,
                  padding: 10,
                }}
              >
                {parsedUser.fullName}
              </p>
              <Avatar alt="User Profile" src="/path-to-profile-pic.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
              <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Welcome to the Dashboard! Mr. {parsedUser.full_name}
        </Typography>
        <Typography paragraph>
          Add your main dashboard content here.{parsedUser.email}
        </Typography>
      </Box>
    </Box>
  );
}

export default DashboardLayoutBasic;
