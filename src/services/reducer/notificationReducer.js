import { SET_NOTIFICATION_TOKEN, SET_NOTIFICATION_RESPONSE, SET_NOTIFICATION } from "../actions/notificationActions";
const notificationState = {}

export default function notificationReducer(state = notificationState, action) {
    switch (action.type) {
        case SET_NOTIFICATION_TOKEN:
            return ({ ...state, expoPushToken: action.payload })
        case SET_NOTIFICATION_RESPONSE:
            return ({ ...state, notificationResponse: action.payload })
        case SET_NOTIFICATION:
            return ({ ...state, notification: action.payload })
        default:
            return state;
    }
}