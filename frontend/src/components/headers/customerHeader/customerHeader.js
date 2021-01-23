import React, {useState} from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  makeStyles,
  Button,
  fade,
  TextField
 } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from '@material-ui/icons/Chat';
import HelpIcon from '@material-ui/icons/Help';
import CustomerDropDownMenu from './customerDropDownMenu';
import NotificationsDropDownMenu from './notifications';


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
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  rightSideButtons: {
    display: "flex",
    justifyContent: "space-between",
  },

  badge: {
    position:'absolute',
    top:'-10px',
    right: '-10px',
  padding: '5px 10px',
  borderRadius: '50%',
  background: 'black',
  color: '#000001',
  }

}));

const customerHeaderData = [
  {
    label: "All Tradesmen",
    href: "/alltradesmen",
  },
  {
    label: <HelpIcon ></HelpIcon>,
    href: "/help",
  },
  {
    label: <ChatIcon ></ChatIcon>,
    href: "/customer/1/messages",
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
       {TradieFindLogo}
       {/* <img src="TFlogo.png" alt="logo"  /> */}
       </Button>
      
       <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onKeyPress={handleSearchKeypress}
              onChange={handleSearchChange}
              label="search for tradesmen here!"
              variant="standard"
            />
          </div>
      <div className={classes.rightSideButtons}>   
        <div>{getMenuButtons()}</div>
        <NotificationsDropDownMenu />
        <CustomerDropDownMenu></CustomerDropDownMenu>
      </div>  
      </Toolbar>
    );
  };
  
  const TradieFindLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      TradieFind
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

        {/* <div>
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
        </div>  */}