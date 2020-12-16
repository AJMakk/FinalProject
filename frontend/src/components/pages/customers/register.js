import '../../../CSS/register.css';
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
   
};