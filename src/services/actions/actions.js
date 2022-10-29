import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { USER_URL } from "../EndPoints";
import firebase from "../../firebase";

export const SEND_OTP = "SEND_OTP"
export const SET_ERROR_MSG = "SET_ERROR_MSG"
export const SIGN_IN = "SIGN_IN"
export const SAVE_USER = "SAVE_USER"
export const LOGIN_WITH_PIN = "LOGIN_WITH_PIN"
export const GET_LOCAL_USER = "GET_LOCAL_USER"


export const getLocalUser = () => async (dispatch) => {
    const user = await AsyncStorage.getItem('isLoggedIn')
    dispatch({ type: GET_LOCAL_USER, payload: user })
    return user
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
        dispatch({ type: SIGN_IN, payload: data })
    } catch (error) {
        dispatch({ type: SET_ERROR_MSG, payload: error.message })
    }
    return statusCode
}

export const updateUser = (id, dataToSend) => async (dispatch) => {
    const response = await axios.put(USER_URL + id, { ...dataToSend })
    const { data } = response.data
    const { status } = response.data
    dispatch({ type: SAVE_USER, payload: data })
    return status
}


