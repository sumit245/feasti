import { Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../../../styles/HomeStyle'
import Cuisine from './Cuisine'
import { getActiveRestaurants, getRestaurantByCuisine } from '../../../../services/actions/retaurantsAction'

export default function Cuisines({ setLoading }) {
    const [highLighted, setHighLighted] = useState(false)
    const [selectedCuisine, setSelectedCuisine] = useState("")
    const { cuisines } = useSelector(state => state.restaurantReducer)
    const dispatch = useDispatch()
    const selectCuisine = async (cuisineName) => {
        setLoading(true)
        setHighLighted(true)
        setSelectedCuisine(cuisineName)
        await dispatch(getRestaurantByCuisine(cuisineName))
        setLoading(false)

    }
    const fetchAllRestaurant = async () => {
        setLoading(true)
        setHighLighted(false)
        setSelectedCuisine("")
        await dispatch(getActiveRestaurants())
        setLoading(false)
    }
    const renderCuisine = ({ item }) => {
        return (
            <Cuisine
                image={item.image}
                title={item.cuisineName}
                highLighted={item.cuisineName === selectedCuisine}
                onPress={(value) => selectCuisine(value)}
            />
        );

    }

    return (
        <FlatList
            contentContainerStyle={{ marginBottom: 20, marginLeft: 4 }}
            data={cuisines}
            ListHeaderComponent={() => (
                <>
                    <TouchableOpacity style={[styles.firstCuisine, { borderColor: !highLighted ? '#ff9900' : 'fff' }]} onPress={() => fetchAllRestaurant()}>
                        <Icon name="restaurant-outline" size={20} />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.cuisine_name,
                            {
                                fontWeight: !highLighted ? 'bold' : 'normal',
                                color: !highLighted ? '#ff6600' : '#000',
                            },
                        ]}
                    >
                        All
                    </Text>
                </>
            )}
            renderItem={renderCuisine}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}