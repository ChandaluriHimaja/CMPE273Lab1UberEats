import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { updateOrderAndCart } from "../redux";
import CustomerCartModalItem from "./customerCartModalItem";

class CustomerCartModal extends React.Component {
  render() {
    const { showModal, onHide, onCheckoutClick } = this.props;

    const restaurant = this.props.restaurant;

    return (
      <Modal show={showModal} size="md">
        <Modal.Header>
          <Modal.Title>Order at {this.props.restaurantName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.orderDetails &&
            this.props.orderDetails.map((dish) => {
              return (
                <CustomerCartModalItem
                  {...dish}
                  key={dish._id}
                ></CustomerCartModalItem>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Link
            className="btn btn-dark"
            onClick={onCheckoutClick}
            to="/checkout"
          >
            Checkout
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    orderDetails: state.orders.orderDetails,
    restaurant: state.orders.restaurant,
    restaurantName: state.orders.restaurantName,
    cartItemsCount: state.orders.cartItemsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerCartModal);
