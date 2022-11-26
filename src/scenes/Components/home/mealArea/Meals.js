import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ItemCard from "./ItemCard";
import EmptyChef from "../../utility/EmptyChef";
import { useDispatch } from "react-redux";
import { setTempRestaurant } from "../../../../services/actions/retaurantsAction";

export default function Meals({ restaurant, navigation, category }) {
    const dispatch = useDispatch()
    const renderItem = ({ item }) => <ItemCard item={item} navigation={navigation} category={category} />
    const setTempRestaurants = () => {
        dispatch(setTempRestaurant(restaurant))
    }
    useEffect(() => {
        let componentMounted = true
        if (componentMounted) {
            setTempRestaurants()
        }
        return () => {
            componentMounted = false
        }
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
