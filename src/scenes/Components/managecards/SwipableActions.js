import { View, Text } from 'react-native'
import React from 'react'
import { SwipeableQuickActions, SwipeableQuickActionButton } from 'react-native-swipe-list'
import Trash from "../../../../assets/Trash.png"
export default function SwipableActions({ item }) {
    const deleteAddress = () => { }
    return (
        <SwipeableQuickActions
            style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 0
            }}
        >
            <SwipeableQuickActionButton
                style={{
                    backgroundColor: "#ff2244",
                    padding: 8,
                    height: 100,
                    marginLeft: -24
                }}
                onPress={() => { deleteAddress(item.number) }}
                imageSource={Trash}
                imageStyle={{ height: 20, width: 20, alignSelf: "center" }}
            />
        </SwipeableQuickActions>
    )
}