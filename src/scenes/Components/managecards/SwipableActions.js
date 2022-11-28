import React from 'react'
import { SwipeableQuickActions, SwipeableQuickActionButton } from 'react-native-swipe-list'
import Trash from "../../../../assets/Trash.png"
export default function SwipableActions({ item, index }) {
    const deleteCard = () => {
        console.log('====================================');
        console.log(index);
        console.log('====================================');
    }
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
                    height: 94,
                }}
                onPress={() => deleteCard(index)}
                imageSource={Trash}
                imageStyle={{ height: 20, width: 20, alignSelf: "center" }}
            />
        </SwipeableQuickActions>
    )
}