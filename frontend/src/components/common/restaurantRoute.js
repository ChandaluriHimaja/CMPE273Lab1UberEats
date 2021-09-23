import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantRoute = ({ path, component: Component, render, ...rest }) => {
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.auth);
  console.log("Got user data again in ADMIN ROUTE: ", user);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (jwt && user.isRestaurant)
          return Component ? <Component {...props}></Component> : render(props);
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

export default RestaurantRoute;
