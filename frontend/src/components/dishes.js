import React, { Component } from "react";
import { getDishesOfRestaurant } from "../redux";
import { connect } from "react-redux";

class Dishes extends React.Component {
  componentDidMount = async () => {
    await this.props.getDishesOfRestaurant(this.props.auth._id);
  };
  render() {
    return <div></div>;
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.props.props,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDishesOfRestaurant: (id) => dispatch(getDishesOfRestaurant(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Dishes);
