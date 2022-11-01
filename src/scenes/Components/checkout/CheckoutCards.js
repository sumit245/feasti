import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { PaymentIcon } from "react-native-payment-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/HomeStyle"

export default function CheckoutCards() {
    const _nextAction = () => {

    }
    return (
        <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
            <View style={styles.optionrow}>
                <Text style={styles.optionsLabels}>{"Add a card"}</Text>
                <Icon name="chevron-forward" color="#444" size={20} />
            </View>
        </TouchableOpacity>
    )
}