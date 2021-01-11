import React from 'react';
import { useHistory } from "react-router-dom";
import api from '../../api';
import AppContainer from '../containers/AppContainer.js';
import Button from '@material-ui/core/Button';


export default function Logout() {
  let history = useHistory();

 
  const handleLogout = () => {
    api.logout().then(res => {
      console.log("res: ",res);
      
      localStorage.removeItem('CustomerAccessToken');
      localStorage.removeItem('UsersName');
      localStorage.clear();

      history.push("/");
      window.location.reload();
      alert(res.data.message) ;
    });
      
  }

  return (
    <AppContainer >
        <div class="logout-button-container">
            <Button id="logout-button" type="button" onClick={handleLogout}>
                logout
            </Button>
        </div>
    </AppContainer>
  );

}