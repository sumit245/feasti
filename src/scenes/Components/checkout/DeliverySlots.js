import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliverySlot, setDeliverySlots } from '../../../services/actions/checkoutAction';
import { styles } from '../../styles/HomeStyle';
export default function DeliverySlots() {

    const { currentSlots } = useSelector(state => state.checkoutReducer)

    const [slots, setSlots] = useState([])
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    useEffect(async () => {
        setSlots(currentSlots)
    }, [])

    const onSlotChange = async (selected) => {
        setValue(selected)
        await dispatch(setDeliverySlot(selected))
    }
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
            {Array.isArray(slots) && slots.map((slot, key) => (
                <RadioButton.Group
                    value={value}
                    onValueChange={(value) => onSlotChange(value)}
                    key={key}
                >
                    <Text style={styles.radioLabel}>{slot.slot_name}</Text>
                    <View style={styles.radioRow}>
                        <Text>{slot.slot_time}</Text>
                        <RadioButton.Android value={slot.slot_time} color="#ff6600" status='checked' />
                    </View>
                </RadioButton.Group>
            ))}
        </View>
    )
}