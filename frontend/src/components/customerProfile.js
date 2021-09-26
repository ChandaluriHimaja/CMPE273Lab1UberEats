import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { customerUpdateProfile, getCustomerData } from "../redux";

class CustomerProfile extends Form {
  state = {
    data: {
      nickname: "",
      name: "",
      email: "",
      dateOfBirth: "",
      profilePic: "",
      phoneNumber: "",
      about: "",
    },
    errors: {},
    showWarningBanner: false,
    showSuccessBanner: false,
    disableEdting: true,
  };

  schema = {
    nickname: Joi.string().required().label("Nickname"),
    email: Joi.string().required().email().label("Email"),
    name: Joi.string().required().label("Name"),
    dateOfBirth: Joi.date().required().label("Date of Birth"),
    profilePic: Joi.string().uri().label("Profile Pic"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    about: Joi.string().required().label("About"),
  };

  componentDidMount = async () => {
    await this.props.getCustomerData(this.props.auth._id);
    const customerData = this.props.customerData;
    const auth = this.props.auth;
    const data = {
      nickname: customerData.nickname,
      email: auth.email,
      name: customerData.name,
      dateOfBirth: customerData.dateOfBirth,
      profilePic: customerData.profilePic,
      phoneNumber: customerData.phoneNumber,
      about: customerData.about,
    };
    this.setState({
      data,
    });
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.customerUpdateProfile({
      ...data,
      _id: this.props.customerData._id,
    });
    if (this.props.customerProfileUpdateError) {
      this.setState({ showWarningBanner: true });
    } else {
      this.setState({
        showSuccessBanner: true,
        disableEdting: true,
        showWarningBanner: false,
      });
    }
  };

  handleEditButtonClick = () => {
    const disableEdting = !this.state.disableEdting;
    this.setState({
      disableEdting,
    });
  };

  render() {
    const { disableEdting } = this.state;

    return (
      <div
        className="container"
        style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingBottom: "20px",
        }}
      >
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
              onClick={() => this.setState({ showSuccessBanner: false })}
            >
              &times;
            </button>
            Successfully updated profile data
          </div>
        )}

        <div className="row justify-content-center">
          <div className="row">
            <div className="col-md-11">
              <h1 className="mt-4 mb-4">Dashboard</h1>
            </div>
            <div className="col-md-1">
              {this.state.disableEdting && (
                <button
                  className="btn btn-custom"
                  style={{ marginTop: "30px" }}
                  onClick={this.handleEditButtonClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", disableEdting)}
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("nickname", "Nickname", "text", disableEdting)}
          {this.renderDateOfBirthInput(
            "dateOfBirth",
            "Date Of Birth",
            "date",
            disableEdting
          )}
          {this.renderInput(
            "phoneNumber",
            "Phone Number",
            "number",
            disableEdting
          )}
          {this.renderInput("about", "About", "text", disableEdting)}
          {!this.state.disableEdting && (
            <div style={{ paddingTop: "10px" }}>
              {this.renderButton("Update")}
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    customerData: state.customer.customerData,
    customerProfileUpdateError: state.customer.customerProfileUpdateError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerUpdateProfile: (data) => dispatch(customerUpdateProfile(data)),
    getCustomerData: (id) => dispatch(getCustomerData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerProfile);
