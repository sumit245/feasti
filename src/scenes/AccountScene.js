import { SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "../scenes/styles/HomeStyle"
import { Provider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import AccountHeader from './Components/account/AccountHeader'
import AccountAddress from './Components/account/AccountAddress'
import AccountPayment from './Components/account/AccountPayment'
import AccountNotification from './Components/account/AccountNotification'
import AccountContacts from './Components/account/AccountContacts'
import AccountPolicies from './Components/account/AccountPolicies'
import AccountLogout from './Components/account/AccountLogout'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

export default function AccountScene({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const [data, setUser] = useState({})

    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            setUser(JSON.parse(user))
        }
        return () => {
            componentMount = false
        }
    }, [])

    const logout = async () => {
        await AsyncStorageLib.clear()
        navigation.navigate('auth')
    }
    const showDialog = () => {
        Alert.alert('Sign out?', 'Are you sure you want to logout', [
            { text: 'No' },
            { text: 'Yes', onPress: () => logout() },
        ]);
    };

    return (
        <Provider>
            <SafeAreaView style={styles.navdrawer}>
                <AccountHeader data={data} navigation={navigation} />
                <AccountAddress navigation={navigation} />
                <AccountPayment navigation={navigation} />
                <AccountNotification navigation={navigation} />
                <AccountContacts navigation={navigation} />
                <AccountPolicies navigation={navigation} />
                <AccountLogout navigation={navigation} showDialog={showDialog} />
            </SafeAreaView>
        </Provider>
    )
}