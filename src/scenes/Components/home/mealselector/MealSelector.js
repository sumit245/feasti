import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../styles/HomeStyle'
import { Switch } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import { filterRestaurant, getDeliveryRestaurants, getNearByRestaurant, setTempRestaurant } from '../../../../services/actions/retaurantsAction';

export default function MealSelector({ category, setCategory, setLoading }) {
    const [isLunch, setIsLunch] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const dispatch = useDispatch()

    const onToggleMeal = async (category) => {
        setLoading(true)
        const value = isLunch ? "Lunch" : "Dinner"
        setIsLunch(!isLunch)
        setCategory(value)
        await dispatch(getNearByRestaurant(value))
        setLoading(false)
    };
    // Toggle Lunch Dinner

    const onTogglePickup = async () => {
        setLoading(true)
        const value = isDelivery ? false : true
        setIsDelivery(!isDelivery)
        await dispatch(getDeliveryRestaurants(category, value))
        setLoading(false)
    };
    //Toggle pickup delivery
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