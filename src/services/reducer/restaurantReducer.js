import { GET_ALL_RESTAURANT, GET_CUISINES, SET_TEMP_RESTAURANT } from "../actions/retaurantsAction";

const initialState = {}
export default function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESTAURANT:
            return { ...state, nearByRestaurant: action.payload };
        case SET_TEMP_RESTAURANT:
            return { ...state, tempRestaurant: action.payload }
        case GET_CUISINES:
            return { ...state, cuisines: action.payload }
        default:
            return state;
    }
}