import { ADD_ON_TOTAL, MY_ORDERS, MY_SUBSCRIPTION, PLACE_ADD_ONS, SET_ID, SET_ORDER_ID } from "../actions/orderActions";

const orders = []
export default function orderReducer(state = orders, action) {
    switch (action.type) {
        case MY_ORDERS:
            return ({ ...state, myOrders: action.payload })
        case MY_SUBSCRIPTION:
            return ({ ...state, subscription: action.payload })
        case PLACE_ADD_ONS:
            return ({ ...state, add_on: action.payload })
        case SET_ID:
            return ({ ...state, updateID: action.payload })
        case SET_ORDER_ID:
            return ({ ...state, orderID: action.payload })
        case ADD_ON_TOTAL:
            return ({ ...state, addOnTotal: action.payload })
        default:
            return state
    }
}