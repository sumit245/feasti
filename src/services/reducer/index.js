import { combineReducers } from "redux";
import reducer from "./reducer";
import notificationReducer from "./notificationReducer";
import addressReducer from "./addressReducer";
import restaurantReducer from "./restaurantReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";
export default combineReducers({
    reducer,
    notificationReducer,
    addressReducer,
    restaurantReducer,
    checkoutReducer,
    orderReducer
})