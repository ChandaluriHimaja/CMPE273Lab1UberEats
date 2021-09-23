import React, { Component } from "react";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    const jwt = this.props.jwt;
    const user = this.props.auth;
    console.log("Got user data again in HOME: ", user);

    if (!jwt) {
      return (
        <React.Fragment>
          <a href="/customerSignup">Customer SignUp</a>
          <a href="/restaurantSignup">Restaurant SignUp</a>
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
