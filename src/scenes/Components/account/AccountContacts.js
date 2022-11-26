import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/Ionicons"
import { styles } from '../../styles/HomeStyle'

export default function AccountContacts({ navigation }) {
    return (
        <View style={styles.drawerRow}>
            <Icons name="mail-outline" color={'#000'} size={24} brand />
            <TouchableOpacity onPress={() => navigation.navigate('contacts')}>
                <Text style={styles.drawerText}>Support</Text>
            </TouchableOpacity>
        </View>
    )
}