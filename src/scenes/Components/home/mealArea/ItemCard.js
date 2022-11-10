import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { styles, width } from "../../../styles/HomeStyle"
export default function ItemCard({ item, navigation }) {
    const [state, setState] = useState({
        discount: "",
        discount_type: "%",
        plan_name: "",
        promo_code: "",
        hasPromo: false,
    });
    const [favorite, setFavorite] = useState(isFavorite)
    const {
        _id,
        documents,
        restaurant_name,
        meal_type,
        rating,
        about,
        price_plans,
        isFavorite
    } = item;
    const { discount, discount_type, plan_name, promo_code, hasPromo } = state;


    const updateFavorite = () => { setFavorite(!favorite) }

    return (
        <Card style={styles.item} key={_id}>
            <Card.Cover
                source={{ uri: Array.isArray(documents) ? documents[1].banner_image : "" }}
                style={styles.image}
                resizeMode="cover"
            />
            <TouchableOpacity style={styles.bookmark} onPress={updateFavorite}>
                <Icon
                    name={favorite ? "heart" : "heart-outline"}
                    color={favorite ? "#f00" : "#ff7777"}
                    size={30}
                />
            </TouchableOpacity>
            <View style={styles.chefNameAndReview} >
                <View style={{ flexDirection: "row" }}>
                    <Avatar.Image
                        size={40}
                        source={{ uri: documents[0].restaurant_image }}
                        style={{ marginRight: 4 }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("chef_details", {
                                title: item.restaurant_name,
                                restaurant_id: item._id,
                                distance: item.distance,
                                item,
                            })
                        }
                    >
                        <Text style={styles.title}>
                            {restaurant_name}{" "}
                            <Icon
                                name="stop-circle"
                                size={16}
                                color={ meal_type === "Veg" || meal_type === "veg" ? "green" : "red"}
                            />
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                textAlign: "left",
                                maxWidth: width / 1.5,
                            }}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >
                            {about}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text
                        style={{
                            color: "#ff6600",
                            fontWeight: "bold",
                        }}
                        onPress={() => Actions.push("reviews")}
                    >
                        <Icon name="star" color="#ff6600" />
                        {rating || "5"}
                        {"/5"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>{parseFloat(item.distance).toFixed(1)} km </Text>
                </View>
            </View>

            <View style={styles.pricing}>
                {
                    Array.isArray(price_plans) && price_plans.map((item, index) => (
                        <View style={styles.price} key={index}>
                            <Text>{item.plan_name}</Text>
                            <Text style={{ fontWeight: "bold" }}>
                                ${item.customer_price}
                            </Text>
                        </View>
                    ))
                }
            </View>

            {state.hasPromo && (
                <View
                    style={{
                        borderStyle: "dashed",
                        borderWidth: 1,
                        borderRadius: 2,
                        padding: 4,
                        marginTop: 4,
                    }}
                >
                    <Text style={{ textAlign: "justify", padding: 4, fontSize: 12 }}>
                        Get {discount_type === "$" ? "$" + discount : discount + "%"} off on{" "}
                        {plan_name} plan. Use Code
                        <Text style={{ fontWeight: "bold" }}> {promo_code}</Text>
                    </Text>
                </View>
            )}
            {/* </Card.Content> */}
        </Card>
    );
}
