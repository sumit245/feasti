import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function FavoritePicker({ navigation, favCount }) {
    const [count, setCount] = useState("0");
    let { user } = useSelector(state => state.reducer)
    const { favorites } = JSON.parse(user)
    useEffect(() => {
        let componentMounted = true;
        if (componentMounted) {
            setCount(favorites.length);
        }
        return () => {
            componentMounted = false;
        };
    }, [favCount]);

    return (
        <View
            style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
        >
            <Icon
                name="heart-outline"
                size={26}
                onPress={() => navigation.navigate("favorites")}
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
