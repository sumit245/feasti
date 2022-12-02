import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { styles, width } from "../../../styles/HomeStyle"
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite } from "../../../../services/actions/actions";
export default function ItemCard({ item, navigation, category }) {
    let { user } = useSelector(state => state.reducer)

    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const [userID, setUserID] = useState("")
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
        restaurant_id,
        meal_type,
        rating,
        distance,
        about,
        price_plans,
        promo
    } = item;

    const { discount, discount_type, plan_name, promo_code, hasPromo } = state;
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            user = JSON.parse(user)
            const { _id, favorite } = user
            const isFavorite = Array.isArray(favorite) && favorite.includes(restaurant_name)
            setFavorite(isFavorite)
            setUserID(_id)
            setState(promo)
            setState({
                ...state,
                hasPromo: promo.length > 0 ? true : false
            })
        }
        return () => {
            componentMount = false
        }
    }, [user])


    const updateFavorite = async () => {
        await dispatch(addToFavorite(userID, restaurant_name))
        setFavorite(!favorite)
    }

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
                                title: restaurant_name,
                                restaurant_id: _id,
                                distance: distance,
                                id: restaurant_id,
                                category: category,
                                item,
                            })
                        }
                    >
                        <Text style={styles.title}>
                            {restaurant_name}{" "}
                            <Icon
                                name="stop-circle"
                                size={16}
                                color={meal_type === "Veg" || meal_type === "veg" ? "green" : "red"}
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
                        onPress={() => navigation.navigate("reviews")}
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
