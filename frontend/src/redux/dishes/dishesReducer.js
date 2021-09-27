import * as actions from "./dishesActionTypes";

const initialState = {
  restaurantGetDishError: "",
  restaurantUpdateDishError: "",
  restaurantDeleteDishError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DISH_SUCCESS:
      return {
        ...state,
        restaurantGetDishError: "",
      };
    case actions.GET_DISH_FAILURE:
      return {
        ...state,
        restaurantGetDishError: action.payload.restaurantGetDishError,
      };
    case actions.UPDATE_DISH_SUCCESS:
      return {
        ...state,
        restaurantUpdateDishError: "",
      };
    case actions.UPDATE_DISH_FAILURE:
      return {
        ...state,
        restaurantUpdateDishError: action.payload.restaurantUpdateDishError,
      };
    case actions.DELETE_DISH_SUCCESS:
      return {
        ...state,
        restaurantDeleteDishError: "",
      };
    case actions.DELETE_DISH_FAILURE:
      return {
        ...state,
        restaurantDeleteDishError: action.payload.restaurantDeleteDishError,
      };
    default:
      return state;
  }
};

export default reducer;
