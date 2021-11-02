import React, { Component } from "react";
import {
  getRestaurantOrders,
  getRestaurantDishesData,
  getRestaurantData,
} from "../redux";
import { connect } from "react-redux";
import ResataurantNewOrderItem from "./restaurantNewOrderItem";
import RestaurantPastAndCanceledOrderItems from "./restaurantPastAndCanceledOrderItems";

class RestaurantOrders extends React.Component {
  componentDidMount = async () => {
    await this.props.getRestaurantOrders();
    // await this.props.getRestaurantDishesData(this.props.restaurantData._id);
    await this.props.getRestaurantData();
  };

  categorizeOrders = () => {
    const newOrders = [],
      pastOrders = [],
      canceledOrders = [];
    console.log("orders: ", this.props.restaurantOrders);
    this.props.restaurantOrders.forEach((order) => {
      if (order.orderStatus == "Cancel") {
        canceledOrders.push(order);
      } else if (
        order.orderStatus == "Delivered" ||
        order.orderStatus == "Picked Up"
      ) {
        pastOrders.push(order);
      } else {
        newOrders.push(order);
      }
    });

    console.log("newOrders: ", newOrders);
    return { newOrders, pastOrders, canceledOrders };
  };

  render() {
    const { newOrders, pastOrders, canceledOrders } = this.categorizeOrders();

    return (
      <div className="container">
        <h1 className="mt-4">Orders</h1>
        {newOrders.length > 0 && (
          <div>
            <div className="row justify-content-center">
              <h4 className="mt-4 ">Current Orders</h4>
            </div>
            {newOrders.length > 0 &&
              newOrders.map((order) => {
                return (
                  <ResataurantNewOrderItem
                    key={order._id}
                    {...order}
                  ></ResataurantNewOrderItem>
                );
              })}
            <hr></hr>
          </div>
        )}
        {pastOrders.length > 0 && (
          <div>
            <div className="row justify-content-center">
              <h4 style={{ paddingTop: "10px" }}>Past Orders</h4>
            </div>
            {pastOrders &&
              pastOrders.map((order) => {
                return (
                  <RestaurantPastAndCanceledOrderItems
                    key={order._id}
                    {...order}
                  ></RestaurantPastAndCanceledOrderItems>
                );
              })}
            <hr></hr>
          </div>
        )}
        {canceledOrders.length > 0 && (
          <div>
            <div className="row justify-content-center">
              <h4 style={{ paddingTop: "10px" }}>Canceled Orders</h4>
            </div>
            {canceledOrders &&
              canceledOrders.map((order) => {
                return (
                  <RestaurantPastAndCanceledOrderItems
                    key={order._id}
                    {...order}
                  ></RestaurantPastAndCanceledOrderItems>
                );
              })}
            <hr></hr>
          </div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    // restaurantData: state.restaurant.restaurantData,
    restaurantOrders: state.orders.restaurantOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantOrders: () => dispatch(getRestaurantOrders()),
    // getRestaurantDishesData: (id) => dispatch(getRestaurantDishesData(id)),
    getRestaurantData: () => dispatch(getRestaurantData()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantOrders);
