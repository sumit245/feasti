import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './styles/HomeStyle'
import Loader from "../scenes/Components/utility/Loader"
import { useSelector } from 'react-redux'
import ItemCard from "./Components/home/mealArea/ItemCard"
import HeaderSimple from './Components/home/headerTop/HeaderSimple'



export default function Favorites({ navigation }) {
    const [isFetching, setFetching] = useState(true);
    const [restaurant, setRestaurant] = useState([]);

    const renderItem = ({ item, index }) => (
        <ItemCard key={index} index={index} item={item} isFavorite={true} navigation={navigation} />
    );

    const onRefresh = () => {
        setFetching(true);
    };
    const { nearByRestaurant } = useSelector(state => state.restaurantReducer)

    useEffect(() => {
        let componentMounted = true;
        if (componentMounted) {
            setRestaurant(nearByRestaurant)
            setFetching(false)
        }
        return () => {
            componentMounted = false;
        };
    }, [restaurant]);

    if (isFetching) {
        return (
            <Loader msg="Please wait a while we are fetching your favourite restaurants" />
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <HeaderSimple navigation={navigation} title="My Favorites" />
                <FlatList
                    contentContainerStyle={{ paddingBottom: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={nearByRestaurant}
                    renderItem={renderItem}
                    onRefresh={() => onRefresh()}
                    refreshing={isFetching}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        )
    }
}