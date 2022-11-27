import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/Ionicons"
import { styles } from '../../styles/HomeStyle'

export default function AccountPayment({ navigation }) {
    return (
        <View style={styles.drawerRow}>
            <Icons name="md-card-outline" color={'#000'} size={24} />
            <TouchableOpacity onPress={() => navigation.navigate('list_cards')}>
                <Text style={styles.drawerText}>Manage Payments</Text>
            </TouchableOpacity>
        </View>
    )
}