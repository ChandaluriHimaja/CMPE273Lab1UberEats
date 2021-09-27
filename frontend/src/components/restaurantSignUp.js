import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { restaurantSignUp } from "../redux";
import { connect } from "react-redux";
import { countries } from "./common/countries-list";

class RestaurantSignUp extends Form {
  state = {
    countries: [],
    data: {
      restaurantName: "",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
    },
    errors: {},
    showWarningBanner: false,
  };

  schema = {
    restaurantName: Joi.string().required().label("Restaurant Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    street: Joi.string().required().label("Street"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    country: Joi.string().required().label("Country"),
    zipCode: Joi.string().length(5).required().label("Zip Code"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
  };

  componentDidMount = () => {
    this.setState({ countries });
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.restaurantSignUp({ ...data, isRestaurant: 1 });
    if (this.props.signUpError) {
      console.log("This.signUpError present");
      this.setState({ showWarningBanner: true });
    } else {
      console.log("This.signUpError absent");
      this.props.history.push("/login");
    }
  };

  render() {
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
            {this.props.signUpError}
          </div>
        )}

        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4">Restaurant Sign Up</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("restaurantName", "Restaurant Name", "text")}
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("street", "Street", "text")}
          {this.renderInput("city", "City", "text")}
          {this.renderInput("state", "State", "text")}
          {this.renderSelect("country", "Country", this.state.countries)}
          {this.renderInput("zipCode", "Zip Code", "number")}
          {this.renderInput("phoneNumber", "Phone Number", "number")}
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
    signUpError: state.restaurant.signUpError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restaurantSignUp: (data) => dispatch(restaurantSignUp(data)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantSignUp);
