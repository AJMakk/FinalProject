import React from 'react';
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
import GuestAllTechnicians from './components/headers/guestHeader/allTechnicians';
import Results from './components/pages/customers/search/results';

import CustomerProfile  from './components/pages/customers/profile/profile';
import TechnicianProfile  from './components/pages/technicians/profiles/profile';

import RequestAppointment from './components/pages/customers/search/requestAppointment';
import ApprovalAppointments from './components/pages/technicians/appointments/approvalAppointments';
import CompletedAppointments from './components/pages/customers/appointments/completedAppointments';

import CustomerSchedule from './components/pages/customers/appointments/schedule';
import TechnicianSchedule from './components/pages/technicians/appointments/schedule';

import CustomerChat from './components/pages/customers/chat/chat';
import TechnicianChat from './components/pages/technicians/chat/chat';




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
               <Route exact path="/guest/alltradesmen">
                  <GuestAllTechnicians></GuestAllTechnicians>
               </Route>
               <Route exact path="/search">
                  <Results></Results>
               </Route>
               <Route exact path="/customer/myappointments">
                  <CustomerSchedule></CustomerSchedule>
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
               <Route exact path="/:id/requestappointment">
                  <RequestAppointment></RequestAppointment>
               </Route>
               <Route exact path="/tradesman/tentativeappointments">
                  <ApprovalAppointments></ApprovalAppointments>
               </Route>
               <Route exact path="/customer/completedappointments">
                  <CompletedAppointments></CompletedAppointments>
               </Route>
               <Route exact path="/customer/messages">
                  <CustomerChat></CustomerChat>
               </Route>
               <Route exact path="/tradesman/messages">
                  <TechnicianChat></TechnicianChat>
               </Route>
            </Switch>
      </Router>
   </ThemeProvider>

);
}

export default App;
