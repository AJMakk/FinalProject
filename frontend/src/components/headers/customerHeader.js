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

export default function CustomerHeader() {
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
    history.push("/customer/myprofile")
  }

  const handleAppointments = () => {
    history.push("/customer/myappointments")
  }

  const handleLogout = () => {
    api.logout().then(res => {
      console.log("res: ",res);
      
      localStorage.removeItem('AccessToken');
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
            <MenuItem onClick={handleAppointments}>My Appointments</MenuItem>
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

{/* <nav>
      <NavLink exact activeClassName="active"  to="/home">
        Home 
      </NavLink>
      <NavLink activeClassName="active"  to="/search">
        Search For Technicians
      </NavLink>
      <NavLink activeClassName="active"  to="/help">
        Help
      </NavLink>
      <NavLink activeClassName="active"  to="/notifications">
        Notifications
      </NavLink>
      <NavLink activeClassName="active"  to="/logout">
        Log Out
      </NavLink>
      <NavLink activeClassName="active"  to="/myprofile">
        My Profile
      </NavLink>
    </nav>  */}