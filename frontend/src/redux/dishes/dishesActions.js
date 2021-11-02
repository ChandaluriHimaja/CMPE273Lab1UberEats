import * as actions from "./dishesActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/dish";

export const dishGetSuccess = () => {
  return {
    type: actions.GET_DISH_SUCCESS,
  };
};

export const dishGetFailure = (restaurantGetDishError) => {
  return {
    type: actions.GET_DISH_FAILURE,
    payload: {
      restaurantGetDishError,
    },
  };
};

export const dishUpdateSuccess = () => {
  return {
    type: actions.UPDATE_DISH_SUCCESS,
  };
};

export const dishUpdateFailure = (restaurantUpdateDishError) => {
  return {
    type: actions.UPDATE_DISH_FAILURE,
    payload: {
      restaurantUpdateDishError,
    },
  };
};

export const dishDeleteSuccess = () => {
  return {
    type: actions.DELETE_DISH_SUCCESS,
  };
};

export const dishDeleteFailure = (restaurantDeleteDishError) => {
  return {
    type: actions.DELETE_DISH_FAILURE,
    payload: {
      restaurantDeleteDishError,
    },
  };
};

export const getRestaurantDishData = (dishId) => {
  console.log("IN GETRESTAURANTDISTDATA: ", dishId);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + dishId);
      if (response && response.status === 200) {
        dispatch(dishGetSuccess());
        return response.data;
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(dishGetFailure(ex.response.data));
      }
    }
  };
};

export const updateRestaurantDishData = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.put(apiEndpoint, data);
      if (response && response.status === 200) {
        dispatch(dishUpdateSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(dishUpdateFailure(ex.response.data));
      }
    }
  };
};

export const deleteRestaurantDishData = (_id) => {
  // console.log("DELETE REQUEST: ", _id);
  return async (dispatch) => {
    try {
      console.log("DELETE REQUEST: ", _id);
      const response = await http.delete(apiEndpoint + "/" + _id);
      if (response && response.status === 200) {
        dispatch(dishDeleteSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(dishDeleteFailure(ex.response.data));
      }
    }
  };
};
