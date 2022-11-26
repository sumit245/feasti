import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { USER_URL } from "../EndPoints";
import firebase from "../../firebase";
import { Alert } from "react-native";

export const SEND_OTP = "SEND_OTP"
export const SET_ERROR_MSG = "SET_ERROR_MSG"
export const SIGN_IN = "SIGN_IN"
export const SAVE_USER = "SAVE_USER"
export const LOGIN_WITH_PIN = "LOGIN_WITH_PIN"
export const GET_LOCAL_USER = "GET_LOCAL_USER"
export const GET_LOCAL_PIN = "GET_LOCAL_PIN"
export const CHECK_LOCAL_USER = "CHECK_LOCAL_USER"

export const getLocalUser = () => async (dispatch) => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if (isLoggedIn !== null) {
        dispatch({ type: GET_LOCAL_USER, payload: isLoggedIn })
    } else {
        dispatch({ type: CHECK_LOCAL_USER, payload: isLoggedIn })
    }
    return isLoggedIn
}

export const getLocalPin = () => async (dispatch) => {
    const pin = await AsyncStorage.getItem('pin')
    if (pin !== null) {
        dispatch({ type: GET_LOCAL_PIN, payload: pin })
    }
    return pin
}

export const loginWithPin = (enteredPin) => async (dispatch) => {
    let isLoggedIn = false
    const user = await AsyncStorage.getItem('user')
    if (user !== null) {
        isLoggedIn = true
        dispatch({ type: SAVE_USER, payload: user })
        await AsyncStorage.setItem('pin', JSON.stringify({ pin: enteredPin }))
        // const pin = await AsyncStorage.getItem('pin')
        // if (pin === enteredPin) {
        // }
    } else {
        isLoggedIn = false
    }
    return isLoggedIn
}

export const sendOTP = (phone, verifier) => async (dispatch) => {
    try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider()
        const verificationId = await phoneProvider.verifyPhoneNumber(phone, verifier)
        dispatch({ type: SEND_OTP, payload: verificationId })
    } catch (error) {
        dispatch({ type: SET_ERROR_MSG, payload: error.message })
    }
}

export const signIn = (verificationId, verificationCode) => async (dispatch) => {
    let statusCode = ""
    try {
        const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode)
        const response = await firebase.auth().signInWithCredential(credential);
        const { user } = response
        let phone = user.phoneNumber
        const resp = await axios.post(USER_URL, { phone: phone })
        let { status } = resp.data
        let { data } = resp.data
        statusCode = status
        dispatch({ type: SAVE_USER, payload: data })
        await AsyncStorage.setItem('user', JSON.stringify(data))
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true }))
    } catch (error) {
        dispatch({ type: SET_ERROR_MSG, payload: error.message })
    }
    return statusCode
}

export const addToFavorite = (id, restaurant) => async (dispatch) => {
    const response = await axios.put(`${FAVORITE_URL}${id}`, {
        favorite: restaurant
    })
    const { data, msg } = response.data
    await AsyncStorage.setItem('user', JSON.stringify(data))
    dispatch({ type: SET_FAVORITE_MSG, payload: msg })
}

export const updateUser = (id, dataToSend) => async (dispatch) => {
    const response = await axios.put(USER_URL + id, { ...dataToSend })
    const { data } = response.data
    const { status } = response.data
    dispatch({ type: SAVE_USER, payload: data })
    await AsyncStorage.setItem('user', JSON.stringify(data))
    return status
}


