import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import { CUISINE_URL, GET_PRICE_URL, MEALS_URL, RESTAURANT_URL } from "../EndPoints"
import { getDistance } from "geolib"

export const GET_ALL_RESTAURANT = "GET_ALL_RESTAURANT"
export const SET_TEMP_RESTAURANT = "SET_TEMP_RESTAURANT"
export const GET_CUISINES = "GET_CUISINES"


export const getNearByRestaurant = (category) => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { addresses } = JSON.parse(user)
    const response = await axios.get(RESTAURANT_URL.concat(category))
    const restaurants = response.data
    const resp = await axios.get(GET_PRICE_URL)
    const pricing = resp.data

    let nearByRestaurant = []

    const addNearByRestaurant = (inputRestaurant) => {
        nearByRestaurant.push(inputRestaurant)
    }
    const calculateDistance = (inputCity, inputRestaurant) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&key=AIzaSyCGANEgs9_ADpjRcHkHerl4C6dBUnp2zKs`)
            .then((response) => {
                const { results } = response.data
                const { geometry } = results[0]
                let restaurantLocation = geometry.location
                let distance = getDistance(
                    addresses[0].geo,
                    { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng },
                );
                distance = distance / 1000
                if (distance < 10) {
                    let restaurant = inputRestaurant
                    restaurant.distance = distance
                    addNearByRestaurant(restaurant)
                }

            })
            .catch((err) => { console.log(err) })
    }

    restaurants.map((restaurant, key) => {
        const { city } = restaurant;
        calculateDistance(city, restaurant)
    })
    setTimeout(() => {
        nearByRestaurant.forEach((restaurant) => {
            let prices = pricing.find((price, index) => {
                return price.restaurant_id === restaurant.restaurant_id
            })
            const { isDelivery, price_plans } = prices
            const { plans } = price_plans
            restaurant.isDelivery = isDelivery
            restaurant.price_plans = plans
        })
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)
}

export const getActiveRestaurants = (category) => async (dispatch) => {
    const response = await axios.get(RESTAURANT_URL.concat(category))
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