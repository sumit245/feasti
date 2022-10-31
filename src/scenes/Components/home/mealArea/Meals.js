import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ItemCard from "./ItemCard";

export default function Meals({ restaurant, navigation }) {
    const [isFavorite, setisFavorite] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // useEffect(() => {
    //     let unmounted = false;
    //     setLoading(true);
    //     getUser("user")
    //         .then((res) => {
    //             let favorites = res.data.favorite;
    //             let myfavorite = [];
    //             for (let i = 0; i < favorites.length; i++) {
    //                 for (let j = 0; j < restaurant.length; j++) {
    //                     if (favorites[i] === restaurant[j].restaurant_name) {
    //                         myfavorite.push(restaurant[j].restaurant_name);
    //                         if (!unmounted) {
    //                             setLoading(false);
    //                         }
    //                     }
    //                 }
    //             }
    //             setisFavorite(myfavorite);
    //         })
    //         .catch((err) => {
    //             if (!unmounted) {
    //                 setLoading(false);
    //             }
    //         });
    //     return () => {
    //         unmounted = true;
    //     };
    // }, [loading]);

    const renderItem = ({ item, index }, isFavorite) => (
        <ItemCard key={index} item={item} isFavorite={isFavorite} navigation={navigation} />
    );

    return (
        <FlatList
            contentContainerStyle={{ paddingBottom: 4,marginTop:4 }}
            data={restaurant}
            initialNumToRender={2}
            ListEmptyComponent={() => (
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 40,
                    }}
                >
                    <Icon name="md-sad-sharp" size={64} color="#ff9900" />

                    <Text>Oops! No restaurant found online</Text>
                    <Text>Stay Connected we are dedicated to serve you better!!</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => renderItem(item, isFavorite)}
            keyExtractor={(item, index) => 'key' + item._id + index}
        />
    );
}
