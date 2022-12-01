import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/Ionicons"
import { styles } from '../../styles/HomeStyle'

export default function AccountAddress({ navigation }) {
    return (
        <View style={styles.drawerRow}>
            <Icons name="earth" color={'#000'} size={24} brand />
            <TouchableOpacity onPress={() => { navigation.navigate('list_address') }}>
                <Text style={styles.drawerText}>Manage Address</Text>
            </TouchableOpacity>
        </View>
    )
}