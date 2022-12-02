import {
    SEND_OTP, SET_ERROR_MSG, SAVE_USER, GET_LOCAL_USER, CHECK_LOCAL_USER, SET_FAVORITE_MSG, SAVE_CARDS, SET_PHONE_NUMBER
} from "../actions/actions";

const initialState = {
    phone: "",
    verificationId: "",
    codeSent: false,
    user: {},
    isLoggedIn: false,
    message: "",
    cards: [],
    addresses: []
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_PHONE_NUMBER:
            return { ...state, phone: action.payload }
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
        case SET_FAVORITE_MSG:
            return { ...state, message: action.payload }
        case SAVE_CARDS:
            return { ...state, cards: action.payload }
        default:
            return state;
    }
}
