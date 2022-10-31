import { GET_ALL_RESTAURANT, GET_CUISINES } from "../actions/retaurantsAction";

const initialState = {}
export default function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESTAURANT:
            return { ...state, nearByRestaurant: action.payload };
        case GET_CUISINES:
            return { ...state, cuisines: action.payload }
        default:
            return state;
    }
}