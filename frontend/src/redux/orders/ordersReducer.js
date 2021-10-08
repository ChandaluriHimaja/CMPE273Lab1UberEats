import { startsWith } from "lodash";
import * as actions from "./ordersActionTypes";

const initialState = {
  orderDetails: [],
  restaurant: "",
  restaurantName: "",
  cartItemsCount: 0,
  restaurantChangeMessage: "",
  newRestaurantDish: {},
  newRestaurant: "",
  newRestaurantName: "",
  orderMode: "",
  orderLocation: "",
  customerPlaceOrderError: "",
  customerOrders: [],
  getCustomerOrdersError: "",
  restaurantOrders: [],
  getRestaurantOrdersError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_REMOVE_DISHES_FROM_CART:
      return {
        ...state,
        orderDetails: action.payload.orderDetails,
      };
    case actions.UPDATE_RESTAURANT_ORDERING_FROM:
      return {
        ...state,
        restaurant: action.payload.restaurant,
        restaurantName: action.payload.restaurantName,
      };
    case actions.UPDATE_NUMBER_OF_ITEMS_IN_CART:
      return {
        ...state,
        cartItemsCount: action.payload.cartItemsCount,
      };
    case actions.RESTAURANT_CHANGE_ALERT:
      return {
        ...state,
        restaurantChangeMessage: `Your order contains items from ${state.restaurantName}. Create a new order to add items from ${action.payload.newRestaurantName}`,
        newRestaurant: action.payload.newRestaurant,
        newRestaurantName: action.payload.newRestaurantName,
        newRestaurantDish: action.payload.newRestaurantDish,
      };
    case actions.RESET_ORDER_RESTAURANT:
      return {
        ...state,
        restaurantChangeMessage: "",
        newRestaurant: "",
        newRestaurantDish: {},
        newRestaurantName: "",
      };
    case actions.SET_ORDER_MODE:
      return {
        ...state,
        orderMode: action.payload.orderMode,
      };
    case actions.CUSTOMER_PLACE_ORDER_SUCCESS:
      return {
        ...state,
        customerPlaceOrderError: "",
      };
    case actions.CUSTOMER_PLACE_ORDER_FAILURE:
      return {
        ...state,
        customerPlaceOrderError: action.payload.customerPlaceOrderError,
      };
    case actions.RESET_ORDER_DETAILS_AFTER_PLACING:
      return {
        ...state,
        orderDetails: [],
        restaurant: "",
        restaurantName: "",
        cartItemsCount: 0,
      };
    case actions.GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        ...state,
        customerOrders: action.payload.customerOrders,
        getCustomerOrdersError: "",
      };
    case actions.GET_CUSTOMER_ORDERS_FAILURE:
      return {
        ...state,
        customerOrders: [],
        getCustomerOrdersError: action.payload.getCustomerOrdersError,
      };
    case actions.GET_RESTAURANT_ORDERS_SUCCESS:
      return {
        ...state,
        restaurantOrders: action.payload.restaurantOrders,
        getRestaurantOrdersError: "",
      };
    case actions.GET_RESTAURANT_ORDERS_FAILURE:
      return {
        ...state,
        restaurantOrders: [],
        getRestaurantOrdersError: action.payload.getRestaurantOrdersError,
      };
    case actions.RESTAURANT_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        restaurantUpdateOrderError: "",
      };
    case actions.RESTAURANT_UPDATE_ORDER_FAILURE:
      return {
        ...state,
        restaurantUpdateOrderError: action.payload.restaurantUpdateOrderError,
      };
    case actions.SET_UPDATED_ORDER_DETAILS:
      return {
        ...state,
        restaurantUpdateOrderError: "",
        restaurantOrders: action.payload.restaurantOrders,
      };
    case actions.SET_ORDER_LOCATION:
      return {
        ...state,
        orderLocation: action.payload.orderLocation,
      };
    default:
      return state;
  }
};

export default reducer;
