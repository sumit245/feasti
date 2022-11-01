import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/HomeStyle"
import { Button } from "react-native-paper";

export default function CheckoutAddress() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        address_type: "Home",
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
    });

    const onAddressSelect = () => { }

    const _nextAction = () => { }

    return (
        <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
            <View style={styles.optionrow}>
                <Text style={styles.optionsLabels}>{"Add new address"}</Text>
                <Icon name="chevron-forward" color="#444" size={20} />
            </View>
        </TouchableOpacity>
    )
}