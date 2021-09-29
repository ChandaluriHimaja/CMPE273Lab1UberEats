import React, { Component } from "react";
import { categories, types } from "./common/dish-categories-list";
import {
  addRestaurantDishData,
  getRestaurantDishData,
  updateRestaurantDishData,
  deleteRestaurantDishData,
} from "../redux";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "./common/form";

class RestaurantAddNewDish extends Form {
  state = {
    dishId: "",
    categories: [],
    types: [],
    data: {
      name: "",
      mainIngrediant: "",
      image:
        "https://masalakitchen.se/wp-content/uploads/elementor/thumbs/dish-placeholder-oh93w8hupnaedailrhs009mxgeu27sji8gxxx5gpx4.jpg",
      price: "",
      description: "",
      category: "",
      type: "",
    },
    errors: {},
    showWarningBanner: false,
  };

  schema = {
    name: Joi.string().required().label("Dish name"),
    mainIngrediant: Joi.string().required().label("Main Ingrediant"),
    image: Joi.string().required(),
    price: Joi.number().required().label("Price"),
    description: Joi.string().required().label("Description"),
    category: Joi.string().required().label("Category"),
    type: Joi.string().required().label("Type"),
  };

  componentDidMount = async () => {
    this.setState({ categories, types });
    const dishId = this.props.match.params.id;
    console.log("DISH ID FROM PROPS: ", dishId);
    if (dishId === "new") return;

    this.setState({ dishId });
    const dish = await this.props.getRestaurantDishData(dishId);
    if (this.props.restaurantGetDishError) {
      this.setState({ showWarningBanner: true });
    } else {
      const data = {
        name: dish.name,
        mainIngrediant: dish.mainIngrediant,
        image: dish.image,
        price: dish.price,
        description: dish.description,
        category: dish.category,
        type: dish.type,
      };
      this.setState({ data });
    }
  };

  doSubmit = async () => {
    const { data } = this.state;
    if (this.state.dishId) {
      await this.props.updateRestaurantDishData({
        ...data,
        _id: this.state.dishId,
        _restaurantId: this.props.restaurantData._id,
      });
      if (this.props.restaurantUpdateDishError) {
        this.setState({ showWarningBanner: true });
      } else {
        this.props.history.push("/restaurantDishes");
      }
    } else {
      await this.props.addRestaurantDishData({
        ...data,
        _restaurantId: this.props.restaurantData._id,
      });
      if (this.props.restaurantAddDishError) {
        this.setState({ showWarningBanner: true });
      } else {
        this.props.history.push("/restaurantDishes");
      }
    }
  };

  handleDeleteButtonClick = async () => {
    await this.props.deleteRestaurantDishData(this.state.dishId);
    if (this.props.restaurantDeleteDishError) {
      this.setState({ showWarningBanner: true });
    } else {
      this.props.history.push("/restaurantDishes");
    }
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
            {this.props.restaurantAddDishError}
            {this.props.restaurantGetDishError}
          </div>
        )}

        <div className="row justify-content-center">
          {this.props.match.params.id === "new" ? (
            <div className="col-md-11">
              <h1 className="mt-4 mb-4">Dish</h1>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-11">
                <h1 className="mt-4 mb-4">Dish</h1>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-custom"
                  style={{ marginTop: "30px" }}
                  onClick={this.handleDeleteButtonClick}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Dish Name", "text")}
          {this.renderInput("mainIngrediant", "Main Ingrediant", "text")}
          {this.renderInput("price", "Price", "number")}
          {this.renderInput("description", "Description", "text")}
          {this.renderSelect("category", "Category", this.state.categories)}
          {this.renderSelect("type", "Type", this.state.types)}
          <div style={{ paddingTop: "10px" }}>
            {this.renderButton("Save Item")}
          </div>
        </form>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    restaurantData: state.restaurant.restaurantData,
    restaurantAddDishError: state.restaurant.restaurantAddDishError,
    restaurantGetDishError: state.dishes.restaurantGetDishError,
    restaurantUpdateDishError: state.dishes.restaurantUpdateDishError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRestaurantDishData: (data) => dispatch(addRestaurantDishData(data)),
    updateRestaurantDishData: (data) =>
      dispatch(updateRestaurantDishData(data)),
    getRestaurantDishData: (id) => dispatch(getRestaurantDishData(id)),
    deleteRestaurantDishData: (dishId) =>
      dispatch(deleteRestaurantDishData(dishId)),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(RestaurantAddNewDish);
