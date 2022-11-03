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
                    
                        <LinearGradient colors={!delivery? ["#ff9900", "#ff6600"] : ["#fff", "transparent"]} style={styles.tipBox}>
                            <Text style={{
                            color: !delivery ? "#FFF" : "#777",
                            padding: 1,
                            fontWeight: "bold",
                            textAlign:"center"
                        }}>Pickup</Text>
                        </LinearGradient>

                        
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%' }} onPress={() => setDelivery(true)}>
                    
                        <LinearGradient colors={delivery? ["#ff9900", "#ff6600"] : ["#fff", "transparent"]} style={styles.tipBox}>
                            <Text style={{
                            color: delivery? "#FFF" : "#777",
                            padding: 1,
                            fontWeight: "bold",
                            textAlign:"center"
                        }}>Delivery</Text>
                        </LinearGradient>
                        
                </TouchableOpacity>
            </View>
            <Text style={[styles.tipText,{marginVertical:8}]}>
                {
                    !delivery
                        ? <Text style={[styles.tipText,{paddingBottom:4}]}>Pickup is from cook's home, and is free!{"\n"} 
                            <Text style={{fontWeight:'bold',color:"#000"}}>Approx 1.1 km from you</Text>
                        </Text>
                        :
                        <Text style={styles.tipText}>Delivery powered by our chef{"\n"}
                            
                        </Text>
                }
            </Text>
        </View>
    )
}