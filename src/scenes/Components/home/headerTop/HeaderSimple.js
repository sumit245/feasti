import { View, Text } from 'react-native'
import React from 'react'
import BackButton from '../../utility/BackButton'

export default function HeaderSimple({ navigation, title }) {
    return (
        <View style={{ flexDirection: 'row', height: 48 }}>
            <BackButton navigation={navigation} />
            <Text style={{ textAlign: 'center', fontSize: 20, color: "#000", fontWeight: 'bold', marginLeft: '25%' }}>{title}</Text>
        </View>
    )
}