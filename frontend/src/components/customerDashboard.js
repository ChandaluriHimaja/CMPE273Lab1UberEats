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
    typeFilter: "",
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

  handleFilterCheckboxChange = (e) => {
    const name = e.currentTarget.name;
    const typeFilter = this.state.typeFilter;
    if (name in typeFilter) {
    }
  };

  render() {
    const { searchQuery, location } = this.state;

    return (
      <div
        className="container"
        style={{
          paddingBottom: "20px",
        }}
      >
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
        <div style={{ marginTop: "20px", display: "flex" }}>
          <h3 style={{ textAlign: "center" }}>Filters</h3>
          <div></div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 100px",
            }}
          >
            <div className="d-flex flex-wrap" style={{ display: "d-flex" }}>
              {this.props.allRestaurantData.map((restaurant) => {
                return <RestaurantCard {...restaurant}></RestaurantCard>;
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
    allRestaurantData: state.allRestaurant.allRestaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRestaurantsData: () => dispatch(getAllRestaurantsData()),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerDashboard);
