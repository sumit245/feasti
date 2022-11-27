import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PaymentIcon } from 'react-native-payment-icons';
import { RadioButton } from 'react-native-paper';

export default function PaymentCard({ item }) {
    const [trimmedState, setTrimmedState] = useState(false)
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
                    <Text style={styles.creditcardNumber}>{card_number}</Text>
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