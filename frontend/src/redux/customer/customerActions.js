import * as actions from "./customerActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/customer";

export const customerSignUpSuccess = () => {
  return {
    type: actions.CUSTOMER_SIGNUP_SUCCESS,
  };
};

export const customerSignUpFailure = (signUpError) => {
  return {
    type: actions.CUSTOMER_SIGNUP_FAILURE,
    payload: {
      signUpError,
    },
  };
};

export const customerSignUp = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint, data);
      if (response && response.status === 200) {
        dispatch(customerSignUpSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(customerSignUpFailure(ex.response.data));
      }
    }
  };
};
