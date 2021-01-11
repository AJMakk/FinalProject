import React, {useState} from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container/Container';
import { makeStyles,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    homeContainer: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    homeMainText: {
      marginTop: theme.spacing(10),
      marginRight: theme.spacing(53),
      backgroundColor:'clear' ,
      fontSize:'23px',
      fontWeight: 'bolder',

    },
    homeSideText: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(35),
        backgroundColor:'clear' ,
        fontSize:'16px',
    },
    buttons: {
        marginRight: theme.spacing(47),
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
  
export default function Home() {
    const classes = useStyles();
    let history = useHistory();


    const redirectToRegister = () => {
        history.push("/register")
    }
    
    const redirectToAllTechnicians = () => {
        history.push("/alltechnicians")
    }
   
return (
    <Container className={classes.homeContainer}>
        <p className={classes.homeMainText}>Get a technician to your doorstep !</p>
        <p className={classes.homeSideText}>TechieFind helps you find the right technician for the job hassle-free.</p>
        <div className={classes.buttons}>
        <Button 
        className={classes.registerButton}
        onClick={redirectToRegister}
        >
            Join TechieFind Now!
        </Button>
        <Button 
        className={classes.allTechniciansButton}
        onClick={redirectToAllTechnicians}
        >
            See all the technicians available.
        </Button>

        </div>
       
    </Container>
)
    
};