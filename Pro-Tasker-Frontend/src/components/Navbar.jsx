// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";


// export default function Navbar() {
// const { user, logout } = useAuth();


// return (
// <nav className="p-4 bg-blue-600 text-white flex justify-between">
// <h1 className="font-bold">Pro-Tasker</h1>

// <div>
// {user ? (
// <>
// <Link to="/dashboard" className="mr-4">Dashboard</Link>
// <button onClick={logout}>Logout</button>
// </>
// ) : (
// <>
// <Link to="/">Login</Link>
// <Link to="/register" className="ml-4">Register</Link>
// </>
// )}
// </div>
// </nav>
// );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();  
  
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Pro-Tasker</Link>
          <ul className="navbar-links">
            {user ? (
              <>
                <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
                <li><button className="navbar-link" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="navbar-link">Login</Link></li>
                <li><Link to="/register" className="navbar-link">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }

export default Navbar;
