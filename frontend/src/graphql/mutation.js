import { gql } from "apollo-boost";

const login = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const signUpCustomer = gql`
  mutation ($customerData: customerInputType) {
    signUpCustomer(customerData: $customerData) {
      message
    }
  }
`;

const signUpRestaurant = gql`
  mutation ($restaurantData: restaurantInputType) {
    signUpRestaurant(restaurantData: $restaurantData) {
      message
    }
  }
`;

const updateCustomerProfile = gql`
  mutation ($customerdata: updateCustomerProfileInputType) {
    updateCustomerProfile(customerdata: $customerdata) {
      message
    }
  }
`;

const updateRestaurantProfile = gql`
  mutation ($restaurantData: updateRestaurantProfileInputType) {
    updateRestaurantProfile(restaurantData: $restaurantData) {
      message
    }
  }
`;

const restaurantUpdateOrderStatus = gql`
  mutation ($id: ID, $orderStatus: String) {
    restaurantUpdateOrderStatus(id: $id, orderStatus: $orderStatus) {
      message
    }
  }
`;

const addNewDeliveryAddressForCustomer = gql`
  mutation ($deliveryAddress: deliveryAddressInputType) {
    addNewDeliveryAddressForCustomer(deliveryAddress: $deliveryAddress) {
      message
    }
  }
`;
const addDishToRestaurant = gql`
  mutation ($dishData: dishIputType) {
    addDishToRestaurant(dishData: $dishData) {
      message
    }
  }
`;

const updateDishById = gql`
  mutation ($dishData: dishIputType) {
    updateDishById(dishData: $dishData) {
      message
    }
  }
`;
const placeOrder = gql`
  mutation ($orderDetails: orderInputType) {
    placeOrder(orderDetails: $orderDetails) {
      message
    }
  }
`;

export {
  login,
  signUpCustomer,
  signUpRestaurant,
  updateCustomerProfile,
  restaurantUpdateOrderStatus,
  updateRestaurantProfile,
  addNewDeliveryAddressForCustomer,
  addDishToRestaurant,
  updateDishById,
  placeOrder,
};
