import { ADD_ADDRESS, GET_LOCATION_PERMISSION, SET_ADDRESS } from "../actions/addressactions";
const initialState = {}

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOCATION_PERMISSION:
            return ({ ...state, status: action.payload })
        case SET_ADDRESS:
            return ({ ...state, currentLocation: action.payload })
        case ADD_ADDRESS:
            return ({ ...state, currentAddress: action.payload })
        default:
            return initialState;
    }

}