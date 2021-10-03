import * as actions from "./deliveryAddressesActionTypes";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/deliveryAddresses";

export const getCustomerDeliveryAddressSuccess = (
  customerDeliveryAddressData
) => {
  return {
    type: actions.GET_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
    payload: {
      customerDeliveryAddressData,
    },
  };
};

export const getCustomerDeliveryAddressFailure = (
  customerDeliveryAddressError
) => {
  return {
    type: actions.GET_CUSTOMER_DELIVERY_ADDRESS_FAILURE,
    payload: {
      customerDeliveryAddressError,
    },
  };
};

export const addCustomerDeliveryAddressSuccess = () => {
  return {
    type: actions.ADD_CUSTOMER_DELIVERY_ADDRESS_SUCCESS,
  };
};

export const addCustomerDeliveryAddressFailure = (
  customerDeliveryAddressError
) => {
  return {
    type: actions.ADD_CUSTOMER_DELIVERY_ADDRESS_FAILURE,
    payload: {
      customerDeliveryAddressError,
    },
  };
};

export const getCustomerDeliveryAddress = (id) => {
  return async (dispatch) => {
    try {
      const response = await http.get(apiEndpoint + "/" + id);
      if (response && response.status === 200) {
        console.log("DELIVERY ADDRESS: ", response.data);
        dispatch(getCustomerDeliveryAddressSuccess(response.data));
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(getCustomerDeliveryAddressFailure(ex.response.data));
      }
    }
  };
};

export const addCustomerDeliveryAddress = (data) => {
  return async (dispatch) => {
    try {
      const response = await http.post(apiEndpoint, data);
      if (response && response.status === 200) {
        dispatch(addCustomerDeliveryAddressSuccess());
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log("RESPONSE: ", ex.response);
        dispatch(addCustomerDeliveryAddressFailure(ex.response.data));
      }
    }
  };
};
