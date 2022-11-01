import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from '../../styles/HomeStyle';
export default function DeliverySlots({ category,slotHandler }) {
    const [selected, setSelected] = useState('')
    const [slots, setSlots] = useState([{ slot_name: "Slot 1", slot_time: "11-12 AM" }, { slot_name: "Slot 2", slot_time: "12-1 PM" }, { slot_name: "Slot 3", slot_time: "1-2 PM" }])
    const [value, setValue] = useState('')
    const onSlotChange = (slot, selected) => { }
    return (
        <View style={styles.optionCard}>
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2,
                    marginBottom: 4,
                    paddingVertical: 2,
                    alignItems: 'flex-start',
                }}
            >
                <Text style={styles.optionsLabels}>Select a delivery slot</Text>
                <Text
                    style={{
                        fontSize: 12,
                        color: '#ff6600',
                        fontWeight: 'bold',
                    }}
                >
                    {' '}
                    {category}
                </Text>
            </View>
            {slots.map((slot, key) => (
                <RadioButton.Group
                    value={value}
                    onValueChange={(value) => onSlotChange(slot, value)}
                    key={key}
                >
                    <Text style={styles.radioLabel}>{slot.slot_name}</Text>
                    <View style={styles.radioRow}>
                        <Text>{slot.slot_time}</Text>
                        <RadioButton.Android value={slot.slot_time} color="#ff6600" />
                    </View>
                </RadioButton.Group>
            ))}
        </View>
    )
}