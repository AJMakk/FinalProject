/* import '../../../CSS/register.css';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import FormContainer from '../../containers/FormContainer';
import api from '../../../api';
import Button from '@material-ui/core/Button';



export default function Register() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cityId, setCityId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
       setSubmitting(true);
       try {
        await api.register({
            firstName, lastName, cityId, email, password, confirmPassword
        });
        history.push('/')
    }catch {
        alert('Failed to Register');
    } finally {
        setSubmitting(false);
    }
       setTimeout(() => {
         setSubmitting(false);
       }, 3000)
     }

    return(
        <FormContainer title="Register" >
        <form>
            <div className="form-group">
                <label>First Name</label>
                <input 
                className="form-control" 
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input 
                className="form-control" 
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>city ID</label>
                <input 
                className="form-control" 
                type="number"
                value={cityId}
                onChange={e => setCityId(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input 
                className="form-control" 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input 
                className="form-control" 
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={submitting}>
                    {submitting? 'REGISTERING...' : 'Register'}
                </button>
            </div>
        </form>
        
        </FormContainer>
      )
   
}; */

import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../../api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cityId, setCityId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
     await api.register({
         firstName, lastName, cityId, email, password, confirmPassword
     });
     history.push('/')
    }
    catch {
     alert('Failed to Register');
    } 
    finally {
     setSubmitting(false);
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
    };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cityId"
                label="city ID"
                name="cityId"
                value={cityId}
                onChange={e => setCityId(e.target.value)}
                autoComplete="city-id"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#698736"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={submitting}>
            {submitting? 'Registering...' : 'Register'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}