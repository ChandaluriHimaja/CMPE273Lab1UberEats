import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { connect } from "react-redux";
import { countries } from "./common/countries-list";
import { uploadImage } from "../services/imageUploadService";
import {
  customerUpdateProfile,
  getCustomerData,
  getCustomerDeliveryAddress,
} from "../redux";

class CustomerProfile extends Form {
  state = {
    countries: [],
    data: {
      nickname: "",
      name: "",
      email: "",
      dateOfBirth: "",
      picture: "",
      phoneNumber: "",
      about: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    errors: {},
    showWarningBanner: false,
    showSuccessBanner: false,
    disableEdting: true,
  };

  schema = {
    nickname: Joi.string().label("Nickname"),
    email: Joi.string().required().email().label("Email"),
    name: Joi.string().required().label("Name"),
    dateOfBirth: Joi.date().label("Date of Birth").allow(""),
    picture: Joi.string().uri().label("Profile Pic"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    about: Joi.string().label("About"),
    street: Joi.string().label("Street"),
    city: Joi.string().label("City"),
    state: Joi.string().label("State"),
    country: Joi.string().label("Country"),
    zipCode: Joi.string().length(5).label("Zip Code"),
  };

  getDateInFormat = (date) => {
    console.log("Date: ", date);
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };

  componentDidMount = async () => {
    this.setState({ countries });
    await this.props.getCustomerData(this.props.auth._id);
    const customerData = this.props.customerData;
    let dateInFormat = "";
    if (customerData.dateOfBirth) {
      const date = new Date(customerData.dateOfBirth);
      dateInFormat = this.getDateInFormat(date);
    } else {
      dateInFormat = "";
    }
    let data = {
      nickname: customerData.nickname,
      email: customerData.email,
      name: customerData.name,
      dateOfBirth: dateInFormat,
      picture: customerData.picture,
      phoneNumber: customerData.phoneNumber.toString(),
      about: customerData.about,
      street: customerData.addresses[0].street,
      city: customerData.addresses[0].city,
      state: customerData.addresses[0].state,
      country: customerData.addresses[0].country,
      zipCode: customerData.addresses[0].zipCode.toString(),
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
      deliveryAddressId: this.props.customerData.addresses[0]._id,
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

  handleFileUpload = async (e) => {
    const picture = await uploadImage(e.target.files[0]);
    console.log("ROFILEPICURL: ", picture);
    if (picture) {
      const { data } = this.state;
      data.picture = picture;
      this.setState({ data });
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
              <h1 className="mt-4 mb-4" style={{ paddingLeft: "50px" }}>
                My Profile
              </h1>
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
          <div className="row">
            <div className="col-lg-4">
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <img
                  className="card-img-top"
                  src={this.state.data.picture}
                  style={{
                    width: "300px",
                  }}
                ></img>
              </div>
              {this.renderImageUploadButton(
                "picture",
                "Profile Picture",
                this.handleFileUpload,
                disableEdting
              )}
            </div>
            <div className="col-lg-8" style={{ paddingTop: "10px" }}>
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

              {!this.state.disableEdting && (
                <div style={{ paddingTop: "10px" }}>
                  {this.renderButton("Update")}
                </div>
              )}
            </div>
          </div>
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
    customerDeliveryAddressData:
      state.deliveryAddresses.customerDeliveryAddressData[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerUpdateProfile: (data) => dispatch(customerUpdateProfile(data)),
    getCustomerDeliveryAddress: (id) =>
      dispatch(getCustomerDeliveryAddress(id)),
    getCustomerData: (id) => dispatch(getCustomerData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerProfile);
