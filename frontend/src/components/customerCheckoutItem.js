import React, { Component } from "react";

class CustomerCheckoutItem extends React.Component {
  render() {
    const { key, name, price, quantity, style } = this.props;
    return (
      <React.Fragment>
        <div key={key} style={{ display: "flex" }}>
          <p
            className="card-title overflow-hidden"
            style={{
              textAlign: "center",
              marginLeft: "20px",
              letterSpacing: "1px",
              height: "25px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "100px",
              ...style,
            }}
          >
            {quantity}
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
              ...style,
            }}
          >
            {name.toUpperCase()}
          </p>
          <p
            className="card-title overflow-hidden"
            style={{
              textAlign: "center",
              letterSpacing: "1px",
              height: "25px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "150px",
              ...style,
            }}
          >
            {price}
          </p>
        </div>
        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            height: "2px",
            width: "700px",
          }}
        ></hr>
      </React.Fragment>
    );
  }
}

export default CustomerCheckoutItem;
