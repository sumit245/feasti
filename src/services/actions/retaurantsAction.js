import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import { CUISINE_URL, RESTAURANT_URL } from "../EndPoints"
import { getDistance } from "geolib"

export const GET_ALL_RESTAURANT = "GET_ALL_RESTAURANT"
export const GET_CUISINES = "GET_CUISINES"

export const getNearByRestaurant = () => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { addresses } = JSON.parse(user)
    const response = await axios.get(RESTAURANT_URL)
    const restaurants = response.data
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
        dispatch({ type: GET_ALL_RESTAURANT, payload: nearByRestaurant })
    }, 1000)

}

export const getActiveRestaurants = () => async (dispatch) => {
    const response = await axios.get(RESTAURANT_URL)
    const restaurant = response.data
    dispatch({ type: GET_ALL_RESTAURANT, payload: restaurant })
}

export const getCuisines = () => async (dispatch) => {
    const cuisineResponse = await axios.get(CUISINE_URL);
    const cuisine = await cuisineResponse.data;
    dispatch({ type: GET_CUISINES, payload: cuisine })
}