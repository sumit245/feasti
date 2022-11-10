import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from "../../styles/HomeStyle"

export default function NoOrders({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 120 }}>
            <Image source={require('../../../../assets/pasta.png')} style={styles.imageFood} />
            <Text style={[styles.title, { fontSize: 16 }]}>Feeling Hungry? It's time to place an order!</Text>
            <TouchableOpacity style={[styles.buttonEllipse, { marginTop: 8 }]} onPress={() => navigation.navigate('Meals')} >
                <Text style={[styles.btnText, { marginLeft: 0, fontSize: 14 }]}>Explore Homechef</Text>
            </TouchableOpacity>
        </View>
    )
}