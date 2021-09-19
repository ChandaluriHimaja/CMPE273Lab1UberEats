import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const BaseRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  console.log("Got user data again in BASE ROUTE: ", user);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (user) {
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

        return Component ? <Component {...props}></Component> : render(props);
      }}
    ></Route>
  );
};

export default BaseRoute;
