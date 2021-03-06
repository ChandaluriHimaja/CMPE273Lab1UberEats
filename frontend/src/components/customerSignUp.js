import React from "react";
import { Redirect } from "react-router-dom";
import { countries } from "./common/countries-list";
import Joi from "joi-browser";
import Form from "./common/form";
import { customerSignUp } from "../redux";
import { connect } from "react-redux";

class CustomerSignUp extends Form {
  state = {
    countries: [],
    data: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    errors: {},
    showWarningBanner: false,
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    street: Joi.string().label("Street"),
    city: Joi.string().label("City"),
    state: Joi.string().label("State"),
    country: Joi.string().label("Country"),
    zipCode: Joi.string().length(5).label("Zip Code"),
  };

  componentDidMount = async () => {
    this.setState({ countries });
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.customerSignUp({ ...data });
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
          <h1 className="mt-4 mb-4">Customer Sign Up</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text")}
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("phoneNumber", "Phone Number", "number")}
          {this.renderInput("street", "Street", "text")}
          {this.renderInput("city", "City", "text")}
          {this.renderInput("state", "State", "text")}
          {this.renderSelect("country", "Country", this.state.countries)}
          {this.renderInput("zipCode", "Zip Code", "number")}

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
    signUpError: state.customer.signUpError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerSignUp: (data) => dispatch(customerSignUp(data)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerSignUp);
