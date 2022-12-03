import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { styles } from "../../styles/HomeStyle"
import Icon from "react-native-vector-icons/Ionicons"

export default function AddressCard({ item, index }) {
    const [trimmedState, setTrimmedState] = useState(false)
    const [checked, setChecked] = useState(false)

    const changeSelector = (selector) => {
        setChecked(selector)
    }
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            let number = trimmer(item.number);
            setCardNumber(number)
            let cryptcvc = "";
            if (trimmedState) {
                setCvc(item.cvc)
            } else {
                cryptcvc = cvctrimmer(item.cvc);
                setCvc(cryptcvc)
            }
        }

        return () => {
            componentMount = false
        }
    }, [item, trimmedState])

    return (
        <View style={styles.swipableCard} key={index}>
            <View style={styles.swipableCardHeader}>
                <View style={styles.optionrow}>
                    <Icon
                        name={
                            item.address_type === 'home'
                                ? 'home-outline'
                                : item.address_type === 'office'
                                    ? 'business-outline'
                                    : 'earth-outline'
                        }
                        size={24}
                        color="#777"
                    />
                    <Text style={styles.swipableCardHeaderText}>{item.address_type}</Text>
                </View>

                <RadioButton.Android
                    value={item._id}
                    status={checked === item._id ? "checked" : "unchecked"}
                    onPress={() => changeSelector(item._id)}
                    color="#ff6600"
                />
            </View>
            <View style={styles.swipableCardBody}>
                <View style={[styles.optionrow, { width: '100%' }]}>
                    <Text style={styles.title}> {item.addressLine1} </Text>
                    <Text style={styles.title}>{item.city}</Text>
                </View>
                <View style={[styles.optionrow, { width: '100%' }]}>
                    <Text style={styles.expiry}>{item.postal_code}, {item.state}, {item.country}</Text>

                </View>
            </View>
        </View>
    )
}
