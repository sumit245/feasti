import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { PaymentIcon } from 'react-native-payment-icons';
import { RadioButton } from 'react-native-paper';
import { styles } from "../../styles/HomeStyle"
import { trimmer, cvctrimmer } from "../../../services/actions/cardActions"
export default function PaymentCard({ item, index }) {
    const [trimmedState, setTrimmedState] = useState(false)
    const [checked, setChecked] = useState(false)
    const [card_number, setCardNumber] = useState("")
    const [cvc, setCvc] = useState("")

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
                cryptcvc = cvctrimmer(item.cvc);
                setCvc(cryptcvc)
            } else {
                cryptcvc = item.cvc;
                setCvc(cryptcvc)
            }
        }

        return () => {
            componentMount = false
        }
    }, [item])

    return (
        <View style={styles.swipableCard} key={index}>
            <View style={styles.swipableCardHeader}>
                <View style={styles.optionrow}>
                    <PaymentIcon
                        type={
                            item.brand === "master-card"
                                ? "mastercard"
                                : item.brand
                        }
                        width={50}
                    />
                    <Text style={styles.swipableCardHeaderText}>{card_number}</Text>
                </View>

                <RadioButton.Android
                    value={item.number}
                    status={checked === item.number ? "checked" : "unchecked"}
                    onPress={() => changeSelector(item.number)}
                    color="#ff6600"
                />
            </View>
            <View style={styles.swipableCardBody}>
                <View style={styles.optionrow}>
                    <Text style={styles.title}> {item.card_holder} </Text>
                    <Text style={styles.title}>{cvc}</Text>
                </View>
                <View style={styles.optionrow}>
                    <Text style={styles.expiry}>{item.expiry}</Text>
                    <Text
                        style={styles.billLink}
                        onPress={() => {
                            setTrimmedState(!trimmedState);
                        }}
                    >
                        {trimmedState ? "SHOW CVC" : "HIDE CVC"}
                    </Text>
                </View>
            </View>
        </View>
    )
}
