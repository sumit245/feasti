import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteRestaurant } from "../../../../services/actions/retaurantsAction";

export default function FavoritePicker({ navigation }) {
    const [count, setCount] = useState("0");
    const dispatch = useDispatch()
    let { user } = useSelector(state => state.reducer)

    useEffect(() => {
        let componentMounted = true;
        if (componentMounted) {
            const { favorite } = user
            setCount(favorite.length);
        }
        return () => {
            componentMounted = false;
        };
    }, [user]);

    const getFavoriteRestaurants = async () => {
        const { _id } = JSON.parse(user)
        await dispatch(getFavoriteRestaurant(_id))
        navigation.navigate("favorites")
    }

    return (
        <View
            style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
        >
            <Icon
                name="heart-outline"
                size={26}
                onPress={() => getFavoriteRestaurants()}
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
