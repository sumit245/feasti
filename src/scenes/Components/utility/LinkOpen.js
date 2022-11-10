import { Alert, Linking, Platform } from 'react-native'
import React, { useCallback } from 'react'
import { Button } from 'react-native-paper';

export default function LinkOpen({ lat, lng, restaurant, children }) {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = restaurant;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    })
    return (
        <Button mode="text" onPress={handlePress}>{children}</Button>
    )
}