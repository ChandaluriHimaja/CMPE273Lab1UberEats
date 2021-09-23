import React, { Component } from "react";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      ></Redirect>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
