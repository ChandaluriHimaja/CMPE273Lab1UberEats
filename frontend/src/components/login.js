import React from "react";
import { Redirect } from "react-router-dom";
// import { login } from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { loginSuccess } from "../redux";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { login } from "../graphql/mutation";
import jwtDecode from "jwt-decode";
import http from "../services/httpService";

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

    const { data } = await this.props.client.mutate({
      mutation: login,
      variables: { email: email, password: password },
    });
    console.log("RESPONSE OBJECT FROM GRAPHQL LOGIN:", data);
    if (data.login.token) {
      const jwt = data.login.token;
      const auth = jwtDecode(jwt);
      http.setJwt(jwt);
      await this.props.loginSuccess(jwt, auth);
    }
    // this.setState({
    //   loginClicked: true,
    //   loginResp: data.login,
    // });

    // await this.props.login(email, password);
    // if (this.props.jwt) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/",
    //       }}
    //     ></Redirect>
    //   );
    // } else {
    //   this.setState({ showWarningBanner: true });
    // }
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
    loginSuccess: (jwt, auth) => dispatch(loginSuccess(jwt, auth)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(withApollo(Login));
