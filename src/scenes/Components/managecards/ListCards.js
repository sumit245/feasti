import { View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import PaymentCard from './PaymentCard'

export default function ListCards({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const [credit_cards, setCreditCards] = useState([])
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            const { cards } = JSON.parse(user)
            setCreditCards(cards)
        }
        return () => {
            componentMount = false
        }
    }, [user])
    const renderItem = ({ item }) => <PaymentCard item={item} />
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <HeaderSimple title="Manage Payments" navigation={navigation} />

                <SwipeableFlatList
                    data={credit_cards}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </Provider>
    )
}