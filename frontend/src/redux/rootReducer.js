import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import customerReducer from "./customer/customerReducer";
import restaurantReducer from "./restaurant/restaurantReducer";
import allRestaurantReducer from "./allRestaurants/allRestaurantsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  restaurant: restaurantReducer,
  allRestaurant: allRestaurantReducer,
});

export default rootReducer;
