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
    SET_TOTAL_TAX,
    SET_RESTAURANT_ID,
    SET_RESTAURANT_NAME,
    SET_PLAN_NAME,
    SET_BASE_PRICE,
    SET_CATEGORY,
    SET_MEAL_TYPE,
    SET_RESATURANT_ADDRESS,
    SET_SERVICE_RATES,
    SAVE_COUPONS,
    SET_DISCOUNT
} from "../actions/checkoutAction";

const order = {
    currentAddress: {
        address_type: "",
        addressLine1: "",
        city: "",
        postal_code: ""
    },
    total: 0,
    serviceFee: 0,
    discount: 0
}
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
        case SET_SELECTED_ADDRESS:
            return ({ ...state, address: action.payload })
        case SET_SELECTED_CARD:
            return ({ ...state, card: action.payload })
        case SET_USER_ID:
            return ({ ...state, user_id: action.payload })
        case SET_START_DATE:
            return ({ ...state, start_date: action.payload })
        case SET_END_DATE:
            return ({ ...state, end_date: action.payload })
        case SET_RESTAURANT_ID:
            return ({ ...state, restaurant_id: action.payload })
        case SET_RESTAURANT_NAME:
            return ({ ...state, restaurant: action.payload })
        case SET_PLAN_NAME:
            return ({ ...state, plan_name: action.payload })
        case SET_BASE_PRICE:
            return ({ ...state, base_price: action.payload })
        case SET_CUSTOMER_PRICE:
            return ({ ...state, customer_price: action.payload })
        case SET_TIP_AMOUNT:
            return ({ ...state, tip: action.payload })
        case SET_DISCOUNT:
            return ({ ...state, discount: action.payload })
        case SET_TOTAL_SERVICE:
            return ({ ...state, service_fee: action.payload })
        case SET_DELIVERY_FEE:
            return ({ ...state, delivery_fee: action.payload })
        case SET_TOTAL_TAX:
            return ({ ...state, tax: action.payload })
        case SET_SELECTED_SLOT:
            return ({ ...state, time: action.payload })
        case SET_TOTAL:
            return ({ ...state, total: action.payload })
        case SET_NOTES:
            return ({ ...state, notes: action.payload })
        case SET_CATEGORY:
            return ({ ...state, category: action.payload })
        case SET_MEAL_TYPE:
            return ({ ...state, meal_type: action.payload })
        case SET_DELIVERY_PICKUP:
            return ({ ...state, isDelivery: action.payload })
        case SET_RESATURANT_ADDRESS:
            return ({ ...state, restaurant_address: action.payload })
        case SET_CURRENT_SLOT:
            return ({ ...state, currentSlots: action.payload })
        case SET_SERVICE_FEE:
            return ({ ...state, serviceFee: action.payload })
        case SET_SERVICE_RATES:
            return ({ ...state, service_rate: action.payload })
        case SAVE_COUPONS:
            return ({ ...state, allCoupons: action.payload })
        case SET_TAXES:
            return ({ ...state, taxes: action.payload })
        default:
            return state
    }
}