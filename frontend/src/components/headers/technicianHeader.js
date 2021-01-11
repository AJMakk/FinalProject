/* import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  makeStyles,
  Button,
 } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
     backgroundColor: "#400CCC",
     paddingRight: "79px",
     paddingLeft: "118px",
  },

  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },

  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

}));

const technicianHeaderData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Schedule Management",
    href: "/schedule",
  },
  {
    label: "Help",
    href: "/help",
  },
  {
    label: "Notifications",
    href: "/notifications",
  },
  {
    label: "My Profile",
    href: "/myprofile",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

export default function TechnicianHeader() {
  const { header, logo, menuButton, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
       <Toolbar className={toolbar}>
       {TechieFindLogo}
       <div>{getMenuButtons()}</div>
       </Toolbar>
    );
  };
  
  const TechieFindLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      TechieFind
    </Typography> 
    );

  const getMenuButtons = () => {
    return technicianHeaderData.map(({label, href}) => {
      return (
        <Button
          {...{
            key: label,
            color:"inherit",
            to: href,
            component: RouterLink,
            className: menuButton
          }} 
        >
        {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {displayDesktop()}
      </AppBar>
    </header>
  );
} */

import React, {useState} from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import api from '../../api';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  makeStyles,
  Button,
  fade,
  TextField,
 } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(() => ({
  header: {
     background: "none",
     paddingRight: "79px",
     paddingLeft: "118px",
  },

  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "black",
    textAlign: "left",
  },

  searchContainer: {
    display: "flex",
    backgroundColor: fade('#00000', 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "-15px",
    marginBottom: "5px",
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    color:'#000000'
  },

  searchInput: {
    width: "250px",
    margin: "5px",
  },

  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "20px",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  rightSideButtons: {
    display: "flex",
    justifyContent: "space-between",
  },

}));

const customerHeaderData = [
  {
    label: "All Technicians",
    href: "/alltechnicians",
  },
  {
    label: <HelpIcon ></HelpIcon>,
    href: "/help",
  },
  {
    label: <NotificationsIcon></NotificationsIcon>,
    href: "/notifications",
  },
];

export default function TechnicianHeader() {
  const { header, logo, menuButton, toolbar } = useStyles();
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      history.push("/search");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push("/technician/profile")
  }

  const handleAppointments = () => {
    history.push("/technician/myschedule")
  }

  const handleLogout = () => {
    api.logout().then(res => {
      console.log("res: ",res);
      
      localStorage.removeItem('TechnicianAccessToken');
      localStorage.removeItem('UsersName');
      localStorage.clear();

      history.push("/");
      window.location.reload();
      alert(res.data.message) ;
    });
      
}
  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
      <Button
         {...{
           key: "logoHome",
           color:"black",
           to: "/",
           component: RouterLink,
           className: logo
         }} 
       >
       {TechieFindLogo}
       {/* <img src="TFlogo.png" alt="logo"  /> */}
       </Button>
      
       <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onKeyPress={handleSearchKeypress}
              onChange={handleSearchChange}
              label="search for technicians here!"
              variant="standard"
            />
          </div>
      <div className={classes.rightSideButtons}>   
        <div>{getMenuButtons()}</div>
        <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <AccountCircleIcon></AccountCircleIcon>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>My Profile</MenuItem>
            <MenuItem onClick={handleAppointments}>Schedule Management</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div> 
      </div>  
      </Toolbar>
    );
  };
  
  const TechieFindLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      TechieFind
    </Typography> 
    );

  const getMenuButtons = () => {
    return customerHeaderData.map(({label, href}) => {
      return (
        <Button
          {...{
            key: label,
            color:"black",
            to: href,
            component: RouterLink,
            className: menuButton
          }} 
        >
        {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header} elevation={0}>
        {displayDesktop()}
      </AppBar>
    </header>
  );
}

 
