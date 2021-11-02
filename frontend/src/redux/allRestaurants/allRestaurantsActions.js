import * as actions from "./allRestaurantsActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/restaurant";

export const getAllRestaurantsSuccess = (allRestaurantData) => {
  return {
    type: actions.GET_ALL_RESTAURANTS_DATA_SUCCESS,
    payload: {
      allRestaurantData,
    },
  };
};

export const getAllRestaurantsFailure = (allRestaurantDataError) => {
  return {
    type: actions.GET_ALL_RESTAURANTS_DATA_FAILURE,
    payload: {
      allRestaurantDataError,
    },
  };
};

export const getAllRestaurantsData = () => {
  console.log("getAllRestaurant call: ", apiEndpoint + "/allRestaurants");
  return async (dispatch) => {
    try {
      console.log("ENDPOINT: ", apiEndpoint + "/allRestaurants");
      const response = await http.get(apiEndpoint + "/allRestaurants");
      if (response && response.status === 200) {
        dispatch(getAllRestaurantsSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(getAllRestaurantsFailure(ex.response.data));
      }
    }
  };
};
