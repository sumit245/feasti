import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, View, Text, RefreshControl } from "react-native";
import { styles } from './styles/HomeStyle'
import NoOrders from "./Components/myorders/NoOrders"
import OrderHeader from "./Components/myorders/OrderHeader"
import OrderCard from "./Components/myorders/OrderCard"
import { useDispatch, useSelector } from 'react-redux';

export default function OrderScene({ navigation }) {
    const { myOrders } = useSelector(state => state.orderReducer)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const onRefresh = () => { }
    const renderItem = ({ item }) => <OrderCard item={item} navigation={navigation} />;

    useEffect(() => {
        setData(myOrders)
    }, [myOrders])


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        colors={["#f00", "#0f0", "#00f"]}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={() => <NoOrders navigation={navigation} />}
                ListHeaderComponent={() => <OrderHeader />}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item) => item._id}
            />
        </SafeAreaView>
    )
}