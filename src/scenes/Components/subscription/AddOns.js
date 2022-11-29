import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function AddOns({ addon }) {
    useEffect(() => {
        let componentMounted = true
        if (componentMounted) {
            console.log('====================================');
            console.log(addon);
            console.log('====================================');
        }

        return () => {
            componentMounted = false
        }
    }, [])

    return (
        <View>
            <Text>AddOns</Text>
        </View>
    )
}