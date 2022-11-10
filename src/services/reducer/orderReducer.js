import { MY_ORDERS, MY_SUBSCRIPTION } from "../actions/orderActions";

const orders = []
export default function orderReducer(state = orders, action) {
    switch (action.type) {
        case MY_ORDERS:
            return ({ ...state, myOrders: action.payload })
        case MY_SUBSCRIPTION:
            return ({ ...state, subscription: action.payload })
        default:
            return state
    }
}