import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { customerSignUp } from "../redux";
import { connect } from "react-redux";

class CustomerSignUp extends Form {
  state = {
    data: { name: "", email: "", password: "", phoneNumber: "" },
    errors: {},
    showWarningBanner: false,
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.customerSignUp({ ...data, isRestaurant: 0 });
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
