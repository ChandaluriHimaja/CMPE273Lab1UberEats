import React from "react";
import { Link } from "react-router-dom";
import ListItemNavBar from "./common/ListItemNavBar";
import logo from "../images/UberEatsLogo.png";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <nav class="navbar navbar-light bg-light shadow" style={{ height: "65px" }}>
      <span class="navbar-brand mb-0 h1" style={{ paddingRight: "10px" }}>
        <span style={{ color: "#162328" }}>Uber</span>
        <span style={{ color: "#3FC060" }}>Eats</span>
      </span>
    </nav>
  );
};

export default NavBar;
