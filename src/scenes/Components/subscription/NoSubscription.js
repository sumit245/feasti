import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { height, styles, width } from '../../styles/HomeStyle'

export default function NoSubscription({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                width: width,
                height: height
            }}
        >
            <Image style={styles.imageFood} source={require('../../../../assets/empty.jpg')} />
            <Text
                style={[styles.title, { color: "#000" }]}
            >
                You don't have any active subscriptions!!!.
            </Text>
            <TouchableOpacity style={[styles.buttonEllipse, { marginTop: 8 }]} onPress={() => navigation.navigate('Meals')} >
                <Text style={[styles.btnText, { marginLeft: 0, fontSize: 14 }]}>Explore Homechef</Text>
            </TouchableOpacity>
        </View>
    )
}