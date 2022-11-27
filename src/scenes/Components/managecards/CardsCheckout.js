import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import SavedCards from './SavedCards'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'

export default function CardsCheckout() {
    const { user } = useSelector(state => state.reducer)
    const [credit_cards, setCreditCards] = useState([])
    const [state, setState] = useState({
        modalVisible: false,
        title: ""
    })
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            const { cards } = JSON.parse(user)
            setCreditCards(cards)
        }
        return () => {
            componentMount = false
        }
    }, [user])

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