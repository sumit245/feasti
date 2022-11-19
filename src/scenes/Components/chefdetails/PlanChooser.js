import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../../styles/HomeStyle"
import { LinearGradient } from "expo-linear-gradient";
import { getRestaurantByID } from "../../../services/actions/retaurantsAction"
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPlan, setDeliverySlots } from "../../../services/actions/checkoutAction";
export default function PlanChooser({ restaurant_id, navigation, category }) {
    const { nearByRestaurant } = useSelector(state => state.restaurantReducer)
    const dispatch = useDispatch()
    const getPlan = async (plan_name, base_price, customer_price, delivery_fee, index) => {
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
        console.log(restaurant)
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
                                {price.delivery_price && <Text style={{ fontSize: 12 }}>Delivery Charge: ${parseFloat(price.delivery_price).toFixed(2)}</Text>}
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