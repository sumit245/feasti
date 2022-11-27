import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

export const addCard = (cardToAdd) => async (dispatch) => {
    const { user } = await AsyncStorageLib.getItem('user')
    const { _id } = JSON.parse(user)
    console.log('====================================');
    console.log(_id, cardToAdd);
    console.log('====================================');
}