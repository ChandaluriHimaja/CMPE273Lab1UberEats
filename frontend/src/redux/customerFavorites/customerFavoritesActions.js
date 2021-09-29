import * as actions from "./customerfavoritesActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/like";

export const customerLikesRestaurantSuccess = () => {
  return {
    type: actions.ON_LIKE_CLICK_SUCCESS,
  };
};

export const customerLikesRestaurantFailure = (
  customerLikesRestaurantError
) => {
  return {
    type: actions.ON_LIKE_CLICK_FAILURE,
    payload: {
      customerLikesRestaurantError,
    },
  };
};

export const getCustomerLikesSuccess = (customerLikesData) => {
  return {
    type: actions.GET_CUSTOMER_LIKES_SUCCESS,
    payload: {
      customerLikesData,
    },
  };
};

export const getCustomerLikesFailure = (getCustomerLikesError) => {
  return {
    type: actions.GET_CUSTOMER_LIKES_FAILURE,
    payload: {
      getCustomerLikesError,
    },
  };
};

export const customerLikesRestaurant = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint, data);
      if (response && response.status === 200) {
        dispatch(customerLikesRestaurantSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(customerLikesRestaurantFailure(ex.response.data));
      }
    }
  };
};

export const getCustomerLikesData = (id) => {
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + id);
      if (response && response.status === 200) {
        dispatch(getCustomerLikesSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(getCustomerLikesFailure(ex.response.data));
      }
    }
  };
};
