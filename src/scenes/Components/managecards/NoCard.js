import React from 'react'
import { View, Text } from 'react-native'
import Icon from "react-native-vector-icons/Fontisto"
import { styles } from '../../styles/HomeStyle'

export default function NoCard() {
    return (
        <View style={styles.container}>
            <Icon name="frowning" size={80} color="#666" />
            <Text style={styles.title}>
                No Cards Added to payment method
            </Text>
            <Text style={styles.headersubtitle}>
                You didn't have any cards saved.{"\n"}
                Saved cards helps us to manage payments faster.
            </Text>
        </View>
    )
}