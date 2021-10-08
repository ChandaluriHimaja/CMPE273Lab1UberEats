import React, { Component } from "react";
import { getCustomerOrders } from "../redux";
import { connect } from "react-redux";
import CustomerOrdersItem from "./customerOrdersItem";
import _ from "lodash";

class CustomerOrders extends React.Component {
  state = {
    orderStatus: [
      "All",
      "Received",
      "Preparing",
      "On the way",
      "Delivered",
      "PickUp Ready",
      "Picked Up",
    ],
    orderStatusSelected: "All",
  };

  componentDidMount = async () => {
    await this.props.getCustomerOrders(this.props.customerData._id);
    // console.log("customerOrders: ", this.props.customerOrders);
  };

  handleStatusFilterChange = (e) => {
    this.setState({ orderStatusSelected: e.currentTarget.value });
  };

  filterData = () => {
    let filteredData = this.props.customerOrders;

    if (this.state.orderStatusSelected !== "All") {
      filteredData = this.props.customerOrders.filter((order) => {
        return order.orderStatus === this.state.orderStatusSelected;
      });
    }

    return filteredData;
  };

  render() {
    const filteredData = this.filterData();
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
            Orders
          </h1>
        </div>

        <div
          className="form-group"
          style={{ paddingLeft: "10px", marginBottom: "50px" }}
        >
          <label htmlFor="orderStatusFilter">Order Status Filter</label>
          <select
            className="form-control form-element"
            name="orderStatusFilter"
            id="orderStatusFilter"
            onChange={this.handleStatusFilterChange}
            value={this.state.orderStatusSelected}
            style={{ marginTop: "5px", width: "450px" }}
          >
            {this.state.orderStatus.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {filteredData.map((order) => {
          // if (
          //   order.orderStatus != "Picked Up" &&
          //   order.orderStatus != "Delivered"
          // ) {
          return <CustomerOrdersItem {...order}></CustomerOrdersItem>;
          // }
        })}
        {/* <div className="row justify-content-center">
          <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
            Past Orders
          </h1>
        </div> */}
        {/* {filteredData.map((order) => {
          if (
            order.orderStatus == "Picked Up" ||
            order.orderStatus == "Delivered"
          ) {
            return <CustomerOrdersItem {...order}></CustomerOrdersItem>;
          }
        })} */}
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
  return {
    getCustomerOrders: (id) => dispatch(getCustomerOrders(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerOrders);
