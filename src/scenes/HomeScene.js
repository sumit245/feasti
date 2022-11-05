import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from './Components/home/headerTop/HeaderComponent'
import Cuisines from './Components/home/headerCuisine/Cuisines'
import Meals from './Components/home/mealArea/Meals'
import BannerCarousel from './Components/home/banner/BannerCarousel'
import MealSelector from './Components/home/mealselector/MealSelector'



export default function HomeScene({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const { nearByRestaurant } = useSelector((state) => state.restaurantReducer)
    const { tempRestaurant } = useSelector((state) => state.restaurantReducer)

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
            <HeaderComponent />
            <View>
                <Cuisines />
            </View>
            <BannerCarousel />
            <MealSelector nearByRestaurant={tempRestaurant} />
            <Meals restaurant={nearByRestaurant} navigation={navigation} />
        </SafeAreaView>
    )
}