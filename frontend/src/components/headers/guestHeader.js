import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  makeStyles,
  Button,
 } from '@material-ui/core';
 import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(() => ({
  header: {
     backgroundColor: "#698736",
     paddingRight: "79px",
     paddingLeft: "118px",
  },

  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },

 /*  logo: {
    maxWidth: 200,
  }, */

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

const guestHeaderData = [
  
  {
    label: "Search For Technicians",
    href: "/search",
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

  const displayDesktop = () => {
    return (
       <Toolbar className={toolbar}>
       <Button
          {...{
            key: "logoHome",
            color:"inherit",
            to: "/",
            component: RouterLink,
            className: logo
          }} 
        >
        {TechieFindLogo}
        {/* <img src="TFlogo.png" alt="logo"  /> */}
        </Button>
       
        
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