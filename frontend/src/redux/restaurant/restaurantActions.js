import * as actions from "./restaurantActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/restaurant";

export const restaurantSignUpSuccess = () => {
  return {
    type: actions.RESTAURANT_SIGNUP_SUCCESS,
  };
};

export const restaurantSignUpFailure = (signUpError) => {
  return {
    type: actions.RESTAURANT_SIGNUP_FAILURE,
    payload: {
      signUpError,
    },
  };
};

export const restaurantSignUp = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint, data);
      if (response && response.status === 200) {
        dispatch(restaurantSignUpSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantSignUpFailure(ex.response.data));
      }
    }
  };
};
