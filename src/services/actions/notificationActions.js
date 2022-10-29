import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../NotificationServiceHandle';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const SET_NOTIFICATION_TOKEN = "SET_NOTIFICATION_TOKEN"
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const SET_NOTIFICATION_RESPONSE = "SET_NOTIFICATION_RESPONSE"

export const getExpoNotificationToken = () => async (dispatch) => {
    const expoNotificationToken = await registerForPushNotificationsAsync()
    await AsyncStorage.setItem('expoPushToken', expoNotificationToken)
    dispatch({ type: SET_NOTIFICATION_TOKEN, payload: expoNotificationToken })
}

export const setNotification = (notificationListener) => async (dispatch) => {
    const notification = await Notifications.addNotificationReceivedListener()
    dispatch({ type: SET_NOTIFICATION, payload: notification })
    return notification
}

export const addNotificationReceivedListener = (responseListener) => async (dispatch) => {
    const response = await Notifications.addNotificationResponseReceivedListener()
    dispatch({ type: SET_NOTIFICATION_RESPONSE, payload: response })
}
export const removeNotificationSubscription = (listener) => {
    Notifications.removeNotificationSubscription(listener);
}



// responseListener.current =
//     Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//     });

// notificationListener.current =
//     Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//     });