import React, { Component } from "react";
import { getCustomerOrders } from "../redux";
import { connect } from "react-redux";
import CustomerOrdersItem from "./customerOrdersItem";
import _ from "lodash";

class CustomerOrders extends React.Component {
  componentDidMount = async () => {
    await this.props.getCustomerOrders(this.props.customerData._id);
    // console.log("customerOrders: ", this.props.customerOrders);
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
            Orders
          </h1>
        </div>
        {this.props.customerOrders.map((order) => {
          return <CustomerOrdersItem {...order}></CustomerOrdersItem>;
        })}
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
