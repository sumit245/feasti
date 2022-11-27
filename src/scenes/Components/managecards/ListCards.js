import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import PaymentCard from './PaymentCard'
import SavedCards from "./SavedCards"
import { LinearGradient } from 'expo-linear-gradient'

export default function ListCards({ navigation }) {
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
        <Provider>
            <SafeAreaView style={styles.container}>
                <HeaderSimple title="Manage Payments" navigation={navigation} />

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
        </Provider>
    )
}