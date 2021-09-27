import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import customerReducer from "./customer/customerReducer";
import restaurantReducer from "./restaurant/restaurantReducer";
import allRestaurantReducer from "./allRestaurants/allRestaurantsReducer";
import dishesReducer from "./dishes/dishesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  restaurant: restaurantReducer,
  allRestaurant: allRestaurantReducer,
  dishes: dishesReducer,
});

export default rootReducer;
