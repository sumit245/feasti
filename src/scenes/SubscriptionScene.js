import axios from "axios";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View,FlatList, RefreshControl, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { ORDER_URL, SUBSCRIPTION_URL } from "../services/EndPoints";
import NoSubscription from "./Components/subscription/NoSubscription";
import SubscriptionItem from "./Components/subscription/SubscriptionItem";
import { ITEM_SIZE, styles, width } from "./styles/HomeStyle";


export default function SubscriptionScene({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState([])
    const { user } = useSelector(state => state.reducer)
    const { user_id } = JSON.parse(user)
    const flatref = useRef()

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        setLoading(true)
        wait(2000).then(() => setLoading(false));
    }, [])
    const fetchSubscriptions = async () => {
        setLoading(true)
        const response = await axios.get(`${SUBSCRIPTION_URL}${user_id}`)
        const {mySubscription} = response.data
        setSubscription(mySubscription)
        setLoading(false)
    }
    useEffect(() => {
        fetchSubscriptions()
    }, [user])


    const renderItem = ({ item }) => (
        <View style={{flexDirection:'column'}}>
        <SubscriptionItem item={item} navigation={navigation} />
        </View>
    )

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
                data={subscription}
                ref={flatref}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item) => item._id}

            />
        </SafeAreaView>
    )
}