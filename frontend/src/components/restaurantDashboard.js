import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { countries } from "./common/countries-list";
import { connect } from "react-redux";
import { uploadImage } from "../services/imageUploadService";
import { restaurantUpdateProfile, getRestaurantData } from "../redux";

class RestaurantDashboard extends Form {
  state = {
    countries: [],
    data: {
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      about: "",
      picture: "",
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
    name: Joi.string().required().label("Restaurant Name"),
    email: Joi.string().required().email().label("Email"),
    street: Joi.string().required().label("Street"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    country: Joi.string().required().label("Country"),
    zipCode: Joi.string().length(5).required().label("Zip Code"),
    phoneNumber: Joi.string().length(10).required().label("Phone Number"),
    about: Joi.string().label("Description"),
    picture: Joi.string().label("Restaurant Image"),
    openingTime: Joi.string().label("Opening Time"),
    closingTime: Joi.string().label("Closing Time"),
    pickupMode: Joi.boolean().label("Pickup Mode"),
    deliveryMode: Joi.boolean().label("Delivery Mode"),
  };

  componentDidMount = async () => {
    this.setState({ countries });
    await this.props.getRestaurantData();
    const restaurantData = this.props.restaurantData;
    console.log("RESTAURANTDATA:::: ", restaurantData);
    const data = {
      name: restaurantData.name,
      email: restaurantData.email,
      street: restaurantData.addresses[0].street,
      city: restaurantData.addresses[0].city,
      state: restaurantData.addresses[0].state,
      country: restaurantData.addresses[0].country,
      zipCode: restaurantData.addresses[0].zipCode.toString(),
      phoneNumber: restaurantData.phoneNumber.toString(),
      about: restaurantData.about,
      picture: restaurantData.picture,
      openingTime: restaurantData.openingTime,
      closingTime: restaurantData.closingTime,
      pickupMode: restaurantData.pickupMode,
      deliveryMode: restaurantData.deliveryMode,
    };
    this.setState({
      data,
    });
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.restaurantUpdateProfile({
      ...data,
      _id: this.props.restaurantData._id,
    });
    if (this.props.restaurantProfileUpdateError) {
      console.log("Error present restaurant dashboard");
      this.setState({ showWarningBanner: true });
    } else {
      console.log("No Error present restaurant dashboard");
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
              <h1
                className="mt-4 mb-4"
                style={{
                  paddingLeft: "50px",
                }}
              >
                Dashboard
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
                "profilePic",
                "Profile Picture",
                this.handleFileUpload,
                disableEdting
              )}
            </div>
            <div className="col-lg-8" style={{ paddingTop: "10px" }}>
              {this.renderInput(
                "name",
                "Restaurant Name",
                "text",
                disableEdting
              )}
              {this.renderInput("email", "Email", "text", true)}
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
                "about",
                "Description",
                "string",
                disableEdting
              )}
              {this.renderInput(
                "openingTime",
                "Opening Time",
                "time",
                disableEdting
              )}
              {this.renderInput(
                "closingTime",
                "Closing Time",
                "time",
                disableEdting
              )}
              <div style={{ paddingTop: "10px" }}>
                {this.renderCheckBox(
                  "pickupMode",
                  "Pickup Mode Supported",
                  this.state.data.pickupMode,
                  disableEdting
                )}
              </div>
              <div style={{ paddingTop: "10px" }}>
                {this.renderCheckBox(
                  "deliveryMode",
                  "Delivery Mode Supported",
                  this.state.data.deliveryMode,
                  disableEdting
                )}
              </div>

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
    restaurantData: state.restaurant.restaurantData,
    restaurantProfileUpdateError: state.restaurant.restaurantProfileUpdateError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restaurantUpdateProfile: (data) => dispatch(restaurantUpdateProfile(data)),
    getRestaurantData: () => dispatch(getRestaurantData()),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RestaurantDashboard);
