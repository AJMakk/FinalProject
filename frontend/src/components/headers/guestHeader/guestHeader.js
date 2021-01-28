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
import GuestDropDownMenu from './guestDropDownMenu';

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

  rightSideButtons: {
    display: "flex",
    justifyContent: "space-between",
  },

}));

const guestHeaderData = [
  
  {
    label: "All Tradesmen",
    href: "/guest/alltradesmen",
  },
  /* {
    label: <HelpIcon ></HelpIcon>,
    href: "/help",
  }, */
  {
    label: "Log In",
    href: "/login",
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
        <div className={classes.menuButton}>
          <GuestDropDownMenu></GuestDropDownMenu>
        </div>
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

