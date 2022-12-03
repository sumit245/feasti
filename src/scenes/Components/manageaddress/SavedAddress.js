import React, { useState, useEffect } from 'react'
import { SwipeableFlatList } from 'react-native-swipe-list'
import NoAddress from "./NoAddress"
import { ActivityIndicator } from 'react-native'
import SwipableActions from './SwipableActions'
import AddressCard from './AddressCard'

export default function SavedAddress({ address }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            setData(address)
            setLoading(false)
        }
        return () => {
            componentMount = false
        }
    }, [address])

    const renderItem = ({ item, index }) => <AddressCard item={item} index={index} />
    const rendeRightActionButton = ({ item, index }) => <SwipableActions item={item} index={index} />
    if (loading) return (<ActivityIndicator size="large" animating />)
    return (
        <SwipeableFlatList
            data={data}
            contentContainerStyle={{ paddingBottom: 2, marginBottom: 4 }}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item, index) => (item.number + index).toString()}
            ListEmptyComponent={NoAddress}
            renderRightActions={(item) => rendeRightActionButton(item)}
        />
    )
}