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

export const customerUpdateProfileSuccess = () => {
  return {
    type: actions.CUSTOMER_UPDATE_SUCCESS,
  };
};

export const customerUpdateProfileFailure = (customerProfileUpdateError) => {
  return {
    type: actions.CUSTOMER_UPDATE_FAILURE,
    payload: {
      customerProfileUpdateError,
    },
  };
};

export const customerGetProfileSuccess = (customerData) => {
  return {
    type: actions.CUSTOMER_GET_DATA_SUCCESS,
    payload: {
      customerData,
    },
  };
};

export const customerGetProfileFailure = (customerGetProfileError) => {
  return {
    type: actions.CUSTOMER_GET_DATA_FAILURE,
    payload: {
      customerGetProfileError,
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

export const customerUpdateProfile = (data) => {
  return async (dispatch) => {
    console.log("CUSTOMER UPDATE PROFILE ACTIONS");
    try {
      const response = await http.post(apiEndpoint + "/update", data);
      if (response && response.status === 200) {
        dispatch(customerUpdateProfileSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(customerUpdateProfileFailure(ex.response.data));
      }
    }
  };
};

export const getCustomerData = (id) => {
  console.log("IDDDD: ", id);
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + id);
      if (response && response.status === 200) {
        dispatch(customerGetProfileSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(customerGetProfileFailure(ex.response.data));
      }
    }
  };
};
