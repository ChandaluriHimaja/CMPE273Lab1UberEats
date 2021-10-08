import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";

class CustomerOrdersItem extends React.Component {
  state = {
    showReceipt: false,
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

  render() {
    const order = this.props;
    console.log("ORDER ITEM COMP: ", order);

    const itemCount = order.orderItems.reduce(
      (count, orderItem) => count + orderItem.quantity,
      0
    );
    const restaurant = _.find(this.props.allRestaurantData, {
      _id: order._restaurantId,
    });

    const dateTime = this.getDateInFormat(new Date(order.dateTime));
    return (
      <div
        className="card"
        style={{ margin: "10px", width: "900px", padding: "20px" }}
        key={order.id}
      >
        <h5 className="card-title overflow-hidden">{restaurant.name}</h5>
        <p
          className="card-text overflow-auto rounded text-muted"
          style={{ height: "25px", marginBottom: "0px" }}
        >
          <span style={{ fontWeight: "bold" }}>{itemCount}</span> items for{" "}
          <span style={{ fontWeight: "bold" }}>
            ${order.totalPrice.toFixed(2)}
          </span>{" "}
          on <span style={{ fontWeight: "bold" }}>{dateTime}</span> ||{" "}
          <span style={{ fontWeight: "bold" }}>Status: </span>
          {order.orderStatus} ||{" "}
          <span style={{ fontWeight: "bold" }}>Mode: </span>
          {order.orderMode}
          <Button
            variant="link"
            style={{ paddingTop: "0px", color: "black" }}
            onClick={() => {
              this.setState({ showReceipt: true });
            }}
          >
            View Receipt
          </Button>
        </p>
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showReceipt}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Receipt
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row" style={{ display: "flex" }}>
              <h4 className="col-md-9">Total</h4>
              <h4
                className="col-md-3"
                style={{ textAlign: "right", paddingRight: "30px" }}
              >
                {" "}
                ${order.totalPrice}
              </h4>
            </div>
            {order.orderItems.map((orderItem) => {
              const { name, price } = _.find(restaurant.dishes, {
                _id: orderItem._dishId,
              });
              return (
                <div
                  style={{
                    display: "flex",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  <p
                    className="card-title overflow-hidden border rounded"
                    style={{
                      padding: "5px",
                      marginLeft: "10px",
                      letterSpacing: "1px",
                      marginRight: "40px",
                      marginTop: "auto",
                      marginBottom: "auto",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    {orderItem.quantity}
                  </p>
                  <p
                    className="card-title overflow-hidden"
                    style={{
                      letterSpacing: "1px",
                      height: "25px",
                      marginTop: "auto",
                      marginBottom: "auto",
                      width: "260px",
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
                      marginLeft: "5px",
                    }}
                  >
                    Price: {price}
                  </p>
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              onClick={() => {
                this.setState({ showReceipt: false });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    customerData: state.customer.customerData,
    customerOrders: state.orders.customerOrders,
    allRestaurantData: state.allRestaurant.allRestaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerOrdersItem);
