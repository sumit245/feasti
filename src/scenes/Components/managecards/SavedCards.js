import React, { useState } from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import PaymentCard from './PaymentCard'
import NoCard from './NoCard'

export default function SavedCards({ credit_cards }) {
    const [data, setData] = useState([])
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            setData(credit_cards)
        }
        return () => {
            componentMount = false
        }
    }, [credit_cards])

    const renderItem = ({ item }) => <PaymentCard item={item} />
    return (
        <SwipeableFlatList
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={NoCard}
        />
    )
}