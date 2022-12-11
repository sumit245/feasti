import { View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HeaderComponent from './Components/home/headerTop/HeaderComponent'
import Cuisines from './Components/home/headerCuisine/Cuisines'
import Meals from './Components/home/mealArea/Meals'
import BannerCarousel from './Components/home/banner/BannerCarousel'
import MealSelector from './Components/home/mealselector/MealSelector'
import Loader from "../scenes/Components/utility/Loader"
import { getActiveRestaurants, getAdminCoupon, getNearByRestaurant, searchRestaurantByCity } from '../services/actions/retaurantsAction'
import { Provider } from 'react-native-paper'
import AdminCoupon from './Components/home/admincoupon/AdminCoupon'


export default function HomeScene({ navigation }) {
    const [category, setCategory] = useState('Lunch')
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [isDelivery, setisDelivery] = useState('');
    const [discount, setDiscount] = useState(0);
    const [hasAdminCoupon, setHasCoupon] = useState(false)
    const [promo_code, setPromoCode] = useState('');

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
        await dispatch(getNearByRestaurant('Lunch'))
        setRefreshing(false)
        setLoading(false)
    }
    const getCoupon = async () => {
        const coupons = await dispatch(getAdminCoupon())
        let { isDelivery, discount, promo_code } = coupons[0];
        setisDelivery(isDelivery);
        setDiscount(discount);
        setPromoCode(promo_code);
        setHasCoupon(true)
    };
    useEffect(() => {
        let componentMounted = true
        if (componentMounted) {
            setLoading(true)
            dispatch(getNearByRestaurant('Lunch'))
            getCoupon()
            setLoading(false)
        }
    }, [])


    return (
        <Provider>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }} >
                <HeaderComponent navigation={navigation} searchTerm={(city) => searchByCity(city)} />
                <View>
                    <Cuisines setLoading={(value) => setLoading(value)} />
                </View>
                <BannerCarousel navigation={navigation} />
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
                {
                    hasAdminCoupon &&
                    <AdminCoupon
                        visible={hasAdminCoupon}
                        hideModal={() => setHasCoupon(!hasAdminCoupon)}
                        discount={discount}
                        promo_code={promo_code}
                        isDelivery={isDelivery}
                    />
                }
            </SafeAreaView>
        </Provider>
    )
}