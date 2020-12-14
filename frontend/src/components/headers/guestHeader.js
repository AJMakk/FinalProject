import React from "react";
import { NavLink } from "react-router-dom";



function guestHeader() {
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
      <NavLink activeClassName="active"  to="/login">
        Log In
      </NavLink>
      <NavLink activeClassName="active"  to="/register">
        Register
      </NavLink>
    </nav>
  );

}
export default guestHeader;