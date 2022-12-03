import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../styles/HomeStyle'
import HeaderSimple from '../home/headerTop/HeaderSimple'
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import SavedAddress from './SavedAddress'


export default function ListAddress({ navigation }) {
  const { page } = route.params
  const { user } = useSelector(state => state.reducer)
  const [addresses, setAddresses] = useState([])
  const [loaded, setLoaded] = useState(false)

  const fetchAddress = () => {
    const { addresses } = JSON.parse(user)
    setAddresses(addresses)
    setLoaded(true)
  }

  useEffect(() => {
    let componentMount = true
    if (componentMount) {
      fetchAddress()
    }
    return () => {
      componentMount = false
    }
  }, [user])


  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <HeaderSimple title="Manage Address" navigation={navigation} />
        <SavedAddress address={addresses} />
        <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.bottomBtnRound}>
          <TouchableOpacity
            onPress={() => navigation.navigate('add_address', { page: page })}
          >
            <Text style={[styles.btnText, { marginLeft: 0 }]}>ADD NEW address</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </Provider>
  )
}