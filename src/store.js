import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./services/reducer/index";
const initialState = {
    reducer: {},
    addressReducer: {},
    restaurantReducer: {},
    checkoutReducer: {},
    orderReducer: {}
};
const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));
export default store;
