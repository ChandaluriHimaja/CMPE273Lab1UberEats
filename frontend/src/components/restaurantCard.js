import React, { Component } from "react";

class RestaurantCard extends React.Component {
  render() {
    const {
      _id,
      city,
      state,
      country,
      phoneNumber,
      description,
      restaurantImage,
      openingTime,
      closingTime,
      name,
    } = this.props;

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "270px" }}
        key={_id}
      >
        <img
          className="card-img-top"
          src={restaurantImage}
          style={{ height: "200px", width: "100%" }}
        ></img>
        <div className="card-body">
          <h5 className="card-title" style={{ letterSpacing: "1px" }}>
            {name.toUpperCase()}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <small className="text-muted">
              {city}, {state}
            </small>
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            <small className="text-muted">{country}</small>
          </h6>

          <p
            className="card-text overflow-auto rounded text-muted"
            style={{ height: "50px", padding: "10px" }}
          >
            {description}
          </p>
          <p className="card-text">
            <small className="text-muted">
              Timing: {openingTime} - {closingTime}
            </small>
          </p>
          <p></p>
          <p className="card-text">
            <small className="text-muted">+1 {phoneNumber}</small>
          </p>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
