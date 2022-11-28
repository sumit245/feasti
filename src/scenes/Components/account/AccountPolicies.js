import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from "react-native-vector-icons/Ionicons"
import { styles } from '../../styles/HomeStyle'

export default function AccountPolicies({ navigation }) {
    return (
        <View style={styles.drawerRow}>
            <Icons
                name="md-document-text-outline"
                color={'#000'}
                style={{ fontWeight: 'bold' }}
                size={24}
                brand
            />
            <TouchableOpacity onPress={() => navigation.navigate('privacy_policy')}>
                <Text style={styles.drawerText}>About Us</Text>
            </TouchableOpacity>
        </View>
    )
}