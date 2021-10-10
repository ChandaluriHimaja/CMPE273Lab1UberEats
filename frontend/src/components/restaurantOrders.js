import React, { Component } from "react";
import { getRestaurantOrders, getRestaurantDishesData } from "../redux";
import { connect } from "react-redux";
import ResataurantNewOrderItem from "./restaurantNewOrderItem";
import RestaurantPastAndCanceledOrderItems from "./restaurantPastAndCanceledOrderItems";

class RestaurantOrders extends React.Component {
  componentDidMount = async () => {
    await this.props.getRestaurantOrders(this.props.restaurantData._id);
    await this.props.getRestaurantDishesData(this.props.restaurantData._id);
  };

  categorizeOrders = () => {
    const orders = this.props.restaurantOrders;

    const newOrders = [],
      pastOrders = [],
      canceledOrders = [];
    console.log("orders: ", orders);
    console.log("orders: ", this.props.restaurantOrders);
    this.props.restaurantOrders.forEach((order) => {
      if (order.orderStatus == "Canceled") {
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
        {newOrders && (
          <div>
            <div className="row justify-content-center">
              <h1 className="mt-4 mb-4" style={{ paddingBottom: "25px" }}>
                Current Orders
              </h1>
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
              <h1 className="mt-4 mb-4" style={{ paddingBottom: "25px" }}>
                Past Orders
              </h1>
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
              <h1 className="mt-4 mb-4" style={{ paddingBottom: "25px" }}>
                Canceled Orders
              </h1>
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
    restaurantData: state.restaurant.restaurantData,
    restaurantOrders: state.orders.restaurantOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantOrders: (id) => dispatch(getRestaurantOrders(id)),
    getRestaurantDishesData: (id) => dispatch(getRestaurantDishesData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantOrders);
