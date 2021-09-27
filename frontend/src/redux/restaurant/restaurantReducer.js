import * as actions from "./restaurantActionTypes";

const initialState = {
  signUpError: "",
  restaurantProfileUpdateError: "",
  restaurantGetProfileError: "",
  restaurantData: "",
  restaurantDishesData: [],
  restaurantGetDishesError: "",
  restaurantAddDishError: "",
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
    case actions.GET_RESTAURANT_DISHES_SUCCESS:
      return {
        ...state,
        restaurantDishesData: action.payload.restaurantDishesData,
        restaurantGetDishesError: "",
      };
    case actions.GET_RESTAURANT_DISHES_FAILURE:
      return {
        ...state,
        restaurantDishesData: [],
        restaurantGetDishesError: action.payload.restaurantGetDishesError,
      };
    case actions.ADD_RESTAURANT_DISH_SUCCESS:
      return {
        ...state,
        restaurantAddDishError: "",
      };
    case actions.ADD_RESTAURANT_DISH_FAILURE:
      return {
        ...state,
        restaurantAddDishError: action.payload.restaurantAddDishError,
      };
    default:
      return state;
  }
};

export default reducer;
