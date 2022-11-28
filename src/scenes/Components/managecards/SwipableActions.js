import React from 'react'
import { SwipeableQuickActions, SwipeableQuickActionButton } from 'react-native-swipe-list'
import Trash from "../../../../assets/Trash.png"
import { useDispatch } from 'react-redux'
import { deleteCardFromAPI } from '../../../services/actions/actions'
export default function SwipableActions({ item, index }) {
    const dispatch = useDispatch()
    const deleteCard = (index) => {
        dispatch(deleteCardFromAPI(index))
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