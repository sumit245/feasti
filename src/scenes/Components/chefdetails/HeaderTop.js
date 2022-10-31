import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function HeaderTop({ navigation, title, id }) {
    useEffect(() => {
        console.log(title)
        console.log('====================================');
        console.log(id);
        console.log('====================================');
    }, [])

    return (
        <View>
            <Text>HeaderTop</Text>
        </View>
    )
}