import * as actions from "./ordersActionTypes";
import http from "../../services/httpService";
import _ from "lodash";
import store from "../store";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/orders";

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

export const customerPlaceOrderSuccess = () => {
  return {
    type: actions.CUSTOMER_PLACE_ORDER_SUCCESS,
  };
};

export const customerPlaceOrderFailure = (customerPlaceOrderError) => {
  return {
    type: actions.CUSTOMER_PLACE_ORDER_FAILURE,
    payload: {
      customerPlaceOrderError,
    },
  };
};

export const resetOrderDetailsAfterPlacing = () => {
  return {
    type: actions.RESET_ORDER_DETAILS_AFTER_PLACING,
  };
};

export const getCustomerOrdersSuccess = (customerOrders) => {
  return {
    type: actions.GET_CUSTOMER_ORDERS_SUCCESS,
    payload: {
      customerOrders,
    },
  };
};

export const getCustomerOrdersFailure = (getCustomerOrdersError) => {
  return {
    type: actions.GET_CUSTOMER_ORDERS_FAILURE,
    payload: {
      getCustomerOrdersError,
    },
  };
};

export const getRestaurantOrdersSuccess = (restaurantOrders) => {
  return {
    type: actions.GET_RESTAURANT_ORDERS_SUCCESS,
    payload: {
      restaurantOrders,
    },
  };
};

export const getRestaurantOrdersFailure = (getRestaurantOrdersError) => {
  return {
    type: actions.GET_RESTAURANT_ORDERS_FAILURE,
    payload: {
      getRestaurantOrdersError,
    },
  };
};

export const getCustomerOrders = (id) => {
  console.log("getCustomerOrders: ", id);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/customer/" + id);
      if (response && response.status === 200) {
        console.log("RESPONSE CUST ORDERS: ", response.data);
        dispatch(getCustomerOrdersSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(getCustomerOrdersFailure(ex.response.data));
      }
    }
  };
};

export const getRestaurantOrders = (id) => {
  console.log("getCustomerOrders: ", id);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/customer/" + id);
      if (response && response.status === 200) {
        console.log("RESPONSE CUST ORDERS: ", response.data);
        dispatch(getRestaurantOrdersSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(getRestaurantOrdersFailure(ex.response.data));
      }
    }
  };
};

export const customerPlaceOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint, orderDetails);
      if (response && response.status === 200) {
        dispatch(customerPlaceOrderSuccess());
        dispatch(resetOrderDetailsAfterPlacing());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(customerPlaceOrderFailure(ex.response.data));
      }
    }
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
