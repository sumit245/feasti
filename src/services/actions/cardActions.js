import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { ADD_CARD_URL } from "../EndPoints";

export const addCard = (cardToAdd) => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { _id } = JSON.parse(user)
    const response = await axios.put(`${ADD_CARD_URL}${_id}`, { card: cardToAdd })
    const { data, msg } = response.data
    await AsyncStorageLib.setItem('user', JSON.stringify(data))
    return msg
}