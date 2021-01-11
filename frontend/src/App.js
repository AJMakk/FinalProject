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
import TechnicianHeader from './components/headers/technicianHeader';


import Login from './components/pages/logIn';
import Register from './components/pages/customers/register/register';
import Apply from './components/pages/technicians/apply/apply';
import Logout from './components/pages/logOut';
import Home from './components/pages/home';
import AllTechniciansTable from './components/pages/customers/search/allTechnicians';
import Results from './components/pages/customers/search/results';
import Appointments from './components/pages/customers/appointments/schedule';
import   CustomerProfile  from './components/pages/customers/profiles/profile';
import   TechnicianProfile  from './components/pages/technicians/profiles/profile';
import TechnicianSchedule from './components/pages/technicians/appointments/schedule';



function Header() {
   if (!localStorage.getItem('CustomerAccessToken'))
   {
      if (!localStorage.getItem('TechnicianAccessToken'))
      {
        return <GuestHeader />;
      } else {
         return <TechnicianHeader />;
      }
   } else {
      return <CustomerHeader />;
      }
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
               <Route exact path="/apply">
                  <Apply></Apply>
               </Route>
               <Route exact path="/logout">
                  <Logout></Logout>
               </Route>
               <Route exact path="/alltechnicians">
                  <AllTechniciansTable></AllTechniciansTable>
               </Route>
               <Route exact path="/search">
                  <Results></Results>
               </Route>
               <Route exact path="/customer/myappointments">
                  <Appointments></Appointments>
               </Route>
               <Route exact path="/customer/myprofile">
                  <CustomerProfile></CustomerProfile>
               </Route>
               <Route exact path="/technician/myschedule">
                  <TechnicianSchedule></TechnicianSchedule>
               </Route>
               <Route exact path="/technician/profile">
                  <TechnicianProfile></TechnicianProfile>
               </Route>
            </Switch>
      </Router>
   </ThemeProvider>

);
}

export default App;
