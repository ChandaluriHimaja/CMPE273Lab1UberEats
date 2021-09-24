import React from "react";
import { Link, NavLink } from "react-router-dom";
import ListItemNavBar from "./common/ListItemNavBar";
import "../styles/navbar.css";
import { useSelector } from "react-redux";
import { Col, Row, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  const jwt = useSelector((state) => state.auth.jwt);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Row style={{ width: "100%" }}>
        <Col>
          <span class="navbar-brand mb-0 h1" style={{ paddingRight: "10px" }}>
            <span style={{ color: "#162328" }}>Uber</span>
            <span style={{ color: "#3FC060" }}>Eats</span>
          </span>
        </Col>
        <Col style={{ textAlign: "right" }}>
          {!jwt && (
            <ListItemNavBar
              iconClass="fa fa-sign-out"
              label="Login"
              path="/login"
            ></ListItemNavBar>
          )}
          {jwt && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Logout"
                path="/logout"
              ></ListItemNavBar>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </Navbar>

    // <nav className="navbar navbar-light fixed-top flex-md-nowrap p-10 shadow navbar-expand-md">
    //   <span class="navbar-brand mb-0 h1" style={{ paddingRight: "10px" }}>
    //     <span style={{ color: "#162328" }}>Uber</span>
    //     <span style={{ color: "#3FC060" }}>Eats</span>
    //   </span>

    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     {/* <ul className="navbar-nav px-3 ml-auto"> */}
    //     {!jwt && (
    //       <ListItemNavBar
    //         iconClass="fa fa-sign-out"
    //         label="Login"
    //         path="/login"
    //       ></ListItemNavBar>
    //     )}
    //     {jwt && (
    //       <React.Fragment>
    //         <ListItemNavBar
    //           iconClass="fa fa-user-circle-o"
    //           label="Profile"
    //           path="/myProfile"
    //         ></ListItemNavBar>
    //         <ListItemNavBar
    //           iconClass="fa fa-sign-out"
    //           label="Sign Out"
    //           path="/logout"
    //         ></ListItemNavBar>
    //       </React.Fragment>
    //     )}
    //     {/* </ul> */}
    //   </div>
    // </nav>
  );
};

export default NavBar;
