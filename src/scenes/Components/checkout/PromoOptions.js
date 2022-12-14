import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import { useSelector, useDispatch } from "react-redux";
import { setCouponDiscount, SET_DELIVERY_FEE } from "../../../services/actions/checkoutAction";
import { styles } from "../../styles/HomeStyle"

export default function PromoOptions() {
    const { allCoupons, isDelivery, delivery_fee, customer_price } = useSelector(state => state.checkoutReducer)
    const [coupons, setCoupons] = useState([])
    const [pulled, setPulled] = useState(false)
    const [applied, setApplied] = useState([])
    const [couponUsed, setCouponUsed] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setCoupons(allCoupons)
        let btns = [...applied]
        allCoupons.map((coup, index) => { btns.push(false) })
        dispatch(setCouponDiscount(0, "", ""))
        setApplied(btns)
    }, [ coupons])

    const applyCoupon = async (key) => {
        let btns = [...applied]
        btns[key] = !btns[key]
        setApplied(btns)
        const { discount, promo_code, promo_id } = coupons[key]
        if (coupons[key].discount_type !== "%") {
            await dispatch(setCouponDiscount(discount, promo_code, promo_id))
        }
        if (coupons[key].isDelivery && isDelivery) {
            let disc = parseFloat(delivery_fee) * parseFloat(discount) * 0.01
            await dispatch(setCouponDiscount(disc, promo_code, promo_id))
        }
        if (coupons[key].discount_type === "%") {
            let disc = parseFloat(customer_price) * parseFloat(discount) * 0.01
            await dispatch(setCouponDiscount(disc, promo_code, promo_id))
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