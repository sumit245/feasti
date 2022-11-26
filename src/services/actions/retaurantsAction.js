import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import {
    ACTIVE_RESTAURANT_URL,
    CUISINE_URL,
    GET_PICKUP_RESTAURANT,
    GET_FAVORITE_RESTAURANT,
    MEALS_URL,
    RESTAURANT_URL
} from "../EndPoints"
import { getDistance } from "geolib"

export const GET_ALL_RESTAURANT = "GET_ALL_RESTAURANT"
export const SET_TEMP_RESTAURANT = "SET_TEMP_RESTAURANT"
export const GET_CUISINES = "GET_CUISINES"


export const getNearByRestaurant = (category) => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { addresses } = JSON.parse(user)
    const response = await axios.get(`${RESTAURANT_URL}${category}`)
    const restaurants = response.data

    let nearByRestaurant = []

    const addNearByRestaurant = (inputRestaurant) => {
        nearByRestaurant.push(inputRestaurant)
    }
    const calculateDistance = async (inputCity, inputRestaurant) => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=AIzaSyCGANEgs9_ADpjRcHkHerl4C6dBUnp2zKs`)
        const { results } = response.data
        const { geometry } = results[0]
        let restaurantLocation = geometry.location
        let distance = getDistance(
            addresses[0].geo,
            { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng }
        );
        distance = distance / 1000
        if (distance < 10) {
            let restaurant = inputRestaurant
            restaurant.distance = distance
            addNearByRestaurant(restaurant)
        }
    }

    restaurants.map((restaurant, key) => {
        const { city } = restaurant;
        calculateDistance(city, restaurant)
    })
    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}

export const getDeliveryRestaurants = (category, pickup) => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { addresses } = JSON.parse(user)
    const response = await axios.get(`${GET_PICKUP_RESTAURANT}${category}`)
    const restaurants = response.data

    let nearByRestaurant = []

    const addNearByRestaurant = (inputRestaurant) => {
        nearByRestaurant.push(inputRestaurant)
    }
    const calculateDistance = async (inputCity, inputRestaurant) => {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=AIzaSyCGANEgs9_ADpjRcHkHerl4C6dBUnp2zKs`)
        const { results } = response.data
        const { geometry } = results[0]
        let restaurantLocation = geometry.location
        let distance = getDistance(
            addresses[0].geo,
            { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng }
        );
        distance = distance / 1000
        if (distance < 10) {
            let restaurant = inputRestaurant
            restaurant.distance = distance
            addNearByRestaurant(restaurant)
        }
    }

    restaurants.map((restaurant, key) => {
        const { city } = restaurant;
        calculateDistance(city, restaurant)
    })
    setTimeout(() => {
        nearByRestaurant = nearByRestaurant.filter(restaurant => restaurant.isDelivery === pickup)
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}

export const getActiveRestaurants = () => async (dispatch) => {
    const response = await axios.get(ACTIVE_RESTAURANT_URL)
    const restaurant = response.data
    dispatch({ type: GET_ALL_RESTAURANT, payload: restaurant })
}

export const getCuisines = () => async (dispatch) => {
    const cuisineResponse = await axios.get(CUISINE_URL);
    const cuisine = await cuisineResponse.data;
    dispatch({ type: GET_CUISINES, payload: cuisine })
}

export const setTempRestaurant = (restaurant) => async (dispatch) => {
    dispatch({ type: SET_TEMP_RESTAURANT, payload: restaurant })
}

export const filterRestaurant = (restaurant, type, value) => async (dispatch) => {
    let filteredRestaurant = restaurant.filter((item) => item[type] === value)
    dispatch({ type: GET_ALL_RESTAURANT, payload: filteredRestaurant })
}

export const getRestaurantByID = (id, restaurant) => {
    let selectedRestaurant = restaurant.find((rest) => rest._id === id)
    return selectedRestaurant
}
export const getMealForRestaurant = async (id, type) => {
    const response = await axios.get(`${MEALS_URL}${id}/${type}`)
    const meals = response.data
    return meals
}
export const getFavoriteRestaurant = () => async (dispatch) => {
    const users = await getUser("user");
    const { _id } = users.data;
    const favoriteResponse = await axios.get(`${GET_FAVORITE_RESTAURANT}${_id}`);
    const favorites = favoriteResponse.data.data;
    console.log('====================================');
    console.log(favorites);
    console.log('====================================');
    // dispatch({ type: GET_ALL_RESTAURANT, payload: favorites })
}