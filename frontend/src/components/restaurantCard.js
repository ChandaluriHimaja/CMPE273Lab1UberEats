import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import { connect } from "react-redux";
import {
  customerLikesRestaurant,
  getCustomerLikesData,
  getCustomerData,
} from "../redux";

class RestaurantCard extends React.Component {
  onLike = async (_restaurantId) => {
    const data = {
      _restaurantId: _restaurantId,
    };
    await this.props.customerLikesRestaurant(data);
    await this.props.getCustomerData(this.props.auth._id);
    // await this.props.getCustomerLikesData(this.props.customerData._id);
  };

  render() {
    const {
      _id,
      addresses,
      phoneNumber,
      about,
      picture,
      openingTime,
      closingTime,
      name,
      liked,
    } = this.props;

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "250px" }}
        key={_id}
      >
        <img
          className="card-img-top"
          src={picture}
          style={{ height: "200px", width: "100%" }}
        ></img>
        <div className="card-body">
          <h5
            className="card-title"
            style={{ letterSpacing: "1px", height: "50px" }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/restaurant/${_id}`}
            >
              {name.toUpperCase()}
            </Link>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <small className="text-muted">
              {addresses[0].city}, {addresses[0].state}
            </small>
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            <small className="text-muted">{addresses[0].country}</small>
          </h6>

          <p
            className="card-text overflow-auto rounded text-muted"
            style={{ height: "50px", padding: "10px" }}
          >
            <small className="text-muted">{about}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Timing: {openingTime} - {closingTime}
            </small>
          </p>
          <p></p>
          <div className="row">
            <div className="col-sm-10">
              <small className="text-muted">+1 {phoneNumber}</small>
            </div>
            <div className="col-sm-2">
              <Like liked={liked} onClick={() => this.onLike(_id)}></Like>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    customerData: state.customer.customerData,
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerLikesRestaurant: (data) => dispatch(customerLikesRestaurant(data)),
    // getCustomerLikesData: (id) => dispatch(getCustomerLikesData(id)),
    getCustomerData: (id) => dispatch(getCustomerData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantCard);
