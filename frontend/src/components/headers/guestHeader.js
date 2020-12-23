import React, {useState} from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  makeStyles,
  Button,
  fade,
  TextField,
 } from '@material-ui/core';
 import SearchIcon from "@material-ui/icons/Search";
 import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  header: {
     
     background: 'none',
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

 /*  logo: {
    maxWidth: 200,
  }, */

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

}));

const guestHeaderData = [
  
  {
    label: "All Technicians",
    href: "/alltechnicians",
  },
  {
    label: <HelpIcon ></HelpIcon>,
    href: "/help",
  },
  {
    label: "Log In",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
];

export default function GuestHeader() {
  const { header, logo, menuButton, toolbar } = useStyles();
  const classes = useStyles();
  const [filter, setFilter] = useState("");

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
    return guestHeaderData.map(({label, href}) => {
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
<NavLink activeClassName="active"  to="/login">
  Log In
</NavLink>
<NavLink activeClassName="active"  to="/register">
  Register
</NavLink>
</nav> */}