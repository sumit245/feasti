import { GET_ALL_RESTAURANT, GET_CUISINES, SET_COUPONS, SET_REVIEWS, SET_REVIEW_COUNTS, SET_TEMP_RESTAURANT } from "../actions/retaurantsAction";

const initialState = {}
export default function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESTAURANT:
            return { ...state, nearByRestaurant: action.payload };
        case SET_COUPONS:
            return { ...state, coupons: action.payload }
        case SET_TEMP_RESTAURANT:
            return { ...state, tempRestaurant: action.payload }
        case GET_CUISINES:
            return { ...state, cuisines: action.payload }
        case SET_REVIEWS:
            return { ...state, reviewCounts: action.payload }
        case SET_REVIEW_COUNTS:
            return { ...state, reviews: action.payload }
        default:
            return state;
    }
}