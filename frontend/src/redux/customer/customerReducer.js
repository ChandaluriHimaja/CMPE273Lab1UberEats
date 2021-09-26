import * as actions from "./customerActionTypes";

const initialState = {
  signUpError: "",
  customerProfileUpdateError: "",
  customerGetProfileError: "",
  customerData: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CUSTOMER_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpError: "",
      };
    case actions.CUSTOMER_SIGNUP_FAILURE:
      return {
        ...state,
        signUpError: action.payload.signUpError,
      };
    case actions.CUSTOMER_UPDATE_SUCCESS:
      return {
        ...state,
        customerProfileUpdateError: "",
      };
    case actions.CUSTOMER_UPDATE_FAILURE:
      return {
        ...state,
        customerProfileUpdateError: action.payload.customerProfileUpdateError,
      };
    case actions.CUSTOMER_GET_DATA_SUCCESS:
      return {
        ...state,
        customerGetProfileError: "",
        customerData: action.payload.customerData,
      };
    case actions.CUSTOMER_GET_DATA_FAILURE:
      return {
        ...state,
        customerGetProfileError: action.payload.customerGetProfileError,
        customerData: "",
      };
    default:
      return state;
  }
};

export default reducer;
