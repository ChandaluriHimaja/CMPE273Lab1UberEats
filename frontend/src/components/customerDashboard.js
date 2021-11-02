import React, { Component } from "react";
import _ from "lodash";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SearchBox from "./common/searchBox";
import {
  getAllRestaurantsData,
  getCustomerData,
  getCustomerLikesData,
  setOrderMode,
  getCustomerDeliveryAddress,
  setOrderLocation,
} from "../redux";
import { connect } from "react-redux";
import RestaurantCard from "./restaurantCard";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { customerTypes, deliveryModes } from "./common/dish-categories-list";

class CustomerDashboard extends Component {
  state = {
    deliveryMode: "Delivery",
    searchQuery: "",
    // location: "",
    typeFilter: "All",
  };

  componentDidMount = async () => {
    await this.props.getAllRestaurantsData();
    await this.props.getCustomerData(this.props.auth._id);
    // await this.props.getCustomerDeliveryAddress(this.props.customerData._id);
    // await this.props.setOrderLocation(
    //   this.props.customerDeliveryAddressData.city
    // );
    await this.props.setOrderLocation(
      this.props.customerData.addresses[0].city
    );
    // await this.props.getCustomerLikesData(this.props.customerData._id);
    this.props.setOrderMode(this.state.deliveryMode);
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleLocationChange = async (location) => {
    // this.setState({ location });
    await this.props.setOrderLocation(location);
  };

  handleTypeRadioValueChange = (e) => {
    const typeFilter = e.currentTarget.value;
    this.setState({ typeFilter });
  };

  handleDeliveryModeValueChange = (e) => {
    const deliveryMode = e.currentTarget.value;
    this.setState({ deliveryMode });
    this.props.setOrderMode(deliveryMode);
  };

  getFilteredRestaurants = (allRestaurantData) => {
    console.log("allRestaurantData: ", allRestaurantData);
    console.log("Hey in getFilteredRestaurants");
    const { searchQuery, typeFilter, deliveryMode } = this.state;

    let deliveryFilteredData = allRestaurantData;

    deliveryFilteredData = allRestaurantData.filter((restaurant) => {
      return (
        (deliveryMode === "Delivery" && restaurant.deliveryMode === true) ||
        (deliveryMode === "PickUp" && restaurant.pickupMode === true)
      );
    });

    console.log("deliveryFilteredData: ", deliveryFilteredData);

    let typeFilteredData = deliveryFilteredData;

    if (typeFilter !== "All") {
      typeFilteredData = deliveryFilteredData.filter((restaurant) => {
        const typeDishes = restaurant.dishes.filter((dish) => {
          return dish.type === typeFilter;
        });
        return typeDishes.length === 0 ? false : true;
      });
    }

    console.log("typeFilteredData: ", typeFilteredData);

    let searchFilteredData = typeFilteredData;

    searchFilteredData = typeFilteredData.filter((restaurant) => {
      const nameMatch = restaurant.name
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase());
      if (nameMatch) return true;
      const searchFilteredDish = restaurant.dishes.filter((dish) => {
        return dish.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
      return searchFilteredDish.length === 0 ? false : true;
    });

    const locationFilteredData = [];
    const notLocationFilteredData = [];

    searchFilteredData.forEach((restaurant) => {
      if (
        restaurant.addresses[0].street
          .toLowerCase()
          .startsWith(this.props.orderLocation.toLowerCase()) ||
        restaurant.addresses[0].city
          .toLowerCase()
          .startsWith(this.props.orderLocation.toLowerCase()) ||
        restaurant.addresses[0].state
          .toLowerCase()
          .startsWith(this.props.orderLocation.toLowerCase()) ||
        restaurant.addresses[0].country
          .toLowerCase()
          .startsWith(this.props.orderLocation.toLowerCase()) ||
        restaurant.addresses[0].zipCode
          .toString()
          .startsWith(this.props.orderLocation)
      ) {
        locationFilteredData.push(restaurant);
      } else {
        notLocationFilteredData.push(restaurant);
      }
    });

    console.log("LOCATION FILTER: ", locationFilteredData);
    return [...locationFilteredData, ...notLocationFilteredData];
  };

  render() {
    const { searchQuery, typeFilter, deliveryMode } = this.state;
    // const location = this.props.orderLocation;

    const filteredRestaurantData = this.getFilteredRestaurants(
      this.props.allRestaurantData
    );

    return (
      <div
        className="container"
        style={{
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ paddingTop: "15px" }}>
            <ButtonGroup className="mb-2" style={{ width: "100%" }}>
              {deliveryModes.map((mode) => (
                <ToggleButton
                  key={mode}
                  type="radio"
                  variant={
                    mode === "Delivery" ? "outline-success" : "outline-dark"
                  }
                  name="mode-radio"
                  value={mode}
                  checked={deliveryMode === mode}
                  onChange={this.handleDeliveryModeValueChange}
                >
                  {mode}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <SearchBox
            value={this.props.orderLocation}
            onChange={this.handleLocationChange}
            placeholder="Search by Location"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          ></SearchBox>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Search by Restaurant name, Dish name.."
            style={{ marginLeft: "10px", marginRight: "50px" }}
          ></SearchBox>
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <h3 style={{ textAlign: "center" }}>Filters</h3>
          <div style={{ paddingLeft: "50px" }}>
            <ButtonGroup className="mb-2">
              {customerTypes.map((type) => (
                <ToggleButton
                  key={type}
                  type="radio"
                  variant="outline-secondary"
                  name="type-radio"
                  value={type}
                  checked={typeFilter === type}
                  onChange={this.handleTypeRadioValueChange}
                >
                  {type}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
            }}
          >
            <div className="d-flex flex-wrap" style={{ display: "d-flex" }}>
              {filteredRestaurantData.map((restaurant) => {
                const index = _.findIndex(
                  this.props.customerData.favourites,
                  function (custLikes) {
                    console.log(
                      "cust likes: ",
                      custLikes.toString(),
                      "rest id",
                      restaurant._id.toString()
                    );
                    return custLikes.toString() === restaurant._id.toString();
                  }
                );
                console.log("INDEX: ", index);
                const liked = index === -1 ? false : true;
                const restaurantData = { ...restaurant, liked };
                return <RestaurantCard {...restaurantData}></RestaurantCard>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    customerData: state.customer.customerData,
    allRestaurantData: state.allRestaurant.allRestaurantData,
    customerLikesData: state.favorites.customerLikesData,
    customerDeliveryAddressData:
      state.deliveryAddresses.customerDeliveryAddressData[0],
    orderLocation: state.orders.orderLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurantsData: () => dispatch(getAllRestaurantsData()),
    getCustomerData: (id) => dispatch(getCustomerData(id)),
    getCustomerLikesData: (id) => dispatch(getCustomerLikesData(id)),
    setOrderMode: (orderMode) => dispatch(setOrderMode(orderMode)),
    getCustomerDeliveryAddress: (id) =>
      dispatch(getCustomerDeliveryAddress(id)),
    setOrderLocation: (location) => dispatch(setOrderLocation(location)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerDashboard);
