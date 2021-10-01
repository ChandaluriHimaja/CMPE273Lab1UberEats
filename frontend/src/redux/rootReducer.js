import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import customerReducer from "./customer/customerReducer";
import restaurantReducer from "./restaurant/restaurantReducer";
import allRestaurantReducer from "./allRestaurants/allRestaurantsReducer";
import dishesReducer from "./dishes/dishesReducer";
import favoritesReducer from "./customerFavorites/customerFavoritesReducer";
import deliveryAddressesReducer from "./deliveryAddresses/deliveryAddressesReducer";
import ordersReducer from "./orders/ordersReducer";

const appReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  restaurant: restaurantReducer,
  allRestaurant: allRestaurantReducer,
  dishes: dishesReducer,
  favorites: favoritesReducer,
  deliveryAddresses: deliveryAddressesReducer,
  orders: ordersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
