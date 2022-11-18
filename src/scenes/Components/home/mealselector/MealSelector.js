import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../styles/HomeStyle'
import { Switch } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { filterRestaurant } from '../../../../services/actions/retaurantsAction';

export default function MealSelector({ nearByRestaurant, setCategory }) {
    const [isLunch, setIsLunch] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const dispatch = useDispatch()
    const onToggleMeal = async () => {
        const value = isLunch ? "Lunch" : "Dinner"
        await dispatch(filterRestaurant(nearByRestaurant, "meal_type", value))
        setCategory(value)
        setIsLunch(!isLunch)
    };
    const onTogglePickup = async () => {
        const value = isDelivery ? false : true
        await dispatch(filterRestaurant(nearByRestaurant, "isDelivery", value))
        setIsDelivery(!isDelivery)
    };
    return (
        <View style={[styles.header, { height: 32 }]}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={styles.title}>{isLunch ? "Dinner" : "Lunch"}</Text>
                <Switch value={isLunch} onValueChange={onToggleMeal} style={styles.selectorSwitch} color="#ff6600" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={styles.title}>{isDelivery ? " Delivery" : "Chef Pickup"}</Text>
                <Switch value={isDelivery} onValueChange={onTogglePickup} style={styles.selectorSwitch} color="#ff6600" />
            </View>

        </View>
    )
}