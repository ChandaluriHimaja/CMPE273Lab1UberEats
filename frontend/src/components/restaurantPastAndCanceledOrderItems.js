import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getCustomerDetailsByID } from "../services/getCustomerForRestaurantService";
import { Link } from "react-router-dom";

class RestaurantPastAndCanceledOrderItems extends React.Component {
  state = {
    customer: { name: "" },
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

  componentDidMount = async () => {
    const { data: customer } = await getCustomerDetailsByID(this.props._custId);
    this.setState({ customer });
  };
  render() {
    const order = this.props;

    const { customer } = this.state;
    console.log("CUSTOOOOOO: ", customer.name);

    const dateTime = this.getDateInFormat(new Date(order.dateTime));

    return (
      <div
        className="card"
        style={{ margin: "10px", width: "700px", padding: "20px" }}
        key={order._id}
      >
        <div className="row">
          <div className="col-md-8">
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
          const dish = _.find(this.props.restaurantData.dishes, {
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
        {order.orderNote && (
          <div>
            <p
              className="card-title overflow-hidden"
              style={{
                letterSpacing: "1px",
                marginTop: "5px",
              }}
            >
              <span className="text-muted">Note: </span>
              {order.orderNote}
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    restaurantDishesData: state.restaurant.restaurantDishesData,
    restaurantData: state.restaurant.restaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RestaurantPastAndCanceledOrderItems);
