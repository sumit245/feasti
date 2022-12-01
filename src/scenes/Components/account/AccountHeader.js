import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from '../../styles/HomeStyle'

export default function AccountHeader({ data, navigation }) {
    return (
        <View style={styles.accountHeader}>
            <View style={styles.imageNumName}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: data.profile_picture }}
                        style={styles.profilepic}
                    />
                </View>
                <View style={{ marginLeft: 10, marginTop: 16 }}>
                    <Text
                        style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}
                    >
                        {data.first_name} {data.last_name}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('edit_account')}>
                        <Text style={{ color: '#ff6600', fontWeight: 'bold' }}>
                            Edit Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}