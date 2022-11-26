import { View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HeaderComponent from './Components/home/headerTop/HeaderComponent'
import Cuisines from './Components/home/headerCuisine/Cuisines'
import Meals from './Components/home/mealArea/Meals'
import BannerCarousel from './Components/home/banner/BannerCarousel'
import MealSelector from './Components/home/mealselector/MealSelector'
import Loader from "../scenes/Components/utility/Loader"
import { getActiveRestaurants, searchRestaurantByCity } from '../services/actions/retaurantsAction'


export default function HomeScene({ navigation }) {
    const [category, setCategory] = useState('Lunch')
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const { nearByRestaurant } = useSelector((state) => state.restaurantReducer)
    const dispatch = useDispatch()

    const searchByCity = async (city) => {
        setLoading(true)
        await dispatch(searchRestaurantByCity(city))
        setLoading(false)
    }

    const onRefresh = async () => {
        setLoading(true)
        setRefreshing(true)
        await dispatch(getActiveRestaurants())
        setRefreshing(false)
        setLoading(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
            <HeaderComponent navigation={navigation} searchTerm={(city) => searchByCity(city)} />
            <View>
                <Cuisines setLoading={(value) => setLoading(value)} />
            </View>
            <BannerCarousel />
            <MealSelector
                setCategory={(value) => setCategory(value)}
                category={category}
                setLoading={(value) => setLoading(value)} />
            {
                !loading ? (
                    <Meals
                        restaurant={nearByRestaurant}
                        navigation={navigation}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        category={category} />
                ) : (
                    <Loader msg="Please wait while apetizing food is coming!" />
                )
            }
        </SafeAreaView>
    )
}