import React, { Component } from "react";
import { getCustomerLikesData } from "../redux";
import { connect } from "react-redux";
import RestaurantCard from "./restaurantCard";
import _ from "lodash";

class CustomerFavourites extends React.Component {
  componentDidMount = async () => {
    await this.props.getCustomerLikesData(this.props.customerData._id);
  };

  getFavoriteRestaurants = () => {
    let favoriteRestaurantsData = this.props.allRestaurantData;

    favoriteRestaurantsData = this.props.allRestaurantData.filter(
      (restaurant) => {
        const index = _.findIndex(
          this.props.customerLikesData,
          function (custLikes) {
            return custLikes._restaurantId === restaurant._id;
          }
        );
        return index === -1 ? false : true;
      }
    );

    return favoriteRestaurantsData;
  };

  render() {
    const favoriteRestaurants = this.getFavoriteRestaurants();
    console.log("favoriteRestaurants: ", favoriteRestaurants);

    return (
      <React.Fragment>
        <div
          className="container"
          style={{
            paddingLeft: "100px",
            paddingRight: "100px",
            paddingBottom: "20px",
          }}
        >
          <h1 className="mt-4 mb-4" style={{ paddingLeft: "10px" }}>
            My favorites
          </h1>
          <div className="d-flex flex-wrap" style={{ display: "d-flex" }}>
            {favoriteRestaurants &&
              favoriteRestaurants.map((restaurant) => {
                const restaurantData = { ...restaurant, liked: true };
                return <RestaurantCard {...restaurantData}></RestaurantCard>;
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    customerData: state.customer.customerData,
    customerLikesData: state.favorites.customerLikesData,
    allRestaurantData: state.allRestaurant.allRestaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerLikesData: (id) => dispatch(getCustomerLikesData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CustomerFavourites);
