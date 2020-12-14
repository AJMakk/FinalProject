import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AppContainer from '../containers/AppContainer.js';
import api from '../../api';
import {Link} from 'react-router-dom';


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
                    history.push('/home');
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
        <AppContainer title="Login">
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
                <button
                type="button"
                className="btn btn-success"
                onClick={onAddSubmit}
                disabled={loading}>
                    {loading? 'Logging in...' : 'Log in'}
                </button>
            </div>
            <div className="form-group">
                <Link
                    className="btn btn-register"
                    to={`/register`}>
                    Register
                </Link>
            </div>
            
        </form>
        </AppContainer>
    );
};
