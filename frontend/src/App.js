import './App.css';
import React from 'react';
import guestHeader from './components/headers/guestHeader';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';


import Login from './components/pages/logInPage';
import Register from './components/pages/customers/registerPage';
import Logout from './components/pages/logout';

function App() {
  return (
    <Router className="App__Container">
      <guestHeader/>
        <Switch>

            <Route exact path="/">
               <Login></Login>
            </Route>
            <Route exact path="/register">
               <Register></Register>
            </Route>
            <Route exact path="/logout">
               <Logout></Logout>
            </Route>

        </Switch>

    </Router>
);
}

export default App;
