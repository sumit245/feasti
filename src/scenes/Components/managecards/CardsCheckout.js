import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import SavedCards from './SavedCards'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import AddCardPopup from './AddCardPopup'

export default function CardsCheckout({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const [credit_cards, setCreditCards] = useState([])
    const [state, setState] = useState({
        modalVisible: false,
        title: ""
    })
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            const { cards } = user && JSON.parse(user)
            setCreditCards(cards)
        }
        return () => {
            componentMount = false
        }
    }, [user])
    const hideModal = () => {
        setState(prevstate => ({
            ...prevstate,
            modalVisible: false
        }))
    }
    const { modalVisible, title } = state
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <HeaderSimple navigation={navigation} title="Select Card" />
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
                {
                    modalVisible && (
                        <AddCardPopup
                            visible={modalVisible}
                            setVisible={hideModal}
                            title={title}
                        />
                    )
                }
            </SafeAreaView>
        </Provider>
    )
}