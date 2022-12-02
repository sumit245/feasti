import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import {
    ACTIVE_RESTAURANT_URL,
    CUISINE_URL,
    GET_PICKUP_RESTAURANT,
    GET_FAVORITE_RESTAURANT,
    MEALS_URL,
    RESTAURANT_URL,
    SEARCH_BY_CITY,
    CUISINE_TYPE_URL,
    COUPON_URL,
    ADMIN_COUPON_URL
} from "../EndPoints"
import { getDistance } from "geolib"

export const GET_ALL_RESTAURANT = "GET_ALL_RESTAURANT"
export const SET_TEMP_RESTAURANT = "SET_TEMP_RESTAURANT"
export const GET_CUISINES = "GET_CUISINES"

const calculateDistanceGlobal = async (inputCity) => {
    const user = await AsyncStorageLib.getItem('user')
    const { addresses } = JSON.parse(user)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=AIzaSyCGANEgs9_ADpjRcHkHerl4C6dBUnp2zKs`)
    const { results } = response.data
    const { geometry } = results[0]
    let restaurantLocation = geometry.location
    let distance = getDistance(
        addresses[0].geo,
        { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng }
    );
    distance = distance / 1000
    return distance
}
// Calculate Distance

export const getNearByRestaurant = (category) => async (dispatch) => {
    const response = await axios.get(`${RESTAURANT_URL}${category}`)
    const restaurants = response.data

    let nearByRestaurant = []

    restaurants.map(async (restaurant, key) => {
        const { city } = restaurant;
        const distance = await calculateDistanceGlobal(city)
        if (distance < 10) {
            restaurant.distance = distance
            nearByRestaurant.push(restaurant)
        }
    })
    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}
// NearBy Restaurant

export const getDeliveryRestaurants = (category, pickup) => async (dispatch) => {
    const response = await axios.get(`${GET_PICKUP_RESTAURANT}${category}`)
    const restaurants = response.data

    let nearByRestaurant = []

    restaurants.map(async (restaurant, key) => {
        const { city } = restaurant;
        const distance = await calculateDistanceGlobal(city)
        if (distance < 10) {
            restaurant.distance = distance
            nearByRestaurant.push(restaurant)
        }
    })
    setTimeout(() => {
        nearByRestaurant = nearByRestaurant.filter(restaurant => restaurant.isDelivery === pickup)
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}
// Filter Restaurant according to delivery or pickup
export const searchRestaurantByCity = (city) => async (dispatch) => {
    const response = await axios.get(`${SEARCH_BY_CITY}${city}`)
    const restaurant = response.data
    let restaurants = []
    restaurant.map(async (item, key) => {
        const { city } = item
        const distance = await calculateDistanceGlobal(city)
        item.distance = distance
        restaurants.push(item)
    })
    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: restaurants })
    }, 1000)
}
// Search restaurant by city

export const getFavoriteRestaurant = (id) => async (dispatch) => {
    const response = await axios.get(`${GET_FAVORITE_RESTAURANT}${id}`);
    const restaurants = response.data;
    let nearByRestaurant = []

    restaurants.map(async (restaurant, key) => {
        const { city } = restaurant;
        const distance = await calculateDistanceGlobal(city)
        restaurant.distance = distance
        nearByRestaurant.push(restaurant)
    })

    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}
// Get all favorite restaurants

export const getRestaurantByCuisine = (cuisine) => async (dispatch) => {
    const response = await axios.get(`${CUISINE_TYPE_URL}${cuisine}`);
    const restaurants = response.data;
    let nearByRestaurant = []

    restaurants.map(async (restaurant, key) => {
        const { city } = restaurant;
        const distance = await calculateDistanceGlobal(city)
        if (distance < 200) {
            restaurant.distance = distance
            nearByRestaurant.push(restaurant)
        }
    })

    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}
// Get all restaurant by cuisine


export const getActiveRestaurants = () => async (dispatch) => {
    const response = await axios.get(ACTIVE_RESTAURANT_URL)
    const restaurants = response.data
    let nearByRestaurant = []

    restaurants.map(async (restaurant, key) => {
        const { city } = restaurant;
        const distance = await calculateDistanceGlobal(city)
        if (distance < 200) {
            restaurant.distance = distance
            nearByRestaurant.push(restaurant)
        }
    })

    setTimeout(() => {
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
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

export const getAdminCoupon = async () => {
    const response = await axios.get(ADMIN_COUPON_URL)
    const { coupons } = await response.data
    const shuffle = (arr) => arr.map((a) => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map((a) => a.value);
    return shuffle(coupons)
}