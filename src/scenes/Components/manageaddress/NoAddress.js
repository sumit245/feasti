import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/HomeStyle'
import Icon from "react-native-vector-icons/Ionicons"

export default function NoAddress() {
    return (
        <View style={styles.centeredView}>
            <Icon name="sad-outline" size={80} color="#666" />
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                KNOCK KNOCK! WHO'S THERE?
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#666',
                    paddingVertical: 10,
                }}
            >
                You didn't have any addresses saved.{'\n'}
                Saving addresses helps you checkout faster.
            </Text>
        </View>
    )
}