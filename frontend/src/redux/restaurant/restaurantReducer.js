import * as actions from "./restaurantActionTypes";

const initialState = {
  signUpError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTAURANT_SIGNUP_SUCCESS:
      return {
        signUpError: "",
      };
    case actions.RESTAURANT_SIGNUP_FAILURE:
      return {
        signUpError: action.payload.signUpError,
      };
    default:
      return state;
  }
};

export default reducer;
