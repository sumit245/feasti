import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/HomeStyle'
import { LinearGradient } from 'expo-linear-gradient'

export default function DeliverySelector() {
    const [delivery, setDelivery] = useState(false)
    return (
        <View style={styles.optionCard}>
            <View style={[styles.optionrow, { justifyContent: 'center' }]}>
                <TouchableOpacity style={{ width: '50%' }} onPress={() => setDelivery(false)} >
                    {!delivery ?
                        <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.selectoffer}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold' }}>Chef Pickup</Text>
                        </LinearGradient>
                        : <Text style={{ color: "#000", fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Chef Pickup</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%' }} onPress={() => setDelivery(true)}>
                    {delivery ?
                        <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.selectoffer}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold' }}>Delivery</Text>
                        </LinearGradient>
                        : <Text style={{ color: "#000", fontSize: 18, fontWeight: 'bold', 'textAlign': 'center' }}>Delivery</Text>
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.tipText}>
                {
                    !delivery
                        ? <Text>Pickup is from cook's home and is free!{"\n"}
                            <Text style={{fontWeight:'bold',color:"#000"}}>Approx 1.1 km from you</Text>
                        </Text>
                        :
                        <Text>Worry free delivery direct to your door!!!{"\n"}
                            <Text style={{ fontWeight: 'bold', color: "#000" }}>Charges Applied.*</Text>
                        </Text>
                }
            </Text>
        </View>
    )
}