import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./services/reducer/index";
const initialState = {
    reducer: {},
    notificationReducer: {}
};
const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));
export default store;
