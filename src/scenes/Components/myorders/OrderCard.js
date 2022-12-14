import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Redo from "react-native-vector-icons/FontAwesome5";
import NewsPaper from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { styles } from "../../styles/HomeStyle";
import axios from "axios";
import { GET_CHEF_FROM_BANNER, GET_ORDER_DETAILS, ORDER_URL } from "../../../services/EndPoints";
import { checkHasReview } from "../../../services/actions/actions";

export default function OrderCard({ item, navigation }) {
    const findAndRate = async () => {
        const { user_id, user_name, order_id, restaurant_id, order_time, plan_name, base_price, start_date, end_date } = item
        const hasReview = await checkHasReview(user_id, order_id)
        if (!hasReview) {
            navigation.navigate('rate_order', {
                user_id,
                user_name,
                order_id,
                restaurant_id,
                order_time,
                plan_name,
                base_price,
                start_date,
                end_date
            })
        } else {
            Alert.alert('Warning', 'You have already placed review for this order', [{ text: "OK" }])
        }
    }
    const getChefByIdAndNavigate = async (id) => {
        const response = await axios.get(`${GET_CHEF_FROM_BANNER}${id}`)
        const restaurant = response.data
        const { restaurant_name, _id, restaurant_id, category } = restaurant
        navigation.navigate("chef_details", {
            title: restaurant_name,
            restaurant_id: _id,
            distance: 3,
            id: restaurant_id,
            category,
            item: restaurant,
        });
    }
    const openReceipt = async (id) => {
        const response = await axios.get(`${GET_ORDER_DETAILS}${id}`)
        const order = response.data
        navigation.navigate('order_details', { order, title: order.order_id })

    }
    return (
        <Card style={{ padding: 10, margin: 4 }} key={item.order_id}>
            <Card.Content>
                <View style={styles.optionrow}>
                    <Text style={[styles.title, { color: "#000" }]}>#{item.order_id}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.orderStatus, { color: item.color }]}>{item.status}</Text>
                        <Text style={{ fontSize: 11 }}>( {item.isDelivery ? "Delivery" : "Pickup"} )</Text>
                    </View>
                </View>

                <View style={styles.optionrow}>
                    <View />
                    <Text>{moment(item.order_time).format("DD-MMM-YYYY")}</Text>
                </View>

                <View style={styles.optionrow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Avatar.Image
                            size={40}
                            source={{ uri: item.restaurant_image }}
                        />
                        <View style={{ marginLeft: 4 }}>
                            <Text style={styles.title}>{item.restaurant}</Text>
                            <Text style={{ fontSize: 12 }}>{item.plan_name}</Text>
                        </View>
                    </View>
                    <Text style={[styles.title, { fontSize: 16 }]}>${parseFloat(item.total).toFixed(2)}</Text>
                </View>

            </Card.Content>
            <Card.Actions style={{ justifyContent: "space-between" }}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: "#ccc" }]}
                        onPress={() => openReceipt(item.order_id)}
                    >
                        <NewsPaper name="newspaper" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <Text>Receipt</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: "#ff4600" }]}
                        onPress={findAndRate}
                    >
                        <Icon name="ios-star" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <Text>Rate</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: "green" }]}
                        onPress={() => getChefByIdAndNavigate(item.restaurant_id)}
                    >
                        <Redo name="redo-alt" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <Text>Reorder</Text>
                </View>
            </Card.Actions>
        </Card>
    )
}