import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'


export default function ListAddress({ navigation }) {

  const { user } = useSelector(state => state.reducer)
  const [credit_cards, setCreditCards] = useState([])
  const [wallet_balance, setBalance] = useState(0)

  const [loaded, setLoaded] = useState(false)

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
  const fetchCards = () => {
    const { cards, wallet_balance } = JSON.parse(user)
    setBalance(wallet_balance)
    setCreditCards(cards)
    setLoaded(true)
  }

  useEffect(() => {
    let componentMount = true
    if (componentMount) {
      fetchCards()
    }
    return () => {
      componentMount = false
    }
  }, [user])

  const { modalVisible, title } = state

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <HeaderSimple title="Manage Address" navigation={navigation} />
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