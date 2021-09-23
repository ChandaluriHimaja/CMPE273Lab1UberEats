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

export const restaurantUpdateProfileSuccess = () => {
  return {
    type: actions.RESTAURANT_UPDATE_SUCCESS,
  };
};

export const restaurantUpdateProfileFailure = (
  restaurantProfileUpdateError
) => {
  return {
    type: actions.RESTAURANT_UPDATE_FAILURE,
    payload: {
      restaurantProfileUpdateError,
    },
  };
};

export const restaurantGetProfileSuccess = () => {
  return {
    type: actions.RESTAURANT_GET_DATA_SUCCESS,
  };
};

export const restaurantGetProfileFailure = (restaurantGetProfileError) => {
  return {
    type: actions.RESTAURANT_GET_DATA_FAILURE,
    payload: {
      restaurantGetProfileError,
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

export const restaurantUpdateProfile = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint + "/update", data);
      if (response && response.status === 200) {
        dispatch(restaurantUpdateProfileSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantUpdateProfileFailure(ex.response.data));
      }
    }
  };
};

export const getRestaurantData = (id) => {
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + id);
      if (response && response.status === 200) {
        dispatch(restaurantGetProfileSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantGetProfileFailure(ex.response.data));
      }
    }
  };
};
