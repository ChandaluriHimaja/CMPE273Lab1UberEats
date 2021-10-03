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

export const updateRestaurantOrderingFrom = (restaurant, restaurantName) => {
  return {
    type: actions.UPDATE_RESTAURANT_ORDERING_FROM,
    payload: {
      restaurant,
      restaurantName,
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

export const orderRestaurantChangeAlert = (
  newRestaurantDish,
  newRestaurant,
  newRestaurantName
) => {
  return {
    type: actions.RESTAURANT_CHANGE_ALERT,
    payload: {
      newRestaurantDish,
      newRestaurant,
      newRestaurantName,
    },
  };
};

export const resetNewRestaurantDetails = () => {
  return {
    type: actions.RESET_ORDER_RESTAURANT,
  };
};

export const setOrderMode = (orderMode) => {
  return {
    type: actions.SET_ORDER_MODE,
    payload: {
      orderMode,
    },
  };
};

export const updateOrderAndCart = (dishDetails) => {
  return (dispatch) => {
    console.log("DISH DETAILS: ", dishDetails);
    const orderDetails = store.getState().orders.orderDetails;
    const restaurant = store.getState().orders.restaurant;
    const cartItemsCount = store.getState().orders.cartItemsCount;

    if (dishDetails.quantity == 0) {
      console.log("dishDetails.quantity == 0");
      const dish = _.remove(orderDetails, { _id: dishDetails._id });
      console.log("DELETED orderDetails: ", orderDetails);
      dispatch(addRemoveDishesFromCart(orderDetails));
      const count = orderDetails.reduce((c, dish) => c + dish.quantity, 0);
      console.log(count);
      dispatch(updateNumberOfItemsInCart(count));
      if (orderDetails.length == 0) {
        dispatch(updateRestaurantOrderingFrom("", ""));
      }
    } else if (!restaurant) {
      console.log("!restaurant");
      dispatch(
        updateRestaurantOrderingFrom(
          dishDetails.restaurantId,
          dishDetails.restaurantName
        )
      );
      dispatch(addRemoveDishesFromCart([dishDetails]));
      dispatch(updateNumberOfItemsInCart(dishDetails.quantity));
    } else if (restaurant && dishDetails.restaurantId != restaurant) {
      console.log("restaurant && dishDetails.restaurantId != restaurant");
      dispatch(
        orderRestaurantChangeAlert(
          dishDetails,
          dishDetails.restaurantId,
          dishDetails.restaurantName
        )
      );
    } else if (restaurant && dishDetails.restaurantId == restaurant) {
      console.log("restaurant && dishDetails.restaurantId == restaurant");
      const dish = _.find(orderDetails, { _id: dishDetails._id });
      if (dish) {
        const q = dish.quantity;
        dish.quantity = dishDetails.quantity;
        console.log("DISH DETAILS AFTER UPDATE : ", dishDetails);
        dispatch(addRemoveDishesFromCart(orderDetails));
        dispatch(
          updateNumberOfItemsInCart(cartItemsCount - q + dishDetails.quantity)
        );
      } else {
        console.log("else");
        orderDetails.push(dishDetails);
        dispatch(addRemoveDishesFromCart(orderDetails));
        dispatch(
          updateNumberOfItemsInCart(dishDetails.quantity + cartItemsCount)
        );
      }
    }
  };
};

export const changeOrderRestaurant = () => {
  return (dispatch) => {
    const newRestaurant = store.getState().orders.newRestaurant;
    const newRestaurantName = store.getState().orders.newRestaurantName;
    const newRestaurantDish = store.getState().orders.newRestaurantDish;
    dispatch(addRemoveDishesFromCart([newRestaurantDish]));
    dispatch(updateRestaurantOrderingFrom(newRestaurant, newRestaurantName));
    dispatch(updateNumberOfItemsInCart(newRestaurantDish.quantity));
    dispatch(resetNewRestaurantDetails());
  };
};
