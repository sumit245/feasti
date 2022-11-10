import { View, Text } from 'react-native'
import React from 'react'

export default function OrderHeader() {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                padding: 4,
                paddingHorizontal: 6,
            }}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "#000",
                    textAlign: "center",
                    padding: 10,
                }}
            >
                My Orders
            </Text>
        </View>
    )
}