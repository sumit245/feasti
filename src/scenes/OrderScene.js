import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import { styles } from './styles/HomeStyle'
import NoOrders from "./Components/myorders/NoOrders"
import OrderHeader from "./Components/myorders/OrderHeader"
import OrderCard from "./Components/myorders/OrderCard"
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../services/actions/orderActions';

export default function OrderScene({ navigation }) {
    const { myOrders } = useSelector(state => state.orderReducer)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const onRefresh = () => {
        setLoading(true)
        setData(myOrders)
        setLoading(false)
    }
    const renderItem = ({ item }) => <OrderCard item={item} navigation={navigation} />;
    
    useEffect(() => {
        dispatch(getMyOrders())
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