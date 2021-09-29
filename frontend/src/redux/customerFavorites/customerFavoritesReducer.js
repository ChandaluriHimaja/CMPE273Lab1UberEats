import * as actions from "./customerfavoritesActionTypes";

const initialState = {
  customerLikesRestaurantError: "",
  customerFavouritesdata: [],
  customerLikesData: [],
  getCustomerLikesError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ON_LIKE_CLICK_SUCCESS:
      return {
        ...state,
        customerLikesRestaurantError: "",
      };
    case actions.ON_LIKE_CLICK_FAILURE:
      return {
        ...state,
        customerLikesRestaurantError:
          action.payload.customerLikesRestaurantError,
      };
    case actions.GET_CUSTOMER_LIKES_SUCCESS:
      return {
        ...state,
        customerLikesData: action.payload.customerLikesData,
        getCustomerLikesError: "",
      };
    case actions.GET_CUSTOMER_LIKES_FAILURE:
      return {
        ...state,
        customerLikesData: [],
        getCustomerLikesError: action.payload.getCustomerLikesError,
      };
    default:
      return state;
  }
};

export default reducer;
