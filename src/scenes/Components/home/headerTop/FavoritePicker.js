import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

export default function FavoritePicker({ navigation, favCount }) {
    const [count, setCount] = useState("0");
    const dispatch = useDispatch()
    let { user } = useSelector(state => state.reducer)
    useEffect(() => {
        let componentMounted = true;
        if (componentMounted) {
            const { favorite } = JSON.parse(user)
            setCount(favorite.length);
        }
        return () => {
            componentMounted = false;
        };
    }, [favCount]);

    const getFavoriteRestaurant = async () => {
        await dispatch(getFavoriteRestaurant())
        navigation.navigate("favorites")
    }

    return (
        <View
            style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
        >
            <Icon
                name="heart-outline"
                size={26}
                onPress={() => getFavoriteRestaurant()}
            />
            {count > 0 && (
                <View style={{ marginTop: -6, marginLeft: -10 }}>
                    <Badge
                        size={16}
                        style={{ backgroundColor: "#ff6600", fontWeight: "bold", color: "#fff" }}
                    >
                        {count}
                    </Badge>
                </View>
            )}
        </View>
    );
}
