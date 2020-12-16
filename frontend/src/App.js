import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import GuestHeader from './components/headers/guestHeader';
import CustomerHeader from './components/headers/customerHeader';

import Login from './components/pages/logIn';
import Register from './components/pages/customers/register';
import Logout from './components/pages/logOut';
import Home from './components/pages/home';


function Header() {
   if (!localStorage.getItem('AccessToken'))
   {
     return <GuestHeader />;
   }
   return <CustomerHeader />;
 }

function App() {
  return (
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router className="App__Container">
         <Header />
            <Switch>
               <Route exact path="/">
                  <Home></Home>
               </Route>
               <Route exact path="/login">
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
   </ThemeProvider>

);
}

export default App;
