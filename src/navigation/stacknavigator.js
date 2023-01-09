import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScene from "../scenes/AuthScene";
import OTPLogin from "../scenes/Components/mobilelogin/OTPLogin";
import UserDetail from "../scenes/Components/UserDetail"
import AddAddress from "../scenes/Components/manageaddress/AddAddress";
import { useDispatch, } from "react-redux";
import PinLogin from "../scenes/Components/pinlogin/PinLogin";
import { getNearByRestaurant, getCuisines } from "../services/actions/retaurantsAction";
import ChefDetails from "../scenes/ChefDetails";
import MaterialBottomNavigator from "./tabnavigator";
import Checkout from "../scenes/Checkout";
import { getMyOrders, getMySubscription } from "../services/actions/orderActions";
import Favorites from "../scenes/Favorites";
import Documents from "../scenes/Components/documents/Documents";
import ListCards from "../scenes/Components/managecards/ListCards";
import CardsCheckout from "../scenes/Components/managecards/CardsCheckout";
import Thankyou from "../scenes/Components/thankyou/Thankyou";
import Contacts from "../scenes/Components/contacts/Contacts";
import About from "../scenes/About"
import Rate from "../scenes/Components/ratings/Rate"
import NotificationScreen from "../scenes/NotificationScreen";
import EditAccount from "../scenes/EditAccount";
import ListAddress from "../scenes/Components/manageaddress/ListAddress";
import Rewards from "../scenes/ReviewScreen";
import OrderDetails from "../scenes/Components/orderdetails/OrderDetails";
import PayForAddOn from "../scenes/Components/wallet/PayForAddOn";
import { getLocalUser } from "../services/actions/actions";

const Stack = createStackNavigator()
export default function StackNavigator() {
    const dispatch = useDispatch()

    const getPreloadedData = () => {
        dispatch(getExpoNotificationToken())
        dispatch(getCuisines())
        dispatch(getMyOrders())
        dispatch(getMySubscription())
    }
    const checkLogin = async () => {
        const isLoggedIn = await dispatch(getLocalUser())
        console.log('====================================');
        console.log(isLoggedIn);
        console.log('====================================');
    }
    useEffect(() => {
        getPreloadedData()
        // checkLogin()
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
            <Stack.Screen name="documents" component={Documents} />
            <Stack.Screen name="list_cards" component={ListCards} />
            <Stack.Screen name="list_address" component={ListAddress} />
            <Stack.Screen name="checkout_card" component={CardsCheckout} />
            <Stack.Screen name="order_complete" component={Thankyou} />
            <Stack.Screen name="contacts" component={Contacts} />
            <Stack.Screen name="privacy_policy" component={About} />
            <Stack.Screen name="rate_order" component={Rate} />
            <Stack.Screen name="manage_notification" component={NotificationScreen} />
            <Stack.Screen name="edit_account" component={EditAccount} />
            <Stack.Screen name="chef_reviews" component={Rewards} />
            <Stack.Screen name="order_details" component={OrderDetails} />
            <Stack.Screen name="place_add_on" component={PayForAddOn} />
        </Stack.Navigator>
    )
}