import React from "react";
import { Redirect } from "react-router-dom";
// import { login } from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../redux";
import { connect } from "react-redux";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    showWarningBanner: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    await this.props.login(email, password);
    if (this.props.jwt) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        ></Redirect>
      );
    } else {
      this.setState({ showWarningBanner: true });
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
            {this.props.error}
          </div>
        )}

        <div className="row justify-content-center">
          <h1 className="mt-4 mb-4">Login</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          <div style={{ paddingTop: "10px" }}>{this.renderButton("Login")}</div>
        </form>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    jwt: state.auth.jwt,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Login);
