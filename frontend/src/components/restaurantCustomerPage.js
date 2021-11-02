import React, { Component } from "react";
import _ from "lodash";

class RestaurantCustomerPage extends React.Component {
  getDateInFormat = (date) => {
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };

  render() {
    const customer = this.props.location.state;
    const dateOfBirth = this.getDateInFormat(new Date(customer.dateOfBirth));
    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            paddingBottom: "20px",
          }}
        >
          <div className="row justify-content-center">
            <h1 className="mt-4 mb-4" style={{ paddingBottom: "30px" }}>
              {customer.name}
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-4" style={{ textAlign: "center" }}>
              <img
                className="card-img-top"
                src={customer.picture}
                style={{
                  width: "300px",
                }}
              ></img>
            </div>
            <div className="col-lg-8" style={{ paddingTop: "10px" }}>
              {customer.nickname && (
                <p style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <span style={{ fontWeight: "bold" }}>Nickname: </span>
                  {customer.nickname.charAt(0).toUpperCase() +
                    customer.nickname.slice(1).toLowerCase()}
                </p>
              )}
              {customer.dateOfBirth && (
                <p style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <span style={{ fontWeight: "bold" }}>Date of Birth: </span>
                  {dateOfBirth}
                </p>
              )}
              {customer.phoneNumber && (
                <p style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                  {customer.phoneNumber}
                </p>
              )}
              {customer.about && (
                <p style={{ fontSize: "20px", letterSpacing: "1px" }}>
                  <span style={{ fontWeight: "bold" }}>About: </span>
                  {customer.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RestaurantCustomerPage;
