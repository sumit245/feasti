import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import SavedCards from "./SavedCards"
import { LinearGradient } from 'expo-linear-gradient'
import WalletCard from './WalletCard'
import AddCardPopup from './AddCardPopup'

export default function ListCards({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const [credit_cards, setCreditCards] = useState([])
    const [wallet_balance, setBalance] = useState(0)
    const [state, setState] = useState({
        modalVisible: false,
        title: ""
    })
    const hideModal = () => {
        setState(prevState => ({
            ...prevState,
            modalVisible: false
        }))
    }
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            const { cards, wallet_balance } = JSON.parse(user)
            setBalance(wallet_balance)
            setCreditCards(cards)
        }
        return () => {
            componentMount = false
        }
    }, [credit_cards, wallet_balance])
    const { modalVisible, title } = state
    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <HeaderSimple title="Manage Payments" navigation={navigation} />
                <WalletCard navigation={navigation} wallet_balance={wallet_balance} />
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
                            title={title}
                            setVisible={hideModal}
                        />
                    )
                }
            </SafeAreaView>
        </Provider>
    )
}