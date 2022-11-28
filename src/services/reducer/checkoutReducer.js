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
    SET_TAXES,
    SET_TOTAL,
    SET_SELECTED_CARD,
    SET_CUSTOMER_PRICE,
    SET_TOTAL_SERVICE,
    SET_DELIVERY_FEE,
    SET_TOTAL_TAX
} from "../actions/checkoutAction";

const order = {
    currentAddress: {
        address_type: "",
        addressLine1: "",
        city: "",
        postal_code: ""
    },
    total: 0,
    serviceFee: 0
}
export default function checkoutReducer(state = order, action) {
    switch (action.type) {
        case SET_USER:
            return ({ ...state, user_name: action.payload })
        case SET_PHONE:
            return ({ ...state, phone: action.payload })
        case SET_EMAIL_ID:
            return ({ ...state, email_id: action.payload })
        case SET_SELECTED_ADDRESS:
            return ({ ...state, currentAddress: action.payload })
        case SET_SELECTED_CARD:
            return ({ ...state, card: action.payload })
        case SET_USER_ID:
            return ({ ...state, user_id: action.payload })
        case SET_START_DATE:
            return ({ ...state, start_date: action.payload })
        case SET_END_DATE:
            return ({ ...state, end_date: action.payload })
        case SET_SELECTED_MEAL:
            return ({ ...state, selectedPlan: action.payload })
        case SET_CURRENT_SLOT:
            return ({ ...state, currentSlots: action.payload })
        case SET_SELECTED_SLOT:
            return ({ ...state, time: action.payload })
        case SET_CUSTOMER_PRICE:
            return ({ ...state, customer_price: action.payload })
        case SET_TIP_AMOUNT:
            return ({ ...state, tip: action.payload })
        case SET_TOTAL_SERVICE:
            return ({ ...state, service_fee: action.payload })
        case SET_DELIVERY_FEE:
            return ({ ...state, delivery_fee: action.payload })
        case SET_TOTAL_TAX:
            return ({ ...state, delivery_fee: action.payload })
        case SET_TOTAL:
            return ({ ...state, total: action.payload })
        case SET_NOTES:
            return ({ ...state, notes: action.payload })
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