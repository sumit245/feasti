import { View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from './Components/home/headerTop/HeaderComponent'
import Cuisines from './Components/home/headerCuisine/Cuisines'
import Meals from './Components/home/mealArea/Meals'
import BannerCarousel from './Components/home/banner/BannerCarousel'
import MealSelector from './Components/home/mealselector/MealSelector'
import Loader from "../scenes/Components/utility/Loader"


export default function HomeScene({ navigation }) {
    const [category, setCategory] = useState('Lunch')
    const [loading, setLoading] = useState(false)
    const { nearByRestaurant } = useSelector((state) => state.restaurantReducer)
    const { tempRestaurant } = useSelector((state) => state.restaurantReducer)

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
            <HeaderComponent navigation={navigation} />
            <View>
                <Cuisines />
            </View>
            <BannerCarousel />
            <MealSelector
                setCategory={(value) => setCategory(value)}
                category={category}
                setLoading={(value) => setLoading(value)} />
            {
                !loading ? (
                    <Meals restaurant={nearByRestaurant} navigation={navigation} category={category} />
                ) : (
                    <Loader msg="Please wait while apetizing food is coming!" />
                )
            }
        </SafeAreaView>
    )
}