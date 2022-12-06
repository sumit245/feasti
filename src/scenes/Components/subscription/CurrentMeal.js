import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/Ionicons";

export default function CurrentMeal({ meal, index }) {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [meal_name, setMealName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("veg")
    useEffect(() => {
        setLoading(false)
        console.log('====================================');
        console.log(meal);
        console.log('====================================');
        // setMealName(meal.meal_name)
        // setImage(meal.image)
        // setDescription(meal.description)
        // setType(meal.type)
        // setLoading(true)
    }, [meal])

    if (!loading) { return (<Text>...</Text>) }
    return (
        <View style={{ paddingHorizontal: 2, marginHorizontal: 2 }}>
            <Image
                source={image ? { uri: image } : null}
                style={{ width: "98%", height: 150 }}
            />
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                }}
            >
                <Icon
                    name="stop-circle"
                    size={18}
                    color={type === "veg" ? "#0f0" : "#f00"}
                />
                <View style={{ width: "90%" }}>
                    <Text style={styles.title}>{meal_name}</Text>
                    <Text style={[styles.subtitle, { fontWeight: "normal" }]} numberOfLines={2}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    )
}