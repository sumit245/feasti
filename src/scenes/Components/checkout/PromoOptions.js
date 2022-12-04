import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import { useSelector, useDispatch } from "react-redux";
import { setCouponDiscount } from "../../../services/actions/checkoutAction";
import { styles } from "../../styles/HomeStyle"

export default function PromoOptions() {
    const { allCoupons, isDelivery, delivery_fee } = useSelector(state => state.checkoutReducer)
    const [coupons, setCoupons] = useState([])
    const [pulled, setPulled] = useState(false)
    const [applied, setApplied] = useState([])
    const [couponUsed, setCouponUsed] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setCoupons(allCoupons)
        let btns = [...applied]
        allCoupons.map((coup, index) => { btns.push(false) })
        dispatch(setCouponDiscount(0))
        setApplied(btns)
    }, [allCoupons])
    const applyCoupon = async (key) => {
        let btns = [...applied]
        btns[key] = !btns[key]
        setApplied(btns)
        if (coupons[key].discount_type !== "%") {
            await dispatch(setCouponDiscount(coupons[key].discount))
        }
        if (coupons[key].isDelivery && isDelivery) {
            console.log('====================================');
            console.log('Delivery Coupon Applicable');
            console.log('====================================');
        }
        if (coupons[key].discount_type !== "%") {
            console.log('====================================');
            console.log('Percentage Coupon Applicable');
            console.log('====================================');
        }
        setCouponUsed(!couponUsed)
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
                        <Button
                            mode="text" color={applied[key] ? "#ff0000" : "#ff6600"}
                            disabled={couponUsed}
                            onPress={() => applyCoupon(key)}>
                            {applied[key] ? "Applied" : "APPLY"}
                        </Button>
                    </View>
                ))
            )
            }
        </View>
    )
}