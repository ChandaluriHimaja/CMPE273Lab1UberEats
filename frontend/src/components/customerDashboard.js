import React, { Component } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import SearchBox from "./common/searchBox";
import { getAllRestaurantsData } from "../redux";
import { connect } from "react-redux";
import RestaurantCard from "./restaurantCard";

class CustomerDashboard extends Component {
  state = {
    searchQuery: "",
    location: "",
  };

  componentDidMount = async () => {
    await this.props.getAllRestaurantsData();
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  render() {
    const { searchQuery, location } = this.state;

    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ paddingLeft: "50px", paddingTop: "15px" }}>
            <BootstrapSwitchButton
              width={100}
              onlabel="Delivery"
              offlabel="Pickup"
              checked={true}
              onstyle="success"
              offstyle="dark"
            ></BootstrapSwitchButton>
          </div>
          <SearchBox
            value={location}
            onChange={this.handleLocationChange}
            placeholder="Location"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          ></SearchBox>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Search..."
            style={{ marginLeft: "10px", marginRight: "50px" }}
          ></SearchBox>
        </div>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div style={{ width: "300px", marginRight: "30px" }}>
            <h3 style={{ textAlign: "center" }}>Filters</h3>
          </div>
          <div className="d-flex flex-wrap" style={{ display: "d-flex" }}>
            {this.props.allRestaurantData.map((restaurant) => {
              return <RestaurantCard {...restaurant}></RestaurantCard>;
            })}
            {this.props.allRestaurantData.map((restaurant) => {
              return <RestaurantCard {...restaurant}></RestaurantCard>;
            })}
            {this.props.allRestaurantData.map((restaurant) => {
              return <RestaurantCard {...restaurant}></RestaurantCard>;
            })}
            {this.props.allRestaurantData.map((restaurant) => {
              return <RestaurantCard {...restaurant}></RestaurantCard>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    allRestaurantData: state.allRestaurant.allRestaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurantsData: () => dispatch(getAllRestaurantsData()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerDashboard);
