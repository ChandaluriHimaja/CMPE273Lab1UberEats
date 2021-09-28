import React, { Component } from "react";
import { connect } from "react-redux";
import DishesCard from "./dishesCard";

class CustomerRestaurantPage extends React.Component {
  state = {
    restaurantData: {},
  };

  componentDidMount = () => {
    const restaurantId = this.props.match.params.id;
    const [restaurantData] = this.props.allRestaurantData.filter(
      (restaurant) => {
        return restaurant._id == restaurantId;
      }
    );
    this.setState({ restaurantData });
  };

  render() {
    const {
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      description,
      restaurantImage,
      openingTime,
      closingTime,
      name,
      street,
      dishes,
    } = this.state.restaurantData;

    return (
      <div>
        <div
          style={{
            height: "100%",
            backgroundColor: "#F3F3F3",
            backgroundImage: `url("${restaurantImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingTop: "500px",
          }}
        >
          <h6
            style={{
              paddingBottom: "30px",
              paddingLeft: "30px",
              color: "white",
              textShadow: "2px 2px 20px black",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {name && name.toUpperCase()}
          </h6>
        </div>
        <div
          style={{
            paddingTop: "10px",
            paddingLeft: "10px",
            letterSpacing: "0.5px",
          }}
        >
          <h6>
            ADDRESS:{" "}
            <span className="text-muted">
              {street}, {city}, {state}, {country}, {zipCode}{" "}
            </span>
          </h6>
          <h6>
            DESCRIPTION: <span className="text-muted">{description}</span>
          </h6>
          <h6>
            TIMINGS:{" "}
            <span className=" text-muted">
              {openingTime} - {closingTime}
            </span>
          </h6>
          <h6>
            PHONE NUMBER: <span className=" text-muted">+1 {phoneNumber}</span>
          </h6>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <h2>Dishes</h2>
          <div className="d-flex flex-wrap">
            {dishes &&
              dishes.map((restaurantDish) => {
                return <DishesCard {...restaurantDish}></DishesCard>;
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

export default connect(mapStoreToProps, null)(CustomerRestaurantPage);
