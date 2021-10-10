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
import RestaurantAddNewDish from "./components/restaurantAddNewDish";
import RestaurantOrders from "./components/restaurantOrders";
import RestaurantDishes from "./components/restaurantDishes";
import CustomerOrders from "./components/customerOrders";
import CustomerProfile from "./components/customerProfile";
import CustomerFavourites from "./components/customerFavourites";
import CustomerCheckout from "./components/customerCheckout";
import CustomerRestaurantPage from "./components/customerRestaurantPage";
import RestaurantCustomerPage from "./components/restaurantCustomerPage";
import SideBar from "./components/sidebar";
import NavBarMy from "./components/navbar";

import { Provider } from "react-redux";
import store from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <div className="row">
            <NavBarMy></NavBarMy>
          </div>
          <div className="row">
            <div className="col-md-2">
              <SideBar></SideBar>
            </div>
            <div
              className="col-md-10"
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <main role="main">
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
                    path="/restaurantDishes"
                    component={RestaurantDishes}
                  ></RestaurantRoute>
                  <RestaurantRoute
                    path="/restaurantAddDish/:id"
                    component={RestaurantAddNewDish}
                  ></RestaurantRoute>
                  <RestaurantRoute
                    path="/orders"
                    component={RestaurantOrders}
                  ></RestaurantRoute>
                  <RestaurantRoute
                    path="/customer/:id"
                    component={RestaurantCustomerPage}
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
                  <CustomerRoute
                    path="/restaurant/:id"
                    component={CustomerRestaurantPage}
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
                  <Route path="/logout" component={Logout}></Route>
                  <Redirect from="/" exact to="/home"></Redirect>
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
