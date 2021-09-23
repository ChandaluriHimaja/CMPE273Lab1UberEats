import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const CustomerRoute = ({ path, component: Component, render, ...rest }) => {
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.auth);
  console.log("Got user data again in ADMIN ROUTE: ", user);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (jwt && !user.isRestaurant) {
          console.log("CUSTOMER is not RESTAURANT", jwt, user);
          return Component ? <Component {...props}></Component> : render(props);
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};

export default CustomerRoute;
