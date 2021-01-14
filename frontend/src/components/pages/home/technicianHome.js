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
      marginTop: theme.spacing(7),
      marginRight: theme.spacing(-36),
      backgroundColor:'clear' ,
      fontSize:'23px',
      fontWeight: 'bolder',

    },
    homeSideText: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(-35.4),
        backgroundColor:'clear' ,
        fontSize:'16px',
    },
    buttons: {
        marginTop: theme.spacing(4),
        marginRight: theme.spacing(-31.4),
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
  
export default function TechnicianHome() {
    const classes = useStyles();
    let history = useHistory();

    const UsersName = localStorage.getItem('UsersName')
    
    const redirectToProfile = () => {
        history.push("/tradesman/profile")
    }
    
    const redirectToTechnicianSchedule = () => {
        history.push("/tradesman/myschedule")
    }
   
return (
    <Container className={classes.homeContainer}>
        <p className={classes.homeMainText}>Welcome {UsersName}, Your next job awaits !</p>
        <p className={classes.homeSideText}>TradieFind helps you find jobs <b>quicker</b> and <b>easier</b>.</p>
        <div className={classes.buttons}>
        <Button 
        className={classes.registerButton}
        onClick={redirectToProfile}
        >
            Go To Your Profile !
        </Button>
        <Button 
        className={classes.allTechniciansButton}
        onClick={redirectToTechnicianSchedule}
        >
            Check Your Schedule.
        </Button>

        </div>
       
    </Container>
)
    
};