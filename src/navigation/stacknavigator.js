import React, { useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScene from "../scenes/AuthScene";
import OTPLogin from "../scenes/Components/mobilelogin/OTPLogin";
import UserDetail from "../scenes/Components/UserDetail"
import AddAddress from "../scenes/Components/manageaddress/AddAddress";
import { useDispatch, useSelector } from "react-redux";
import { getExpoNotificationToken, removeNotificationSubscription } from "../services/actions/notificationActions";
import PinLogin from "../scenes/Components/pinlogin/PinLogin";
import { getLocalUser } from "../services/actions/actions";
const Stack = createStackNavigator()
export default function StackNavigator() {
    const expoPushToken = useSelector(state => state.expoPushToken)
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getExpoNotificationToken())
        return () => {
            dispatch(removeNotificationSubscription(notificationListener.current))
            dispatch(removeNotificationSubscription(responseListener.current))
        }
    }, [])

    const getUser = async () => {
        const user = await dispatch(getLocalUser())
        console.log('====================================');
        console.log(user);
        console.log('====================================');
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
        </Stack.Navigator>
    )
}