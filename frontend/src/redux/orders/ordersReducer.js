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
    default:
      return state;
  }
};

export default reducer;
