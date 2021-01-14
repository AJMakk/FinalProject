import React, {useState} from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container/Container';
import { makeStyles,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    homeContainer: {
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(-5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    homeMainText: {
      marginTop: theme.spacing(10),
      marginRight: theme.spacing(-31),
      backgroundColor:'clear' ,
      fontSize:'23px',
      fontWeight: 'bolder',

    },
    homeSideText: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(-34),
        backgroundColor:'clear' ,
        fontSize:'16px',
    },
    buttons: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(-30),
      },
    registerButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "20px",
        backgroundColor:'#E0E0E0',
        textTransform:'none',
      },
    allTechniciansButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "20px",
        backgroundColor:'#E0E0E0',
        textTransform:'none',
      },
  }));
  
export default function GuestHome() {
    const classes = useStyles();
    let history = useHistory();


    const redirectToRegister = () => {
        history.push("/register")
    }
    
    const redirectToAllTechnicians = () => {
        history.push("/alltradesmen")
    }
   
return (
    <Container className={classes.homeContainer}>
        <p className={classes.homeMainText}>Get a tradesman to your doorstep !</p>
        <p className={classes.homeSideText}>TradieFind helps you find the right expert for the job <b>hassle-free</b>.</p>
        <div className={classes.buttons}>
        <Button 
        className={classes.registerButton}
        onClick={redirectToRegister}
        >
            Join TradieFind Now!
        </Button>
        <Button 
        className={classes.allTechniciansButton}
        onClick={redirectToAllTechnicians}
        >
            See all the tradesmen available.
        </Button>

        </div>
       
    </Container>
)
    
};