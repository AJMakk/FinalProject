/* import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import FormContainer from '../containers/FormContainer.js';
import api from '../../api';
import Button from '@material-ui/core/Button';



export default function Login() {

    
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api
            .login({
                email, password
            })
            .then(res=> {
                if (!res.data.user) {
                    alert(res.data.message)
                }
                else {
                    localStorage.setItem('AccessToken', res.data.access_token);
                    localStorage.setItem('UsersName', res.data.user.name);
                    console.log("res: ",res.data.access_token);
                    history.push('/');
                    window.location.reload();
                }
            });
        }catch {
            alert('Failed to Login');
        } finally {
            setLoading(false);
        }
    };

    if (localStorage.getItem('AccessToken')) {
        return (
            
            <h6><b>You are already logged in !</b></h6>   
        );
    }

    return (
        <FormContainer title="">
        <form>
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
                <Button
                type="button"
                variant="contained" 
                color="primary"
                className="btn btn-success"
                onClick={onAddSubmit}
                disabled={loading}>
                    {loading? 'Logging in...' : 'Log in'}
                </Button>
            </div>
            <div className="form-group">
                <Link
                    className="btn btn-register"
                    to={`/register`}>
                   Don't have an account? Register!
                </Link>
            </div>
            
        </form>
        </FormContainer>
    );
};
 */
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import api from '../../api';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onAddSubmit = async () => {
    setLoading(true);
    try {
        await api
        .login({
            email, password
        })
        .then(res=> {
            if (!res.data.user) {
                alert(res.data.message)
            }
            else {
                localStorage.setItem('AccessToken', res.data.access_token);
                localStorage.setItem('UsersName', res.data.user.name);
                console.log("res: ",res.data.access_token);
                history.push('/');
                window.location.reload();
            }
        });
    }catch {
        alert('Failed to Login');
    } finally {
        setLoading(false);
    }
};

if (localStorage.getItem('AccessToken')) {
    return (
        
        <h6><b>You are already logged in !</b></h6>   
    );
}

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            value= {email}
            onChange={e => setEmail(e.target.value)}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="#698736"
            className={classes.submit}
            onClick={onAddSubmit}
            disabled={loading}>
            {loading? 'Logging in...' : 'Log In'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="passwordreset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}