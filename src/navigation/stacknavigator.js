import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScene from "../scenes/AuthScene";
import OTPLogin from "../scenes/Components/mobilelogin/OTPLogin";
import UserDetail from "../scenes/Components/UserDetail"
import AddAddress from "../scenes/Components/manageaddress/AddAddress";
import HomeScene from "../scenes/HomeScene"
import { useDispatch, useSelector } from "react-redux";
import { getExpoNotificationToken, removeNotificationSubscription } from "../services/actions/notificationActions";
import PinLogin from "../scenes/Components/pinlogin/PinLogin";
import { getNearByRestaurant, getActiveRestaurants, getCuisines, getPricing } from "../services/actions/retaurantsAction";
import ChefDetails from "../scenes/ChefDetails";
import MaterialBottomNavigator from "./tabnavigator";
import Checkout from "../scenes/Checkout";
const Stack = createStackNavigator()
export default function StackNavigator() {
    const expoPushToken = useSelector(state => state.expoPushToken)
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getExpoNotificationToken())
    }, [])

    const getUser = async () => {
        await dispatch(getActiveRestaurants())
        await dispatch(getNearByRestaurant())
        await dispatch(getCuisines())
    }

    useEffect(() => {
        getUser()
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
        </Stack.Navigator>
    )
}