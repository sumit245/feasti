import axios from "axios"
import { ORDER_UPDATE, ORDER_URL, SUBSCRIPTION_URL } from "../EndPoints"
import AsyncStorageLib from "@react-native-async-storage/async-storage"

export const MY_ORDERS = "MY_ORDERS"
export const MY_SUBSCRIPTION = "MY_SUBSCRIPTION"
export const PLACE_ADD_ONS = "PLACE_ADD_ONS"
export const SET_ORDER_ID = "SET_ORDER_ID"
export const SET_ID = "SET_ID"
export const ADD_ON_TOTAL = "ADD_ON_TOTAL"
export const getMyOrders = () => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { user_id } = JSON.parse(user)
    const response = await axios.get(ORDER_URL.concat(user_id))
    const { myOrders } = response.data
    dispatch({ type: MY_ORDERS, payload: myOrders })
}

export const getMySubscription = () => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { user_id } = JSON.parse(user)
    const response = await axios.get(SUBSCRIPTION_URL.concat(user_id))
    const { mySubscription } = response.data
    dispatch({ type: MY_SUBSCRIPTION, payload: mySubscription })
}

export const setAddOns = (add_on, order_id, id, add_on_total) => async (dispatch) => {
    dispatch({ type: PLACE_ADD_ONS, payload: add_on })
    dispatch({ type: SET_ORDER_ID, payload: order_id })
    dispatch({ type: SET_ID, payload: id })
    dispatch({ type: ADD_ON_TOTAL, payload: add_on_total })
    // const response = await axios.put(`${ORDER_UPDATE}${id}`, { add_on })
    // const { data, status, message } = response.data
    // console.log('====================================');
    // console.log(status);
    // console.log('====================================');
}