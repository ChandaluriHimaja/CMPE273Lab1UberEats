import * as actions from "./restaurantActionTypes";

const initialState = {
  signUpError: "",
  restaurantProfileUpdateError: "",
  restaurantGetProfileError: "",
  restaurantData: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTAURANT_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpError: "",
      };
    case actions.RESTAURANT_SIGNUP_FAILURE:
      return {
        ...state,
        signUpError: action.payload.signUpError,
      };
    case actions.RESTAURANT_UPDATE_SUCCESS:
      return {
        ...state,
        restaurantProfileUpdateError: "",
      };
    case actions.RESTAURANT_UPDATE_FAILURE:
      return {
        ...state,
        restaurantProfileUpdateError:
          action.payload.restaurantProfileUpdateError,
      };
    case actions.RESTAURANT_GET_DATA_SUCCESS:
      return {
        ...state,
        restaurantGetProfileError: "",
        restaurantData: action.payload.restaurantData,
      };
    case actions.RESTAURANT_GET_DATA_FAILURE:
      return {
        ...state,
        restaurantGetProfileError: action.payload.restaurantGetProfileError,
        restaurantData: "",
      };
    default:
      return state;
  }
};

export default reducer;
