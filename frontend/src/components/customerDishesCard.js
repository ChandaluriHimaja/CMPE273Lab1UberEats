import React, { Component } from "react";
import { currencyDenomination } from "../config.json";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { updateOrderAndCart } from "../redux/orders/ordersActions";

class CustomerDishesCard extends React.Component {
  state = {
    quantity: 0,
  };

  onIncrementClick = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    this.updateOrderState();
  };

  onIDecrementClick = () => {
    const { quantity } = this.state;
    if (!quantity == 0) {
      this.setState({ quantity: quantity - 1 });
      this.updateOrderState();
    }
  };

  onQuantityChange = (e) => {
    const quantity = e.currentTarget.value;
    if (quantity > 0 && quantity < 100000) {
      this.setState({ quantity });
      this.updateOrderState();
    }
  };

  updateOrderState = () => {
    const dishDetails = {
      restaurantId: this.props.restaurantId,
      _id: this.props._id,
      name: this.props.name,
      mainIngrediant: this.props.mainIngrediant,
      image: this.props.image,
      price: this.props.price,
      description: this.props.description,
      category: this.props.category,
      type: this.props.type,
      quantity: this.state.quantity,
    };
    this.props.updateOrderAndCart(dishDetails);
  };

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

    const { quantity } = this.state;

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "250px" }}
        key={_id}
      >
        <img
          className="card-img-top"
          src={image}
          style={{ height: "150px", width: "100%" }}
        ></img>
        <div className="card-body">
          <h5
            className="card-title overflow-hidden"
            style={{ letterSpacing: "1px", height: "25px" }}
          >
            {name.toUpperCase()}
          </h5>
          <h6
            className="card-subtitle text-muted overflow-hidden"
            style={{ height: "50px" }}
          >
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
          <InputGroup
            style={{
              paddingTop: "25px",
              paddingLeft: "35px",
              paddingRight: "35px",
              paddingBottom: "5px",
            }}
          >
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={this.onIncrementClick}
            >
              +
            </Button>
            <FormControl
              value={quantity}
              style={{ textAlign: "center" }}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.onQuantityChange}
            ></FormControl>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={this.onIDecrementClick}
            >
              -
            </Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    orderDetails: state.orders.orderDetails,
    restaurants: state.orders.restaurants,
    cartItemsCount: state.orders.cartItemsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderAndCart: (dishDetails) =>
      dispatch(updateOrderAndCart(dishDetails)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerDishesCard);
