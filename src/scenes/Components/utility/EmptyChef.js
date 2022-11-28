import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux';

export default function EmptyChef() {
    const { user } = useSelector(state => state.reducer)
    const [city, setCity] = useState("")
    useEffect(() => {
        let localUser = user && JSON.parse(user)
        setCity(localUser.addresses[0].city)
    }, [])

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
            }}
        >
            <Icon name="md-sad-sharp" size={64} color="#ff9900" />
            <Text>Oops! No restaurant found online</Text>
            <Text style={{ fontSize: 18 }}>We are coming soon in {city}</Text>
        </View>
    )
}