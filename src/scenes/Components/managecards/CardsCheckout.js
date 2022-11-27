import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/HomeStyle'
import SavedCards from './SavedCards'
import { LinearGradient } from 'expo-linear-gradient'

export default function CardsCheckout() {
    const [state, setState] = useState({
        modalVisible: false,
        title: ""
    })
    return (
        <SafeAreaView style={styles.container}>
            <SavedCards credit_cards={credit_cards} />
            <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.bottomBtnRound}>
                <TouchableOpacity
                    onPress={() => {
                        setState({ modalVisible: true, title: "Add Card" });
                    }}
                >
                    <Text style={[styles.btnText, { marginLeft: 0 }]}>ADD NEW Card</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    )
}