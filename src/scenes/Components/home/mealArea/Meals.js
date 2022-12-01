import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ItemCard from "./ItemCard";
import EmptyChef from "../../utility/EmptyChef";
import { RefreshControl } from "react-native";

export default function Meals({ restaurant, navigation, category, onRefresh, refreshing }) {
    const renderItem = ({ item }) => <ItemCard item={item} navigation={navigation} category={category} />

    return (
        <FlatList
            contentContainerStyle={{ paddingBottom: 4, marginTop: 4 }}
            data={restaurant}
            initialNumToRender={2}
            ListEmptyComponent={() => (
                <EmptyChef />
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            showsVerticalScrollIndicator={false}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item, index) => 'key' + item._id + index}
        />
    );
}
