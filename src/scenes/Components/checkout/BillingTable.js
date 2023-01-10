import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import { styles } from "../../styles/HomeStyle"
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../../../services/actions/checkoutAction";

export default function BillingTable() {
    const [price, setPrice] = useState(0)
    const [delivery, setDelivery] = useState(false)
    const [service_fee, setServiceFee] = useState(0)
    const [promo, setPromo] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const { selectedPlan, isDelivery, tip, serviceFee, taxes, discount } = useSelector(state => state.checkoutReducer)
    const calculate = async () => {
        const { delivery_fee, customer_price } = selectedPlan
        setPrice(customer_price)
        setDelivery(delivery_fee)
        console.log(discount ,'is discount');
        setPromo(discount)
        let serviceCharge = customer_price * 0.01 * serviceFee;
        let total = parseFloat(serviceCharge) + parseFloat(customer_price) + parseFloat(tip) - parseFloat(discount)
        if (isDelivery) {
            total = parseFloat(total) + parseFloat(delivery_fee)
        }
        let tax = total * 0.01 * taxes;
        total = total + tax
        setTax(parseFloat(tax).toFixed(2))
        setServiceFee(parseFloat(serviceCharge).toFixed(2))
        setTotal(parseFloat(total).toFixed(2))
        await dispatch(calculateTotal(customer_price, service_fee, tax, isDelivery, delivery_fee, total, discount))
    }
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            calculate()
        }
        return () => {
            componentMount = false
        }
    }, [isDelivery, selectedPlan, tip, taxes, service_fee, tax, isDelivery, discount])

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
                <Text style={styles.billText}>${delivery}</Text>
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
                <Text style={styles.billText}>${parseFloat(promo).toFixed(2)}</Text>
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