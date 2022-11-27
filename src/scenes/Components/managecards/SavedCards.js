import React from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import PaymentCard from './PaymentCard'
import NoCard from './NoCard'

export default function SavedCards({ credit_cards }) {
    const renderItem = ({ item }) => <PaymentCard item={item} />
    return (
        <SwipeableFlatList
            data={credit_cards}
            renderItem={renderItem}
            ListEmptyComponent={NoCard}
        />
    )
}