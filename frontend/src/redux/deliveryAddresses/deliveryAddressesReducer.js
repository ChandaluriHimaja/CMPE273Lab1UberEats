import * as actions from "./deliveryAddressesActionTypes";

const initialState = {
  customerDeliveryAddressData: [],
  customerDeliveryAddressError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_CUSTOMER_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        customerDeliveryAddressError: "",
        customerDeliveryAddressData: action.payload.customerDeliveryAddressData,
      };
    case actions.GET_CUSTOMER_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        customerDeliveryAddressError:
          action.payload.customerDeliveryAddressError,
        customerDeliveryAddressData: [],
      };
    case actions.ADD_CUSTOMER_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        customerDeliveryAddressError:
          action.payload.customerDeliveryAddressError,
      };
    case actions.ADD_CUSTOMER_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        customerDeliveryAddressError: "",
      };
    default:
      return state;
  }
};

export default reducer;
