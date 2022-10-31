import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
// import { Favourite } from "../favourite/favourite";
import { styles, width } from "../../../styles/HomeStyle"
import axios from "axios";
import { PROFIT_URL } from "../../../../services/EndPoints";
export default function ItemCard({ item, isFavorite, isHome, navigation }) {
    const [state, setState] = useState({
        discount: "",
        discount_type: "%",
        plan_name: "",
        promo_code: "",
        hasPromo: false,
    });
    const {
        _id,
        documents,
        restaurant_name,
        base_2price,
        base_15price,
        base_30price,
        meal_type,
        rating,
        promo,
        about,
    } = item;

    const [plan, setPlan] = useState({});
    const { discount, discount_type, plan_name, promo_code } = state;
    useEffect(() => {
        let componentMounted = true;
        const fetchProfits = async () => {
            const response = await axios.get(PROFIT_URL);
            const { data } = response;
            if (componentMounted) {
                setPlan(data);
                if (
                    Array.isArray(promo) &&
                    promo.length !== 0 &&
                    promo[0].status === "Active"
                ) {
                    setState({
                        discount: promo[0].discount,
                        discount_type: promo[0].discount_type,
                        plan_name: promo[0].plan_name,
                        promo_code: promo[0].promo_code,
                        hasPromo: true,
                    });
                }
            }
        };
        fetchProfits();
        return () => {
            componentMounted = false;
        };
    }, [item]);

    return (
        <Card style={styles.item} key={_id}>
            <Card.Cover
                source={{ uri: Array.isArray(documents) ? documents[1].banner_image : "" }}
                style={styles.image}
                resizeMode="cover"
            />
            {/* <Favourite
                isHome={isHome}
                restaurant={item}
                isFavorite={
                    typeof isFavorite !== "boolean"
                        ? isFavorite.includes(restaurant_name)
                        : isFavorite
                }
            /> */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 2,
                    margin: 2,
                    marginVertical: 4,
                    marginBottom: 8,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Avatar.Image
                        size={40}
                        source={{
                            uri: Array.isArray(documents) ? documents[0].restaurant_image : "",
                        }}
                        style={{ marginRight: 4 }}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("chef_details", {
                                title: item.restaurant_name,
                                restaurant_id: item._id,
                                distance: item.distance,
                                item,
                                promo: state,
                            })
                        }
                    >
                        <Text style={styles.title}>
                            {restaurant_name}{" "}
                            <Icon
                                name="stop-circle"
                                size={16}
                                color={
                                    meal_type === "Veg" || meal_type === "veg" ? "green" : "red"
                                }
                            />{" "}
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

            <View style={{ flexDirection: "row", marginBottom: 4 }}>

                <View style={styles.price}>
                    <Text>1 MEAL</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {"$" + (parseFloat(base_2price) + parseFloat(plan.twoPlan))}
                    </Text>
                </View>
                <View style={styles.price}>
                    <Text>2 MEALS</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {"$" + (parseFloat(base_2price) + parseFloat(plan.twoPlan))}
                    </Text>
                </View>
                <View style={styles.price}>
                    <Text>7 MEALS</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {"$" + (parseFloat(base_15price) + parseFloat(plan.fifteenPlan))}
                    </Text>
                </View>
                <View style={[styles.price, { borderRightWidth: 0 }]}>
                    <Text>15 MEALS</Text>
                    <Text style={{ fontWeight: "bold" }}>
                        {"$" + (parseFloat(base_30price) + parseFloat(plan.thirtyPlan))}
                    </Text>
                </View>
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
