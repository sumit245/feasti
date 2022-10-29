import { combineReducers } from "redux";
import reducer from "./reducer";
import notificationReducer from "./notificationReducer";
import addressReducer from "./addressReducer";
export default combineReducers({
    reducer,
    notificationReducer,
    addressReducer
})