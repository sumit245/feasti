import axios from "axios"
import { ORDER_URL, SUBSCRIPTION_URL } from "../EndPoints"
import AsyncStorageLib from "@react-native-async-storage/async-storage"

export const MY_ORDERS = "MY_ORDERS"
export const MY_SUBSCRIPTION = "MY_SUBSCRIPTION"

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