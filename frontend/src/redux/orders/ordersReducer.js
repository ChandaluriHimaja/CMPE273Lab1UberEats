import * as actions from "./ordersActionTypes";

const initialState = {
  orderDetails: [],
  restaurants: [],
  cartItemsCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_REMOVE_DISHES_FROM_CART:
      return {
        ...state,
        orderDetails: action.payload.orderDetails,
      };
    case actions.UPDATE_LIST_OF_RESTAURANTS_ORDERING_FROM:
      return {
        ...state,
        restaurants: action.payload.restaurants,
      };
    case actions.UPDATE_NUMBER_OF_ITEMS_IN_CART:
      return {
        ...state,
        cartItemsCount: action.payload.cartItemsCount,
      };
    default:
      return state;
  }
};

export default reducer;
