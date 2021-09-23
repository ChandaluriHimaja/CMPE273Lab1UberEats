import * as actions from "./customerActionTypes";

const initialState = {
  signUpError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CUSTOMER_SIGNUP_SUCCESS:
      return {
        signUpError: "",
      };
    case actions.CUSTOMER_SIGNUP_FAILURE:
      return {
        signUpError: action.payload.signUpError,
      };
    default:
      return state;
  }
};

export default reducer;
