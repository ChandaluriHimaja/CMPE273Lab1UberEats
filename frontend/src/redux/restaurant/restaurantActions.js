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

export const restaurantGetProfileSuccess = (restaurantData) => {
  return {
    type: actions.RESTAURANT_GET_DATA_SUCCESS,
    payload: {
      restaurantData,
    },
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

export const restaurantGetDishesSuccess = (restaurantDishesData) => {
  return {
    type: actions.GET_RESTAURANT_DISHES_SUCCESS,
    payload: {
      restaurantDishesData,
    },
  };
};

export const restaurantGetDishesFailure = (restaurantGetDishesError) => {
  return {
    type: actions.GET_RESTAURANT_DISHES_FAILURE,
    payload: {
      restaurantGetDishesError,
    },
  };
};

export const restaurantAddDishSuccess = () => {
  return {
    type: actions.ADD_RESTAURANT_DISH_SUCCESS,
  };
};

export const restaurantAddDishFailure = (restaurantAddDishError) => {
  return {
    type: actions.ADD_RESTAURANT_DISH_FAILURE,
    payload: {
      restaurantAddDishError,
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
  console.log("IDDDD: ", id);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + id);
      if (response && response.status === 200) {
        dispatch(restaurantGetProfileSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantGetProfileFailure(ex.response.data));
      }
    }
  };
};

export const getRestaurantDishesData = (restaurantId) => {
  console.log("In getRestaurantDishesData(): ", restaurantId);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/dishes/" + restaurantId);
      if (response && response.status === 200) {
        dispatch(restaurantGetDishesSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantGetDishesFailure(ex.response.data));
      }
    }
  };
};

export const addRestaurantDishData = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint + "/dish", data);
      if (response && response.status === 200) {
        dispatch(restaurantAddDishSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(restaurantAddDishFailure(ex.response.data));
      }
    }
  };
};
