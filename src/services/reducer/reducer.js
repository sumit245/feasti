import {
    SEND_OTP, SET_ERROR_MSG, SAVE_USER, GET_LOCAL_USER, CHECK_LOCAL_USER
} from "../actions/actions";

const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEND_OTP:
            return { ...state, verificationId: action.payload, codeSent: true }
        case SET_ERROR_MSG:
            return { ...state, message: action.payload, codeSent: false }
        case SAVE_USER:
            return { ...state, user: action.payload }
        case GET_LOCAL_USER:
            return { ...state, isLoggedIn: action.payload }
        case CHECK_LOCAL_USER:
            return { ...state, isLoggedIn: action.payload }
        default:
            return state;
    }
}
