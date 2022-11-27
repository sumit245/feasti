import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'

export default function ListCards({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple title="Saved Cards" navigation={navigation} />
            

        </SafeAreaView>
    )
}