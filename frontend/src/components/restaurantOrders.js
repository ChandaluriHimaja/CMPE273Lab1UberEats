import React, { Component } from "react";
import { getRestaurantOrders } from "../redux";
import { connect } from "react-redux";

class RestaurantOrders extends React.Component {
  componentDidMount = async () => {};
  render() {
    return <div>RestaurantOrders</div>;
  }
}

const mapStoreToProps = (state) => {
  return {
    restaurantData: state.restaurant.restaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantOrders: (id) => dispatch(getRestaurantOrders(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantOrders);
