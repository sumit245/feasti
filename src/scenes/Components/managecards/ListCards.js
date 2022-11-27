import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'

export default function ListCards({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple title="Manage Payments" navigation={navigation} />


        </SafeAreaView>
    )
}