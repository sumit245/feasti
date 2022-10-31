import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../styles/HomeStyle'
import { Switch } from 'react-native-paper'

export default function MealSelector() {
    const [isLunch, setIsLunch] = useState(false);
    const [isDelivery, setIsDelivery] = useState(false);
    const onToggleMeal = () => setIsLunch(!isLunch);
    const onTogglePickup = () => setIsDelivery(!isDelivery);
    return (
        <View style={[styles.header, { height: 28 }]}>
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