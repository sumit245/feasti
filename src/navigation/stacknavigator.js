import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScene from "../scenes/AuthScene";
import OTPLogin from "../scenes/Components/mobilelogin/OTPLogin";
import UserDetail from "../scenes/Components/UserDetail"
import AddAddress from "../scenes/Components/manageaddress/AddAddress";
import { useDispatch, } from "react-redux";
import { getExpoNotificationToken } from "../services/actions/notificationActions";
import PinLogin from "../scenes/Components/pinlogin/PinLogin";
import { getNearByRestaurant, getCuisines } from "../services/actions/retaurantsAction";
import ChefDetails from "../scenes/ChefDetails";
import MaterialBottomNavigator from "./tabnavigator";
import Checkout from "../scenes/Checkout";
import { getMyOrders, getMySubscription } from "../services/actions/orderActions";
import Favorites from "../scenes/Favorites";
const Stack = createStackNavigator()
export default function StackNavigator() {
    const dispatch = useDispatch()

    const getPreloadedData = () => {
        dispatch(getExpoNotificationToken())
        dispatch(getNearByRestaurant('Lunch'))
        dispatch(getCuisines())
        dispatch(getMyOrders())
        dispatch(getMySubscription())
    }

    useEffect(() => {
        getPreloadedData()
    }, [])



    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="auth" component={AuthScene} />
            <Stack.Screen name="otplogin" component={OTPLogin} />
            <Stack.Screen name="userdetails" component={UserDetail} />
            <Stack.Screen name="add_address" component={AddAddress} />
            <Stack.Screen name="pin_login" component={PinLogin} />
            <Stack.Screen name="home" component={MaterialBottomNavigator} />
            <Stack.Screen name="chef_details" component={ChefDetails} />
            <Stack.Screen name="checkout" component={Checkout} />
            <Stack.Screen name="favorites" component={Favorites} />
        </Stack.Navigator>
    )
}