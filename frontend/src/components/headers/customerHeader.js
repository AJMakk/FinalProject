import React from "react";
import { NavLink } from "react-router-dom";



function customerHeader() {
  return (
    <nav>
      <NavLink exact activeClassName="active"  to="/home">
        Home 
      </NavLink>
      <NavLink activeClassName="active"  to="/search">
        Search For Technicians
      </NavLink>
      <NavLink activeClassName="active"  to="/help">
        Help
      </NavLink>
      <NavLink activeClassName="active"  to="/notifications">
        Notifications
      </NavLink>
      <NavLink activeClassName="active"  to="/logout">
        Log Out
      </NavLink>
      <NavLink activeClassName="active"  to="/myprofile">
        My Profile
      </NavLink>
    </nav> 
  );
 
}
export default customerHeader;