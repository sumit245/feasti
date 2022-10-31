import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles/HomeStyle'
import HeaderTop from './Components/chefdetails/HeaderTop'

export default function ChefDetails({ route, navigation }) {
    const { title, restaurant_id } = route.params
    useEffect(() => {
        console.log('====================================');
        console.log(title, restaurant_id);
        console.log('====================================');
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderTop navigation={navigation} title={title} id={restaurant_id} />
        </SafeAreaView>
    )
}