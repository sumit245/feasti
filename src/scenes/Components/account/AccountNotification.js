import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/Ionicons"
import { styles } from '../../styles/HomeStyle'

export default function AccountNotification({ navigation }) {
    return (
        <View style={styles.drawerRow}>
            <Icons
                name="notifications-outline"
                color={'#000'}
                size={24}
                brand
            />
            <TouchableOpacity onPress={() => navigation.navigate('manage_notification')}>
                <Text style={styles.drawerText}>Notifications</Text>
            </TouchableOpacity>
        </View>
    )
}