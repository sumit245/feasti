import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../../styles/HomeStyle"
import { LinearGradient } from "expo-linear-gradient";
import { getRestaurantByID } from "../../../services/actions/retaurantsAction"
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPlan, saveAllCoupons, setDeliverySlots } from "../../../services/actions/checkoutAction";
export default function PlanChooser({ restaurant_id, navigation, category, coupon, isDelivery }) {
    const { nearByRestaurant } = useSelector(state => state.restaurantReducer)
    const { coupons } = useSelector(state => state.restaurantReducer)
    const dispatch = useDispatch()

    const getPlan = async (plan_name, base_price, customer_price, delivery_fee, index) => {
        let chefCoupon = Array.isArray(coupon) ? coupon[0] : null
        let savedCoupons = [...coupons]
        console.log(savedCoupons);
        let myCoupon = savedCoupons.find((coupon) => coupon.isDelivery === true)
        if (!isDelivery) {
            savedCoupons.splice(savedCoupons.indexOf(myCoupon), 1)
        }
        if (chefCoupon !== null) {
            if (chefCoupon.plan_name === plan_name) {
                savedCoupons.push(chefCoupon)
                dispatch(saveAllCoupons(savedCoupons))
            }
            else {
                dispatch(saveAllCoupons(savedCoupons))
            }
        } else {
            dispatch(saveAllCoupons(savedCoupons))
        }
        await dispatch(getSelectedPlan(plan_name, base_price, customer_price, delivery_fee, index))
        await dispatch(setDeliverySlots(category))

        navigation.navigate("checkout", {
            restaurant_id: restaurant_id,
            category: category
        });

    };

    const [pricing, setPricing] = useState([])

    const getChefByID = async () => {
        const restaurant = await getRestaurantByID(restaurant_id, nearByRestaurant)
        setPricing(restaurant.price_plans)
    }

    useEffect(() => {
        getChefByID()
    }, [])

    return (
        <>
            <Text style={styles.headerText}>Choose your plan</Text>
            {
                Array.isArray(pricing) && pricing.map((price, index) => (
                    <Card style={styles.planCard} key={index}>
                        <View style={styles.planBody}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{price.plan_name}</Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        paddingVertical: 2,
                                    }}
                                >
                                    ${parseFloat(price.customer_price).toFixed(2)}
                                </Text>
                                {parseFloat(price.delivery_price) > 0 && <Text style={{ fontSize: 12 }}>Delivery Charge: ${parseFloat(price.delivery_price).toFixed(2)}</Text>}
                            </View>

                            <TouchableOpacity
                                onPress={() => getPlan(price.plan_name, price.base_price, price.customer_price, price.delivery_price, index)}>
                                <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.selectoffer} >
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}
                                    >
                                        CHOOSE
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Card>
                ))
            }
        </>
    )
}