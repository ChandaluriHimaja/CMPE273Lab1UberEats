import React, { Component } from "react";
import { getCustomerOrders } from "../redux";
import { connect } from "react-redux";
import CustomerOrdersItem from "./customerOrdersItem";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
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
      "Cancelled",
    ],
    itemsPerPage: [2, 5, 10],
    orderStatusSelected: "All",
    pageSize: 5,
    currentPage: 1,
  };

  componentDidMount = async () => {
    await this.props.getCustomerOrders();
    // console.log("customerOrders: ", this.props.customerOrders);
  };

  handleStatusFilterChange = (e) => {
    this.setState({ orderStatusSelected: e.currentTarget.value });
  };

  handleItemsPerPageChange = (e) => {
    this.setState({ pageSize: e.currentTarget.value, currentPage: 1 });
  };

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  filterData = () => {
    let filteredData = this.props.customerOrders;

    if (this.state.orderStatusSelected !== "All") {
      filteredData = this.props.customerOrders.filter((order) => {
        return (
          order.orderStatus ===
          (this.state.orderStatusSelected === "Cancelled"
            ? "Cancel"
            : this.state.orderStatusSelected)
        );
      });
    }

    const orders = paginate(
      filteredData,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: filteredData.length, data: orders };
  };

  render() {
    const { totalCount, data: filteredData } = this.filterData();
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
            Orders
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            width: "1000px",
            justifyContent: "space-between",
          }}
        >
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
          <div
            className="form-group"
            style={{ paddingLeft: "10px", marginBottom: "50px" }}
          >
            <label htmlFor="numberOfPages">Items per page: </label>
            <select
              className="form-control form-element"
              name="numberOfPages"
              id="numberOfPages"
              onChange={this.handleItemsPerPageChange}
              value={this.state.pageSize}
              style={{ marginTop: "5px", width: "200px" }}
            >
              {this.state.itemsPerPage.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredData.map((order) => {
          return <CustomerOrdersItem {...order}></CustomerOrdersItem>;
        })}
        <Pagination
          itemsCount={totalCount}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
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
    getCustomerOrders: () => dispatch(getCustomerOrders()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerOrders);
