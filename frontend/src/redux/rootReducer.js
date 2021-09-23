import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import customerReducer from "./customer/customerReducer";
import restaurantReducer from "./restaurant/restaurantReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  restaurant: restaurantReducer,
});

export default rootReducer;
