import {
    SET_SELECTED_MEAL,
    SET_USER,
    SET_PHONE,
    SET_EMAIL_ID,
    SET_USER_ID,
    SET_START_DATE,
    SET_END_DATE,
    SET_CURRENT_SLOT,
    SET_SELECTED_SLOT,
    SET_SELECTED_ADDRESS,
    SET_NOTES,
    SET_TIP_AMOUNT,
    SET_DELIVERY_PICKUP,
    SET_SERVICE_FEE,
    SET_TAXES
} from "../actions/checkoutAction";

const order = {}
export default function checkoutReducer(state = order, action) {
    switch (action.type) {
        case SET_SELECTED_MEAL:
            return ({ ...state, selectedPlan: action.payload })
        case SET_USER:
            return ({ ...state, user_name: action.payload })
        case SET_PHONE:
            return ({ ...state, phone: action.payload })
        case SET_EMAIL_ID:
            return ({ ...state, email_id: action.payload })
        case SET_USER_ID:
            return ({ ...state, user_id: action.payload })
        case SET_START_DATE:
            return ({ ...state, start_date: action.payload })
        case SET_END_DATE:
            return ({ ...state, end_date: action.payload })
        case SET_CURRENT_SLOT:
            return ({ ...state, currentSlots: action.payload })
        case SET_SELECTED_SLOT:
            return ({ ...state, time: action.payload })
        case SET_SELECTED_ADDRESS:
            return ({ ...state, currentAddress: action.payload })
        case SET_NOTES:
            return ({ ...state, notes: action.payload })
        case SET_TIP_AMOUNT:
            return ({ ...state, tip: action.payload })
        case SET_DELIVERY_PICKUP:
            return ({ ...state, isDelivery: action.payload })
        case SET_SERVICE_FEE:
            return ({ ...state, serviceFee: action.payload })
        case SET_TAXES:
            return ({ ...state, taxes: action.payload })
        default:
            return state
    }
}