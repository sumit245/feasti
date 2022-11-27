import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PaymentIcon } from 'react-native-payment-icons';
import { RadioButton } from 'react-native-paper';
import { trimmer, cvctrimmer } from "../../../services/actions/cardActions"
export default function PaymentCard({ item, index }) {
    const [trimmedState, setTrimmedState] = useState(false)
    const [checked, setChecked] = useState(false)
    let card_number = item.number;
    card_number = trimmer(card_number);
    let cryptcvc = "";
    if (trimmedState) {
        cryptcvc = cvctrimmer(item.cvc);
    } else {
        cryptcvc = item.cvc;
    }

    const changeSelector = () => {

    }
    return (
        <View style={styles.creditcard}>
            <View style={styles.creditcardHeader}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <PaymentIcon
                        type={
                            item.brand === "master-card"
                                ? "mastercard"
                                : item.brand
                        }
                        width={50}
                    />
                    <Text style={styles.creditcardNumber}>{item.number}</Text>
                </View>

                <RadioButton.Android
                    value={item.number}
                    status={checked === item.number ? "checked" : "unchecked"}
                    onPress={() => changeSelector(item.number)}
                    color="#ff6600"
                />
            </View>
            <View style={styles.cardBody}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 300,
                    }}
                >
                    <Text style={[styles.content, { fontWeight: "bold" }]}>
                        {item.card_holder}
                    </Text>
                    <Text style={styles.cvc}>{cryptcvc || item.cvc}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 300,
                    }}
                >
                    <Text style={styles.expiry}>{item.expiry}</Text>
                    <Text
                        style={[
                            styles.content,
                            {
                                color: "#226ccf",
                                textDecorationLine: "underline",
                                fontWeight: "bold",
                                fontSize: 10,
                            },
                        ]}
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

const styles = StyleSheet.create({

})