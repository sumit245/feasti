import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import { styles } from "../../styles/HomeStyle"
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function BillingTable() {
    const [price, setPrice] = useState(0)
    const [delivery, setDelivery] = useState(false)
    const [service_fee, setServiceFee] = useState(0)
    const [delivery_fee, setDeliveryFee] = useState(0)
    const [tax, setTax] = useState(0)
    const [total] = useState(0)
    const [discount, setDiscount] = useState(0)
    const { selectedPlan, isDelivery, tip, serviceFee, taxes } = useSelector(state => state.checkoutReducer)
    const calculate = () => {

        let serviceCharge = 0.01 * serviceFee;
        console.log(isDelivery, selectedPlan, serviceFee, taxes)
    }
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            calculate()
        }
        return () => {
            componentMount = false
        }
    }, [isDelivery])

    return (
        <View style={styles.billingTable}>
            <Text style={styles.billTitle}>Bill Details</Text>
            <View style={styles.billRow}>
                <Text style={styles.billText}>Subtotal</Text>
                <Text style={styles.billText}>${price}</Text>
            </View>
            {isDelivery && <View style={styles.billRow}>
                <Text style={[styles.billText, { color: "#226ccf" }]}>
                    Delivery Fee{"\n"}
                    <Text style={{ fontSize: 12, marginRight: 4, color: "#777" }}>
                        This fees goes towards paying {"\n"}your delivery partner daily.{" "}
                    </Text>
                </Text>
                <Text style={styles.billText}>${delivery_fee}</Text>
            </View>}
            <View style={styles.billRow}>
                <Text style={styles.billText}>
                    Service Fee ({serviceFee}%)
                    <Icon
                        name="information-circle-outline"
                        size={14}
                        color="#226ccf"
                    />
                </Text>
                <Text style={styles.billText}>${service_fee}</Text>
            </View>

            <View style={styles.billRow}>
                <Text style={styles.billText}>Promo discount</Text>
                <Text style={styles.billText}>${discount}</Text>
            </View>
            <View style={styles.billRow}>
                <Text style={styles.billText}>Tip Amount</Text>
                <Text style={styles.billText}>${tip}</Text>
            </View>
            <View style={styles.billRow}>
                <Text style={styles.billText}>Taxes</Text>
                <Text style={styles.billText}>${tax}</Text>
            </View>
            <View style={styles.billRow}>
                <Text style={styles.billText}>Total</Text>
                <Text style={styles.billText}>${total}</Text>
            </View>
        </View>
    )
}