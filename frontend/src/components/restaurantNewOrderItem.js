import React, { Component } from "react";
import { getCustomerDetailsByID } from "../services/getCustomerForRestaurantService";
import _ from "lodash";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { restaurantUpdateOrder } from "../redux";
import { Link } from "react-router-dom";

class ResataurantNewOrderItem extends React.Component {
  state = {
    customer: { name: "" },
    orderStatusForDelivery: [
      "Received",
      "Preparing",
      "On the way",
      "Delivered",
    ],
    orderStatusForPickUp: [
      "Received",
      "Preparing",
      "PickUp Ready",
      "Picked Up",
    ],
    orderStatus: "",
    orderStatusUpdateDisabled: true,
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

  handleOrderStatusChange = (e) => {
    const orderStatus = e.currentTarget.value;
    this.setState({ orderStatus });
  };

  onStatusChangeSubmit = async () => {
    console.log(
      "selecetedStatus: ",
      this.state.orderStatus,
      " ",
      this.props._id
    );
    await this.props.restaurantUpdateOrder({
      _id: this.props._id,
      orderStatus: this.state.orderStatus,
    });
    this.setState({ orderStatusUpdateDisabled: true });
  };

  componentDidMount = async () => {
    console.log("In componentDidMount");
    const { data: customer } = await getCustomerDetailsByID(this.props._custId);
    console.log("CCCCCCC: ", customer);
    this.setState({ customer });
    this.setState({ orderStatus: this.props.orderStatus });
  };

  render() {
    const order = this.props;

    const { customer } = this.state;
    console.log("CUSTOOOOOO: ", customer.name);

    const dateTime = this.getDateInFormat(new Date(order.dateTime));

    const orderStatusOptions =
      order.orderStatus == "Delivery"
        ? this.state.orderStatusForDelivery
        : this.state.orderStatusForPickUp;

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "700px", padding: "20px" }}
        key={order._id}
      >
        <div className="row">
          <div className="col-md-8">
            {/* <h5 className="card-title">{customer.name}</h5> */}
            <Link
              className="card-title"
              style={{ textDecoration: "none", color: "black" }}
              //   to={`/customer/${customer._id}`}
              to={{
                pathname: `/customer/${customer._id}`,
                state: { ...customer },
              }}
            >
              <h5 className="card-title">{customer.name}</h5>
            </Link>
          </div>

          <div className="col-md-4">{dateTime}</div>
        </div>
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            height: "2px",
            width: "650px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></hr>

        {order.orderItems.map((item) => {
          const dish = _.find(this.props.restaurantDishesData, {
            _id: item._dishId,
          });
          return (
            <React.Fragment>
              <div style={{ display: "flex" }}>
                <p
                  className="card-title overflow-hidden"
                  style={{
                    marginLeft: "30px",
                    letterSpacing: "1px",
                    height: "25px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "500px",
                  }}
                >
                  {dish && dish.name}
                </p>
                <p
                  className="card-title overflow-hidden"
                  style={{
                    marginLeft: "100px",
                    letterSpacing: "1px",
                    height: "25px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "350px",
                  }}
                >
                  <span className="text-muted">Quantity: </span>
                  {item.quantity}
                </p>
              </div>
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  height: "2px",
                  width: "650px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              ></hr>
            </React.Fragment>
          );
        })}

        <div style={{ display: "flex" }}>
          <div
            className="form-group"
            style={{ paddingTop: "10px", marginBottom: "10px" }}
          >
            <label htmlFor="orderStatus">Order Status</label>
            <select
              disabled={this.state.orderStatusUpdateDisabled}
              className="form-control form-element"
              name="orderStatus"
              id="orderStatus"
              onChange={this.handleOrderStatusChange}
              value={this.state.orderStatus}
              style={{ marginTop: "5px", width: "450px" }}
            >
              {orderStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {this.state.orderStatusUpdateDisabled && (
            <Button
              variant="dark"
              style={{
                marginLeft: "40px",
                height: "40px",
                marginTop: "37px",
                width: "150px",
              }}
              onClick={() => {
                this.setState({ orderStatusUpdateDisabled: false });
              }}
            >
              Update Status
            </Button>
          )}
          {!this.state.orderStatusUpdateDisabled && (
            <Button
              variant="dark"
              style={{
                marginLeft: "40px",
                height: "40px",
                marginTop: "37px",
                width: "150px",
              }}
              onClick={this.onStatusChangeSubmit}
            >
              Save Status
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    restaurantDishesData: state.restaurant.restaurantDishesData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restaurantUpdateOrder: (orderDetails) =>
      dispatch(restaurantUpdateOrder(orderDetails)),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(ResataurantNewOrderItem);
