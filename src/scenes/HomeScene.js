import { View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderComponent from './Components/home/headerTop/HeaderComponent'
import Cuisines from './Components/home/headerCuisine/Cuisines'
import Meals from './Components/home/mealArea/Meals'
import BannerCarousel from './Components/home/banner/BannerCarousel'
import MealSelector from './Components/home/mealselector/MealSelector'

export default function HomeScene({ navigation }) {
    const [category, setCategory] = useState('Lunch')
    const { nearByRestaurant } = useSelector((state) => state.restaurantReducer)
    const { tempRestaurant } = useSelector((state) => state.restaurantReducer)

    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
            <HeaderComponent />
            <View>
                <Cuisines />
            </View>
            <BannerCarousel />
            <MealSelector nearByRestaurant={tempRestaurant} setCategory={(value) => setCategory(value)} />
            <Meals restaurant={nearByRestaurant} navigation={navigation} category={category} />
        </SafeAreaView>
    )
}