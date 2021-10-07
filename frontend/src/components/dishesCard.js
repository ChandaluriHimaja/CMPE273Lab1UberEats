import React, { Component } from "react";
import { currencyDenomination } from "../config.json";
import { Link } from "react-router-dom";

class DishesCard extends React.Component {
  render() {
    const {
      _id,
      name,
      mainIngrediant,
      image,
      price,
      description,
      category,
      type,
    } = this.props;

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "250px" }}
        key={_id}
      >
        <img
          className="card-img-top"
          src={image}
          style={{ height: "150px" }}
        ></img>
        <div className="card-body">
          <h5
            className="card-title overflow-hidden"
            style={{ letterSpacing: "1px", height: "25px" }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/restaurantAddDish/${_id}`}
            >
              {name.toUpperCase()}
            </Link>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <small className="text-muted">
              {mainIngrediant} - {category}
            </small>
          </h6>
          <p
            className="card-text overflow-auto rounded text-muted"
            style={{ height: "50px", padding: "10px", marginBottom: "0px" }}
          >
            <small className="text-muted">{description}</small>
          </p>
          <div className="row">
            <div className="col">
              <p className="card-text">
                <small className="text-muted">
                  {currencyDenomination} {price}
                </small>
              </p>
            </div>
            <div className="col">
              <p className="card-text" style={{ textAlign: "right" }}>
                <small className="text-muted">{type}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DishesCard;
