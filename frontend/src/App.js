import React from 'react';
import Pusher from 'pusher-js';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import GuestHeader from './components/headers/guestHeader/guestHeader';
import CustomerHeader from './components/headers/customerHeader/customerHeader';
import TechnicianHeader from './components/headers/technicianHeader/technicianHeader';


import Login from './components/pages/logIn';
import CustomerRegister from './components/pages/customers/register/register';
import TechnicianRegister from './components/pages/technicians/register/register';
import Logout from './components/pages/logOut';
import GuestHome from './components/pages/home/guestHome';
import CustomerHome from './components/pages/home/customerHome';
import TechnicianHome from './components/pages/home/technicianHome';
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
// Initiate the Pusher JS library
var pusher = new Pusher('9d2040fd9f3ee80d3e21', {
   encrypted: true
});

// Subscribe to the channel we specified in our Laravel Event
var channel = pusher.subscribe('appointment-cancelled');

// Bind a function to a Event (the full Laravel class)
channel.bind('App\\Events\\AppointmentWasCancelled', function(data) {
   // this is called when the event notification is received...
});
function Home() {
   if (localStorage.getItem('CustomerAccessToken'))
   {
      return <CustomerHome />;
   } else {
      if (localStorage.getItem('TechnicianAccessToken'))
      {
         return <TechnicianHome />;
      } else {
         return <GuestHome />;
      }
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
               <Route exact path="/customer/register">
                  <CustomerRegister></CustomerRegister>
               </Route>
               <Route exact path="/tradesman/register">
                  <TechnicianRegister></TechnicianRegister>
               </Route>
               <Route exact path="/logout">
                  <Logout></Logout>
               </Route>
               <Route exact path="/alltradesmen">
                  <AllTechniciansTable></AllTechniciansTable>
               </Route>
               <Route exact path="/search">
                  <Results></Results>
               </Route>
               <Route exact path="/customer/myappointments">
                  <Appointments></Appointments>
               </Route>
               <Route exact path="/customer/profile">
                  <CustomerProfile></CustomerProfile>
               </Route>
               <Route exact path="/tradesman/myschedule">
                  <TechnicianSchedule></TechnicianSchedule>
               </Route>
               <Route exact path="/tradesman/profile">
                  <TechnicianProfile></TechnicianProfile>
               </Route>
            </Switch>
      </Router>
   </ThemeProvider>

);
}

export default App;
