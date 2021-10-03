import React, { Component } from "react";
import { connect } from "react-redux";
import CustomerDishesCard from "./customerDishesCard";
import { Modal, Button } from "react-bootstrap";
import { resetNewRestaurantDetails, changeOrderRestaurant } from "../redux";

class CustomerRestaurantPage extends React.Component {
  state = {
    restaurantData: {},
  };

  componentDidMount = () => {
    const restaurantId = this.props.match.params.id;
    const [restaurantData] = this.props.allRestaurantData.filter(
      (restaurant) => {
        return restaurant._id == restaurantId;
      }
    );
    this.setState({ restaurantData });
  };

  onModelYes = () => {
    console.log("onModelYes");
    this.props.changeOrderRestaurant();
  };

  onModelNo = () => {
    console.log("onModelNo");
    this.props.resetNewRestaurantDetails();
  };

  render() {
    const {
      _id,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      description,
      restaurantImage,
      openingTime,
      closingTime,
      name,
      street,
      dishes,
    } = this.state.restaurantData;

    return (
      <div>
        <div
          style={{
            height: "100%",
            backgroundColor: "#F3F3F3",
            backgroundImage: `url("${restaurantImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingTop: "500px",
          }}
        >
          <h6
            style={{
              paddingBottom: "30px",
              paddingLeft: "30px",
              color: "white",
              textShadow: "2px 2px 20px black",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {name && name.toUpperCase()}
          </h6>
        </div>
        <div
          style={{
            paddingTop: "10px",
            paddingLeft: "10px",
            letterSpacing: "0.5px",
          }}
        >
          <h6>
            ADDRESS:{" "}
            <span className="text-muted">
              {street}, {city}, {state}, {country}, {zipCode}{" "}
            </span>
          </h6>
          <h6>
            DESCRIPTION: <span className="text-muted">{description}</span>
          </h6>
          <h6>
            TIMINGS:{" "}
            <span className=" text-muted">
              {openingTime} - {closingTime}
            </span>
          </h6>
          <h6>
            PHONE NUMBER: <span className=" text-muted">+1 {phoneNumber}</span>
          </h6>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <h2>Dishes</h2>
          <div className="d-flex flex-wrap">
            {dishes &&
              dishes.map((restaurantDish) => {
                return (
                  <CustomerDishesCard
                    {...restaurantDish}
                    restaurantId={_id}
                    restaurantName={name}
                  ></CustomerDishesCard>
                );
              })}
          </div>
        </div>
        <p>{this.props.restaurantChangeMessage}</p>
        {/* {!this.props.restaurantChangeMessage && ( */}
        <Modal
          show={this.props.restaurantChangeMessage}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Create new Order?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.restaurantChangeMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onModelYes}>Yes</Button>
            <Button variant="secondary" onClick={this.onModelNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {/* )} */}
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    allRestaurantData: state.allRestaurant.allRestaurantData,
    restaurantChangeMessage: state.orders.restaurantChangeMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetNewRestaurantDetails: () => dispatch(resetNewRestaurantDetails()),
    changeOrderRestaurant: () => dispatch(changeOrderRestaurant()),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CustomerRestaurantPage);
