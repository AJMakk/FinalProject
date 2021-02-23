import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import api from '../../../../api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        TechieFind
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function TechnicianRegister() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(0);
  const [techId, setTechId] = useState(0);
  const id = useParams();
  

  const handleSubmit = async () => {
    setSubmitting(true);
    const startDate = date + ' ' + startTime;
    const endDate = date + ' ' + endTime;
    const approved = 0;
    const rated = 0;
    

    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);
    console.log('location: ', location);
    console.log('userId: ', userId);
    console.log('techId: ', techId);
    console.log('approved: ', approved);

    try {
     await api.requestAppointment({
          title, startDate, endDate, location, userId, techId, approved, rated
     });
     history.push('/')
    }
    catch {
     alert('Failed to Submit Appointment Request');
    } 
    finally {
     setSubmitting(false);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
    };
    useEffect(() => {
      
      setUserId(localStorage.getItem('UsersId'));
      setTechId(id.id)
      
    }, []);
    
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Request An Appointment
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
                variant="outlined"
                size='small'
                required
                fullWidth
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                label="Description"
                type="string"
                id="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size='small'
                required
                fullWidth
                name="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                label="Location"
                type="string"
                id="location"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="appointmentDate"
                label="Appointment Date "
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="time"
                size='small'
                label="Starts At"
                min='09:00'
                max='19:00'
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                required
                fullWidth
                id="startAppointment"
                autoFocus
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                required
                fullWidth
                type="time"
                min='09:00'
                max='19:00'
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                label="Ends At "
                id="endAppointment"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            className={classes.submit}
            disabled={submitting}>
            {submitting? 'submitting appointment request...' : 'submit'}
          </Button>
         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}