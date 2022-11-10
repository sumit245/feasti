import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import ItemCard from "./ItemCard";
import EmptyChef from "../../utility/EmptyChef";
import { useDispatch } from "react-redux";
import { setTempRestaurant } from "../../../../services/actions/retaurantsAction";

export default function Meals({ restaurant, navigation }) {
    const dispatch = useDispatch()
    const renderItem = ({ item }) => <ItemCard item={item} navigation={navigation} />

    useEffect(async () => {
        await dispatch(setTempRestaurant(restaurant))
    }, [])


    return (
        <FlatList
            contentContainerStyle={{ paddingBottom: 4, marginTop: 4 }}
            data={restaurant}
            initialNumToRender={2}
            ListEmptyComponent={() => (
                <EmptyChef />
            )}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item, index) => 'key' + item._id + index}
        />
    );
}
