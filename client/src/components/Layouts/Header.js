import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../index.css";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            🥻Dream Clothing
          </Link>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart(0)
              </NavLink>
            </li>
          </ul>
        </div>
        {/* </div> */}
      </nav>
    </>
  );
};

export default Header;
