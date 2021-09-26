import * as actions from "./allRestaurantsActionTypes";

const initialState = {
  allRestaurantData: [],
  allRestaurantDataError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_RESTAURANTS_DATA_SUCCESS:
      return {
        ...state,
        allRestaurantDataError: "",
        allRestaurantData: action.payload.allRestaurantData,
      };
    case actions.GET_ALL_RESTAURANTS_DATA_FAILURE:
      return {
        ...state,
        allRestaurantDataError: action.payload.allRestaurantDataError,
        allRestaurantData: [],
      };
    default:
      return state;
  }
};

export default reducer;
