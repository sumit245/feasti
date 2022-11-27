import React, { useState, useEffect } from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import PaymentCard from './PaymentCard'
import NoCard from './NoCard'
import { ActivityIndicator } from 'react-native'

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

    const renderItem = ({ item }) => <PaymentCard item={item} />
    if (loading) return (<ActivityIndicator size="large" animating />)
    return (
        <SwipeableFlatList
            data={data}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.number}
            ListEmptyComponent={NoCard}
        />
    )
}