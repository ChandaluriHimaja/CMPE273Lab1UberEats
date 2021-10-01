import * as actions from "./ordersActionTypes";
import _ from "lodash";
import store from "../store";

export const addRemoveDishesFromCart = (orderDetails) => {
  return {
    type: actions.ADD_REMOVE_DISHES_FROM_CART,
    payload: {
      orderDetails,
    },
  };
};

export const updateListOfRestaurantsOrderingFrom = (restaurants) => {
  return {
    type: actions.UPDATE_LIST_OF_RESTAURANTS_ORDERING_FROM,
    payload: {
      restaurants,
    },
  };
};

export const updateNumberOfItemsInCart = (cartItemsCount) => {
  return {
    type: actions.UPDATE_NUMBER_OF_ITEMS_IN_CART,
    payload: {
      cartItemsCount,
    },
  };
};

export const updateOrderAndCart = (dishDetails) => {
  return (dispatch) => {
    const orderDetails = store.getState().orders.orderDetails;
    const restaurants = store.getState().orders.restaurants;
    const cartItemsCount = store.getState().orders.cartItemsCount;

    if (dishDetails.quantity == 0) {
      const dishIndex = orderDetails.indexOf(dishDetails.restaurantId);
      delete orderDetails[dishIndex];
      console.log("ORDER DETAILS REMOVED DISH: ", orderDetails);
      dispatch(addRemoveDishesFromCart(orderDetails));

      const restaurantCount = orderDetails.reduce((count, orderDish) =>
        orderDish.restaurantId == dishDetails.restaurantId ? count + 1 : count
      );
      if (restaurantCount == 0) {
        const restaurantIndex = restaurants.indexOf(dishDetails.restaurantId);
        delete restaurants[restaurantIndex];
        dispatch(updateListOfRestaurantsOrderingFrom(restaurants));
      }

      dispatch(updateNumberOfItemsInCart(orderDetails.length));
    } else if (!restaurants.contains(dishDetails.restaurantId)) {
      dispatch(
        updateListOfRestaurantsOrderingFrom([
          ...restaurants,
          dishDetails.restaurantId,
        ])
      );
      dispatch(addRemoveDishesFromCart([...orderDetails, dishDetails]));
    } else if (
      restaurants.contains(dishDetails.restaurantId) &&
      !_.find(orderDetails, { _id: dishDetails._id })
    ) {
      dispatch(addRemoveDishesFromCart([...orderDetails, dishDetails]));
    } else {
      const dishIndex = _.find(orderDetails, { _id: dishDetails._id });
      orderDetails[dishIndex].quantity = dishDetails.quantity;
      dispatch(addRemoveDishesFromCart(orderDetails));
    }

    // const dishIndex = orderDetails.indexOf(dishDetails.restaurantId);
    //   orderDetails[dishIndex].quantity = dishDetails.quantity;
    //   console.log("RESTAURANTS: ", restaurants);
    //   dispatch(addRemoveDishesFromCart(restaurants));

    // dispatch(addRemoveDishesFromCart(restaurants));
    //   dispatch(updateNumberOfItemsInCart(cartItemsCount + 1));

    console.log("IN updateOrderAndCart: ", orderDetails);
  };
};
