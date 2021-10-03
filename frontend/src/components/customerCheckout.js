import React, { Component } from "react";
import CustomerCheckoutItem from "./customerCheckoutItem";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  addCustomerDeliveryAddress,
  getCustomerDeliveryAddress,
  customerPlaceOrder,
} from "../redux";
import { countries } from "./common/countries-list";
import Select from "./common/Select";

class CustomerCheckout extends Form {
  state = {
    data: { street: "", city: "", state: "", country: "", zipCode: "" },
    errors: {},
    totalPrice: 0,
    showSuccessBanner: false,
    showWarningBanner: false,
    customerDeliveryAddress: "",
    showDeliveryAddressModal: false,
    countries: [],
  };

  schema = {
    street: Joi.string().label("Street"),
    city: Joi.string().label("City"),
    state: Joi.string().label("State"),
    country: Joi.string().label("Country"),
    zipCode: Joi.string().length(5).label("Zip Code"),
  };

  getDateInFormat = (date) => {
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  placeOrder = async () => {
    const orderItems = [];
    let deliveryAddressId = 0;

    if (this.props.orderMode === "Delivery") {
      deliveryAddressId = this.state.customerDeliveryAddress;
    }

    this.props.orderDetails.map((dish) => {
      const item = {
        _dishId: dish._id,
        quantity: dish.quantity,
      };
      orderItems.push(item);
    });

    const dateTime = this.getDateInFormat(new Date());

    const orderDetails = {
      _custId: this.props.customerData._id,
      _restaurantId: this.props.restaurant,
      _deliveryAddressId: deliveryAddressId,
      dateTime: dateTime,
      totalPrice: this.state.totalPrice,
      orderMode: this.props.orderMode,
      orderStatus: "Received",
      orderFilter: "New Order",
      items: orderItems,
    };

    console.log("ORDER DETAILS: ", orderDetails);
    await this.props.customerPlaceOrder(orderDetails);
    if (this.props.customerPlaceOrderError) {
      this.setState({ showWarningBanner: true });
    } else {
      this.props.history.push("/myOrders");
    }
  };

  handleDeliveryAddressChange = (e) => {
    this.setState({ customerDeliveryAddress: e.currentTarget.value });
  };

  onHide = () => {
    this.setState({ showDeliveryAddressModal: false });
  };

  doSubmit = async () => {
    console.log("doSubmit add address");
    const { data } = this.state;
    await this.props.addCustomerDeliveryAddress({
      ...data,
      _id: this.props.customerData._id,
    });
    if (this.props.addCustomerDeliveryAddressError) {
      this.setState({ showWarningBanner: true });
    } else {
      this.setState({ showDeliveryAddressModal: false });
      await this.props.getCustomerDeliveryAddress(this.props.customerData._id);
    }
  };

  componentDidMount = () => {
    this.setState({ countries });
    const totalPrice = this.props.orderDetails.reduce(
      (count, dish) => count + dish.quantity * dish.price,
      0
    );
    this.setState({
      totalPrice,
      customerDeliveryAddress: this.props.customerDeliveryAddressData[0]._id,
    });
  };

  render() {
    const totalPrice = this.props.orderDetails.reduce(
      (count, dish) => count + dish.quantity * dish.price,
      0
    );
    if (this.state.totalPrice != totalPrice) {
      this.setState({ totalPrice });
    }

    return (
      <div className="container">
        {this.state.showSuccessBanner && (
          <div className="alert alert-success alert-dismissible fade show">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              onClick={() => this.setState({ showSuccessBanner: false })}
            >
              &times;
            </button>
            Order placed successfully
          </div>
        )}
        {this.state.showWarningBanner && (
          <div className="alert alert-warning alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              onClick={() => this.setState({ showWarningBanner: false })}
            >
              &times;
            </button>
            Error placing order
          </div>
        )}
        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
            Order Items
          </h1>
        </div>

        {this.props.orderMode === "Delivery" && (
          <div style={{ display: "flex" }}>
            <div
              className="form-group"
              style={{ paddingTop: "10px", marginBottom: "50px" }}
            >
              <label htmlFor="deliveryAddresses">Delivery Addresses</label>
              <select
                className="form-control form-element"
                name="deliveryAddresses"
                id="deliveryAddresses"
                onChange={this.handleDeliveryAddressChange}
                value={this.state.customerDeliveryAddress}
                style={{ marginTop: "5px", width: "450px" }}
              >
                {this.props.customerDeliveryAddressData.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.street +
                      ", " +
                      option.city +
                      ", " +
                      option.state +
                      ", " +
                      option.country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Button
                onClick={() => {
                  this.setState({
                    showDeliveryAddressModal:
                      !this.state.showDeliveryAddressModal,
                  });
                }}
                style={{ marginLeft: "55px", marginTop: "37px" }}
                variant="dark"
              >
                Add a delivery location
              </Button>
            </div>
          </div>
        )}
        <div>
          <CustomerCheckoutItem
            name="NAME"
            price="PRICE"
            quantity="QUANTITY"
            style={{ fontWeight: "bold" }}
          ></CustomerCheckoutItem>
          {this.props.orderDetails.map((dish) => {
            return (
              <CustomerCheckoutItem
                key={dish._id}
                {...dish}
                price={dish.quantity * dish.price}
              ></CustomerCheckoutItem>
            );
          })}
          <CustomerCheckoutItem
            name=""
            price={this.state.totalPrice}
            quantity="TOTAL"
            style={{ fontWeight: "bold" }}
          ></CustomerCheckoutItem>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Button
            variant="dark"
            style={{ width: "700px" }}
            onClick={this.placeOrder}
          >
            Place Order
          </Button>
        </div>
        {this.state.showDeliveryAddressModal && (
          <Modal
            show={this.state.showDeliveryAddressModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton onClick={this.onHide}>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Delivery Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("street", "Street", "text")}
                {this.renderInput("city", "City", "text")}
                {this.renderInput("state", "State", "text")}
                {this.renderSelect("country", "Country", this.state.countries)}
                {this.renderInput("zipCode", "Zip Code", "number")}
                <div style={{ paddingTop: "10px" }}>
                  {this.renderButton("Add")}
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    orderDetails: state.orders.orderDetails,
    customerData: state.customer.customerData,
    restaurant: state.orders.restaurant,
    orderMode: state.orders.orderMode,
    customerDeliveryAddressData:
      state.deliveryAddresses.customerDeliveryAddressData,
    customerPlaceOrderError: state.orders.customerPlaceOrderError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomerDeliveryAddress: (data) =>
      dispatch(addCustomerDeliveryAddress(data)),
    getCustomerDeliveryAddress: (id) =>
      dispatch(getCustomerDeliveryAddress(id)),
    customerPlaceOrder: (orderDetails) =>
      dispatch(customerPlaceOrder(orderDetails)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerCheckout);
