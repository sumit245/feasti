import React, { useState, useCallback, useRef } from "react";
import { FlatList, RefreshControl, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import NoSubscription from "./Components/subscription/NoSubscription";
import SubscriptionItem from "./Components/subscription/SubscriptionItem";
import { ITEM_SIZE, styles, width } from "./styles/HomeStyle";


export default function SubscriptionScene({ navigation }) {
    const [loading, setLoading] = useState(false);
    const { subscription } = useSelector(state => state.orderReducer)
    const flatref = useRef()
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        setLoading(true)
        wait(2000).then(() => setLoading(false));
    }, [])

    const renderItem = ({ item }) => <SubscriptionItem item={item} navigation={navigation} />

    return (
        <SafeAreaView style={styles.container}
        //     refreshControl={
        //     <RefreshControl refreshing={!loading} colors={["#f00", "#0f0", "#00f"]} onRefresh={onRefresh} />
        // }
        >
            <FlatList
                horizontal
                pagingEnabled
                ListEmptyComponent={() => <NoSubscription navigation={navigation} />}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={[]}
                ref={flatref}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item) => item._id}

            />
        </SafeAreaView>
    )
}