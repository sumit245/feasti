import React from 'react'
import { SwipeableQuickActions, SwipeableQuickActionButton } from 'react-native-swipe-list'
import Trash from "../../../../assets/Trash.png"
import { useDispatch } from 'react-redux'
import { deleteAddressFromAPI } from '../../../services/actions/actions'
export default function SwipableActions({ item, index }) {
    const dispatch = useDispatch()
    const deleteAddress = (index) => {
        dispatch(deleteAddressFromAPI(index))
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
                onPress={() => deleteAddress(index)}
                imageSource={Trash}
                imageStyle={{ height: 20, width: 20, alignSelf: "center" }}
            />
        </SwipeableQuickActions>
    )
}