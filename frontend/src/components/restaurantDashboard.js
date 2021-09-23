import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { countries } from "./common/countries-list";
import { connect } from "react-redux";
import { restaurantUpdateProfile, getRestaurantData } from "../redux";

class RestaurantDashboard extends Form {
  state = {
    countries: [],
    data: {
      restaurantName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      description: "",
      restaurantImg: "",
      openingTime: "",
      closingTime: "",
      pickupMode: "",
      deliveryMode: "",
    },
    errors: {},
    showWarningBanner: false,
    showSuccessBanner: false,
    disableEdting: true,
  };

  schema = {
    restaurantName: Joi.string().required().label("Restaurant Name"),
    email: Joi.string().required().email().label("Email"),
    street: Joi.string().required().label("Street"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    country: Joi.string().required().label("Country"),
    zipCode: Joi.string().length(5).required().label("Zip Code"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    description: Joi.string().label("Description"),
    restaurantImg: Joi.string().uri().label("Restaurant Image"),
    openingTime: Joi.string().label("Opening Time"),
    closingTime: Joi.string().label("Closing Time"),
    pickupMode: Joi.boolean().label("Pickup Mode"),
    deliveryMode: Joi.boolean().label("Delivery Mode"),
  };

  componentDidMount = () => {
    this.setState({ countries });
    this.props.getRestaurantData(this.props.auth._id);
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.restaurantUpdateProfile(data);
    if (this.props.restaurantProfileUpdateError) {
      this.setState({ showWarningBanner: true });
    } else {
      this.setState({ showSuccessBanner: true });
    }
  };

  render() {
    const { disableEdting } = this.state;
    return (
      <div className="container" style={{ paddingRight: "350px" }}>
        {this.state.showWarningBanner && (
          <div className="alert alert-warning alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              onClick={() => this.setState({ showWarningBanner: false })}
            >
              &times;
            </button>
            {this.props.restaurantProfileUpdateError}
          </div>
        )}

        {this.state.showSuccessBanner && (
          <div className="alert alert-warning alert-dismissible">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              onClick={() => this.setState({ showWarningBanner: false })}
            >
              &times;
            </button>
            Successfully updated profile data
          </div>
        )}

        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4">Dashboard</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "restaurantName",
            "Restaurant Name",
            "text",
            disableEdting
          )}
          {this.renderInput("email", "Email", "text", disableEdting)}
          {this.renderInput("street", "Street", "text", disableEdting)}
          {this.renderInput("city", "City", "text", disableEdting)}
          {this.renderInput("state", "State", "text", disableEdting)}
          {this.renderSelect(
            "country",
            "Country",
            this.state.countries,
            disableEdting
          )}
          {this.renderInput("zipCode", "Zip Code", "number", disableEdting)}
          {this.renderInput(
            "phoneNumber",
            "Phone Number",
            "number",
            disableEdting
          )}
          {this.renderInput(
            "description",
            "Description",
            "string",
            disableEdting
          )}
          {this.renderInput(
            "openingTime",
            "Opening Time",
            "string",
            disableEdting
          )}
          {this.renderInput(
            "closingTime",
            "Closing Time",
            "string",
            disableEdting
          )}
          {this.renderInput(
            "pickupMode",
            "Phone Number",
            "number",
            disableEdting
          )}
          <div style={{ paddingTop: "10px" }}>
            {this.renderButton("Sign Up")}
          </div>
        </form>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    restaurantProfileUpdateError: state.restaurant.restaurantProfileUpdateError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restaurantUpdateProfile: (data) => dispatch(restaurantUpdateProfile(data)),
    getRestaurantData: (id) => dispatch(getRestaurantData(id)),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RestaurantDashboard);
