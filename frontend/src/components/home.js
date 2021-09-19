import React, { Component } from "react";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  render() {
    const user = auth.getCurrentUser();
    console.log("Got user data again in HOME: ", user);

    if (!user) {
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

export default Home;
