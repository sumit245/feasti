import * as Location from 'expo-location';
import axios from 'axios';
import { ADDRESS_URL } from '../EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_ADDRESS = "GET_ADDRESS"
export const GET_LOCATION_PERMISSION = "GET_LOCATION_PERMISSION"
export const SET_ADDRESS = "SET_ADDRESS"
export const ADD_ADDRESS = "ADD_ADDRESS"

export const checkLocationPermission = () => async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        dispatch({ type: GET_LOCATION_PERMISSION, payload: 'Permission to access location was denied' })
    }
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: SET_ADDRESS, payload: location.coords })
    return location.coords
}

export const setAdrressFromMap = (location) => async (dispatch) => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    let lng = location.longitude
    let lat = location.latitude
    const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=AIzaSyAaZRSId-Iuuzl8SGKrUkGlAVmBRQf9I3w&result_type=street_address`)
    const { results } = response.data
    const { address_components } = results[0]
    const addressLine1 = address_components[0].long_name + ", " + address_components[1].long_name + ", " + address_components[2].long_name
    const addressLine2 = address_components[3].long_name + ", " + address_components[4].long_name
    const city = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('administrative_area_level_2'))[0].long_name
    const states = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('administrative_area_level_1'))[0].long_name
    const country = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('country'))[0].long_name
    const postal_code = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('postal_code'))[0].long_name
    return { addressLine1, addressLine2, city, states, country, postal_code }
}

export const getReadableAddress = () => async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let lat = 28.0
    let lng = 73.0
    if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        location = location.coords
        lat = location.latitude
        lng = location.longitude

    }
    const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=AIzaSyAaZRSId-Iuuzl8SGKrUkGlAVmBRQf9I3w&result_type=street_address`)
    const { results } = response.data
    const { address_components, geometry } = results[0]
    const addressLine1 = address_components[0].long_name + ", " + address_components[1].long_name + ", " + address_components[2].long_name
    const addressLine2 = address_components[3].long_name + ", " + address_components[4].long_name
    const city = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('administrative_area_level_2'))[0].long_name
    const states = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('administrative_area_level_1'))[0].long_name
    const country = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('country'))[0].long_name
    const postal_code = Array.isArray(address_components) && address_components.filter(item => Array.isArray(item.types) && item.types.includes('postal_code'))[0].long_name
    let location = geometry
    return { addressLine1, addressLine2, city, states, country, postal_code, location }
}

export const addAddressToDatabase = (id, address) => async (dispatch) => {
    const response = await axios.put(ADDRESS_URL + id, { address })
    const { data } = response.data
    const { status } = response
    const { addresses } = data
    dispatch({ type: ADD_ADDRESS, payload: addresses[0] })
    await AsyncStorage.setItem('user', JSON.stringify(data))
    return status
}