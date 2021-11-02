import React, { Component } from "react";
import { getRestaurantData } from "../redux";
import { connect } from "react-redux";
import DishesCard from "./dishesCard";
import { Redirect } from "react-router-dom";

class RestaurantDishes extends React.Component {
  componentDidMount = async () => {
    await this.props.getRestaurantData();
    // await this.props.getRestaurantDishesData(this.props.restaurantData._id);
  };

  render() {
    return (
      <div
        className="container"
        style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingBottom: "20px",
        }}
      >
        <div className="row justify-content-center">
          <div className="row">
            <div className="col-lg-10">
              <h1 className="mt-4 mb-4">Dishes</h1>
            </div>
            <div className="col-sm-2">
              <button
                className="btn btn-custom"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  this.props.history.push("/restaurantAddDish/new");
                }}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {this.props.restaurantData.dishes &&
            this.props.restaurantData.dishes.map((restaurantDish) => {
              return <DishesCard {...restaurantDish}></DishesCard>;
            })}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    restaurantData: state.restaurant.restaurantData,
    // restaurantDishesData: state.restaurant.restaurantDishesData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantData: () => dispatch(getRestaurantData()),
    // getRestaurantDishesData: (id) => dispatch(getRestaurantDishesData(id)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(RestaurantDishes);
// export default RestaurantDishes;
