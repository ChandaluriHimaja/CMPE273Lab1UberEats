import React, { Component } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import _ from "lodash";

import { updateOrderAndCart } from "../redux";

class CustomerCartModalItem extends React.Component {
  state = {
    quantity: 0,
  };

  onIncrementClick = async () => {
    const { quantity } = this.state;
    await this.setState({ quantity: quantity + 1 });
    this.updateOrderState();
  };

  onDecrementClick = async () => {
    const { quantity } = this.state;
    if (!quantity == 0) {
      await this.setState({ quantity: quantity - 1 });
      this.updateOrderState();
    }
  };

  onQuantityChange = async (e) => {
    const quantity = e.currentTarget.value;
    if (quantity > 0 && quantity < 100000) {
      await this.setState({ quantity });
      this.updateOrderState();
    }
  };

  updateOrderState = () => {
    console.log("quantity: ", this.state.quantity);
    const dishDetails = {
      restaurantId: this.props.restaurantId,
      restaurantName: this.props.restaurantName,
      _id: this.props._id,
      name: this.props.name,
      mainIngrediant: this.props.mainIngrediant,
      image: this.props.image,
      price: this.props.price.toFixed(2),
      description: this.props.description,
      category: this.props.category,
      type: this.props.type,
      quantity: this.state.quantity,
    };
    console.log("UPDATEORDERSTATE: quantity - ", dishDetails);
    this.props.updateOrderAndCart(dishDetails);
  };

  componentDidMount = () => {
    const orderDetails = this.props.orderDetails;
    const dish = _.find(orderDetails, { _id: this.props._id });
    if (dish) {
      this.setState({ quantity: dish.quantity });
    }
  };

  render() {
    const { name, price, quantity } = this.props;
    return (
      <React.Fragment>
        <div
          style={{ display: "flex", paddingTop: "5px", paddingBottom: "5px" }}
        >
          <InputGroup
            style={{
              marginLeft: "20px",
              paddingRight: "30px",
              width: "150px",
            }}
          >
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={this.onDecrementClick}
            >
              -
            </Button>
            <FormControl
              value={quantity}
              style={{ textAlign: "center" }}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.onQuantityChange}
              disabled
            ></FormControl>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={this.onIncrementClick}
            >
              +
            </Button>
          </InputGroup>
          <p
            className="card-title overflow-hidden"
            style={{
              letterSpacing: "1px",
              height: "25px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "150px",
            }}
          >
            {name.toUpperCase()}
          </p>
          <p
            className="card-title overflow-hidden"
            style={{
              letterSpacing: "1px",
              height: "25px",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Price: {(quantity * price).toFixed(2)}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    orderDetails: state.orders.orderDetails,
    cartItemsCount: state.orders.cartItemsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderAndCart: (dishDetails) =>
      dispatch(updateOrderAndCart(dishDetails)),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CustomerCartModalItem);
