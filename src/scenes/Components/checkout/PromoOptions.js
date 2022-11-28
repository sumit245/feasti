import React, { Component, useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import { styles } from "../../styles/HomeStyle"

export default function PromoOptions() {
    const [coupons, setCoupons] = useState([])
    const [pulled, setPulled] = useState(false)
    const [applied, setApplied] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
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
                <View>
                    {
                        isAdmin && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    flex: 1,
                                }}
                            >
                                <Text style={{ textAlign: "justify", padding: 4, fontSize: 12 }}>
                                    {" " + adminCoupon.split(".")[0] + "\n" + adminCoupon.split(".")[1]}
                                </Text>

                                <Button mode="text" color="#ff6600" onPress={this.applyAdminCoupon}>
                                    {adminApplied ? "APPLIED" : "APPLY"}
                                </Button>
                            </View>
                        )}
                    {
                        coupons !== null && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{ textAlign: "justify", padding: 4, fontSize: 12 }}
                                >
                                    Get{" "}
                                    {coupons.discount_type === "$"
                                        ? "$" + coupons.discount
                                        : coupons.discount + "%"}{" "}
                                    off on {coupons.plan_name} plan.
                                    {"\n"}Use Code
                                    <Text style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {coupons.promo_code}
                                    </Text>
                                </Text>
                                <Button mode="text" color="#ff6600" onPress={this.applyCoupon}>
                                    {applied ? "APPLIED" : "APPLY"}
                                </Button>
                            </View>
                        )}
                </View>
            )
            }
        </View>
    )
}