import { TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../../styles/HomeStyle'
import Icons from "react-native-vector-icons/Ionicons"

export default function AccountLogout({ navigation, showDialog }) {
    return (
        <LinearGradient
            colors={['#ff9900', '#ff6600']}
            style={styles.logoutButton}
        >
            <TouchableOpacity onPress={showDialog}>
                <Icons name="power-sharp" color={'#fff'} size={28} brand />
            </TouchableOpacity>
        </LinearGradient>
    )
}