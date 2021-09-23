import React, { Component } from "react";
import auth from "../services/authService";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    const jwt = this.props.jwt;
    const user = this.props.auth;
    console.log("Got user data again in HOME: ", user);

    if (!jwt) {
      return (
        <React.Fragment>
          <div style={{ marginTop: "500px" }}>
            <Link className="btn btn-dark" to={"/customerSignup"}>
              Customer SignUp
            </Link>
            <Link
              className="btn btn-dark"
              style={{ marginLeft: "50px" }}
              to={"/restaurantSignup"}
            >
              Restaurant SignUp
            </Link>
          </div>
        </React.Fragment>
      );
    } else {
      if (user.isRestaurant) {
        return (
          <Redirect
            to={{
              pathname: "/restaurantDashboard",
            }}
          ></Redirect>
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/myDashboard",
            }}
          ></Redirect>
        );
      }
    }
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    jwt: state.auth.jwt,
  };
};

export default connect(mapStoreToProps)(Home);
