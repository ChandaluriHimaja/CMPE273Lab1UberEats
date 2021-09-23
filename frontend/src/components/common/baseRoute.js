import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BaseRoute = ({ path, component: Component, render, ...rest }) => {
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.auth);
  // const user = auth.getCurrentUser();
  console.log("Got user data again in BASE ROUTE: ", user);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (jwt) {
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
