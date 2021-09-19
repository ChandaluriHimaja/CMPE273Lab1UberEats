import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Logout from "./components/logout";
import CustomerRoute from "./components/common/customerRoute";
import RestaurantRoute from "./components/common/restaurantRoute";
import BaseRoute from "./components/common/baseRoute";
import CustomerSignUp from "./components/customerSignUp";
import RestaurantSignUp from "./components/restaurantSignUp";
import CustomerDashboard from "./components/customerDashboard";
import RestaurantDashboard from "./components/restaurantDashboard";
import RestaurantOrders from "./components/restaurantOrders";
import CustomerOrders from "./components/customerOrders";
import CustomerProfile from "./components/customerProfile";
import CustomerFavourites from "./components/customerFavourites";
import CustomerCheckout from "./components/customerCheckout";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md-8 ml-sm-auto col-lg-10">
              <Switch>
                <CustomerRoute
                  path="/myDashboard"
                  component={CustomerDashboard}
                ></CustomerRoute>
                <RestaurantRoute
                  path="/restaurantDashboard"
                  component={RestaurantDashboard}
                ></RestaurantRoute>
                <RestaurantRoute
                  path="/orders"
                  component={RestaurantOrders}
                ></RestaurantRoute>
                <CustomerRoute
                  path="/myOrders"
                  component={CustomerOrders}
                ></CustomerRoute>
                <CustomerRoute
                  path="/myProfile"
                  component={CustomerProfile}
                ></CustomerRoute>
                <CustomerRoute
                  path="/myFavourites"
                  component={CustomerFavourites}
                ></CustomerRoute>
                <CustomerRoute
                  path="/checkout"
                  component={CustomerCheckout}
                ></CustomerRoute>
                <BaseRoute
                  path="/customerSignUp"
                  component={CustomerSignUp}
                ></BaseRoute>
                <BaseRoute
                  path="/restaurantSignUp"
                  component={RestaurantSignUp}
                ></BaseRoute>
                <BaseRoute path="/home" component={Home}></BaseRoute>
                <BaseRoute path="/login" component={Login}></BaseRoute>
                <BaseRoute path="/logout" component={Logout}></BaseRoute>
                <Redirect from="/" exact to="/home"></Redirect>
              </Switch>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default App;
