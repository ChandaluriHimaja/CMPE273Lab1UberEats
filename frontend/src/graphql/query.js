import { gql } from "apollo-boost";

const getRestaurantDetailsById = gql`
  query ($id: ID) {
    getRestaurantDetailsById(id: $id) {
      _id
      email
      isRestaurant
      name
      picture
      phoneNumber
      about
      address
      openTime
      closeTime
      pickupMode
      deliveryMode
      dishes
    }
  }
`;

const getCustomerDetailsById = gql`
  query ($id: ID) {
    getCustomerDetailsById(id: $id) {
      _id
      email
      isRestaurant
      name
      nickname
      picture
      dateOfBirth
      phoneNumber
      about
      address
      favourites
    }
  }
`;

const getDishById = gql`
  query ($id: ID) {
    getDishById(id: $id) {
      _id
      name
      mainIngrediant
      image
      price
      description
      category
      type
    }
  }
`;

const getCustomerOrdersById = gql`
  query ($id: ID) {
    getCustomerOrdersById(id: $id) {
      _id
      _restaurantId
      _custId
      _deliveryAddressId
      dateTime
      totalPrice
      orderMode
      orderStatus
      orderNote
      orderItem
    }
  }
`;

const getRestaurantOrdersById = gql`
  query ($id: ID) {
    getRestaurantOrdersById(id: $id) {
      _id
      _restaurantId
      _custId
      _deliveryAddressId
      dateTime
      totalPrice
      orderMode
      orderStatus
      orderNote
      orderItem
    }
  }
`;

const getOrderDetailsById = gql`
  query ($id: ID) {
    getOrderDetailsById(id: $id) {
      _id
      _restaurantId
      _custId
      _deliveryAddressId
      dateTime
      totalPrice
      orderMode
      orderStatus
      orderNote
      orderItem
    }
  }
`;

const getAllRestaurants = gql`
  query {
    getAllRestaurants {
      _id
      email
      isRestaurant
      name
      picture
      phoneNumber
      about
      address
      openTime
      closeTime
      pickupMode
      deliveryMode
      dishes
    }
  }
`;

export {
  getRestaurantDetailsById,
  getCustomerDetailsById,
  getDishById,
  getCustomerOrdersById,
  getRestaurantOrdersById,
  getOrderDetailsById,
  getAllRestaurants,
};
