import React, { useState, useEffect } from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import PaymentCard from './PaymentCard'
import NoCard from './NoCard'
import { ActivityIndicator } from 'react-native'
import SwipableActions from './SwipableActions'

export default function SavedCards({ credit_cards }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            setData(credit_cards)
            setLoading(false)
        }
        return () => {
            componentMount = false
        }
    }, [credit_cards])

    const renderItem = ({ item, index }) => <PaymentCard item={item} index={index} />
    const rendeRightActionButton = ({ item, index }) => <SwipableActions item={item} index={index} />
    if (loading) return (<ActivityIndicator size="large" animating />)
    return (
        <SwipeableFlatList
            data={data}
            contentContainerStyle={{ paddingBottom: 2, marginBottom: 4 }}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.number}
            ListEmptyComponent={NoCard}
            renderRightActions={(item) => rendeRightActionButton(item, index)}
        />
    )
}