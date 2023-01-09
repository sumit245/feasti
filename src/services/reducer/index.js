import { combineReducers } from "redux";
import reducer from "./reducer";
import addressReducer from "./addressReducer";
import restaurantReducer from "./restaurantReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";
export default combineReducers({
    reducer,
    addressReducer,
    restaurantReducer,
    checkoutReducer,
    orderReducer
})