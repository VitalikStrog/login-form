import React from "react";
import { NavLink } from "react-router-dom";

export const HomePage: React.FC = () => (
  <div className="homePage">
    <h1 className="homePage__title">Home page</h1>
    <div className="homePage__nav">
      <NavLink
        to="/login"
        className="formContainer__button homePage__button"
      >
        Login
      </NavLink>
      <NavLink
        to="/sign-up"
        className="formContainer__button homePage__button"
      >
        Sign up
      </NavLink>
    </div>
  </div>
);
