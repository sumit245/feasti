import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../styles/HomeStyle'
import { Switch } from 'react-native-paper'

export default function MealSelector() {
    const [isLunch, setIsLunch] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const onToggleMeal = () => setIsLunch(!isLunch);
    const onTogglePickup = () => setIsDelivery(!isDelivery);
    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text>{isLunch ? "Dinner" : "Lunch"}</Text>
                <Switch value={isLunch} onValueChange={onToggleMeal} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text>{isDelivery ? "Doorstep Delivery" : "Chef Pickup"}</Text>
                <Switch value={isDelivery} onValueChange={onTogglePickup} />
            </View>

        </View>
    )
}