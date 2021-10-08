import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ListItemNavBar from "./common/ListItemNavBar";
import "../styles/navbar.css";
import { useSelector } from "react-redux";
import { Col, Row, Navbar, Button } from "react-bootstrap";
import CustomerCartModal from "./customerCartModal";
import { connect } from "react-redux";

class NavBar extends React.Component {
  state = {
    showCartModal: false,
  };

  onHide = () => {
    this.setState({ showCartModal: !this.state.showCartModal });
  };

  onCheckoutClick = () => {
    this.setState({ showCartModal: !this.state.showCartModal });
  };

  render() {
    const jwt = this.props.jwt;
    const user = this.props.user;
    const cartItemsCount = this.props.cartItemsCount;

    const { showCartModal } = this.state;

    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Row style={{ width: "100%" }}>
          <Col>
            <Link
              className="card-title"
              style={{ textDecoration: "none", color: "black" }}
              to="/home"
            >
              <span
                class="navbar-brand mb-0 h1"
                style={{ paddingRight: "10px" }}
              >
                <span style={{ color: "#162328" }}>Uber</span>
                <span style={{ color: "#3FC060" }}>Eats</span>
              </span>
            </Link>
          </Col>
          <Col style={{ textAlign: "right" }}>
            {!jwt && (
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Login"
                path="/login"
              ></ListItemNavBar>
            )}

            {jwt && (
              <React.Fragment>
                <ListItemNavBar
                  iconClass="fa fa-sign-out"
                  label="Logout"
                  path="/logout"
                ></ListItemNavBar>
              </React.Fragment>
            )}
            {jwt && !user.isRestaurant && (
              <React.Fragment>
                <Button
                  variant="dark"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    this.setState({
                      showCartModal: !showCartModal && this.props.restaurant,
                    });
                  }}
                >
                  Cart - {cartItemsCount}
                </Button>
              </React.Fragment>
            )}
          </Col>
        </Row>
        {showCartModal && (
          <CustomerCartModal
            showModal={showCartModal}
            onHide={this.onHide}
            onCheckoutClick={this.onCheckoutClick}
          ></CustomerCartModal>
        )}
      </Navbar>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    jwt: state.auth.jwt,
    user: state.auth.auth,
    restaurant: state.orders.restaurant,
    cartItemsCount: state.orders.cartItemsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStoreToProps, mapDispatchToProps)(NavBar);
