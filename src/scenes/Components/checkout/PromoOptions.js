import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import { useSelector } from "react-redux";
import { styles } from "../../styles/HomeStyle"

export default function PromoOptions() {
    const { allCoupons } = useSelector(state => state.checkoutReducer)
    const [coupons, setCoupons] = useState([])
    const [pulled, setPulled] = useState(false)
    const [applied, setApplied] = useState([])
    const [isAdmin, setAdmin] = useState(false)
    useEffect(() => {
        setCoupons(allCoupons)
    }, [allCoupons])
    const applyCoupon = (key) => {
        setApplied(!applied)
        console.log('====================================');
        console.log("Selected Coupon is ", coupons[key]);
        console.log('====================================');
    }
    return (
        <View style={styles.optionCard}>
            <View style={[styles.optionrow, { alignItems: "center" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="shopping-sale" size={24} color="#ff6600" />
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: 16,
                            paddingHorizontal: 2,
                            textTransform: "capitalize",
                        }}
                    >
                        Apply coupon
                    </Text>
                    <Icon name="star" color="#ff6600" size={8} />
                </View>
                <Icon
                    name={!pulled ? "angle-right" : "angle-down"}
                    size={14}
                    onPress={() => setPulled(!pulled)}
                />
            </View>

            {pulled && (
                coupons.map((coupon, key) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flex: 1,
                            padding: 4,
                            borderBottomColor: '#dcdcdc',
                            borderBottomWidth: 1,
                            marginVertical: 2
                        }}
                        key={key}
                    >
                        <Text
                            style={{
                                textAlign: "justify",
                                padding: 4,
                                fontSize: 12,
                                lineHeight: 16
                            }}
                        >
                            {
                                coupon.isDelivery ?
                                    `Get ${coupon.discount_type === "$"
                                        ? "$" + coupon.discount : coupon.discount + "%"} off on your delivery.` :
                                    `Get ${coupon.discount_type === "$"
                                        ? "$" + coupon.discount
                                        : coupon.discount} off on ${coupon.plan_name || "all meals"}.`
                            }
                            {"\n"}Use Code
                            <Text style={{ fontWeight: "bold", marginLeft: 4 }}>
                                {" "}{coupon.promo_code}.
                            </Text>
                        </Text>
                        <Button mode="text" color="#ff6600" onPress={() => applyCoupon(key)}>
                            {applied[key] ? "APPLIED" : "APPLY"}
                        </Button>
                    </View>
                ))
            )
            }
        </View>
    )
}