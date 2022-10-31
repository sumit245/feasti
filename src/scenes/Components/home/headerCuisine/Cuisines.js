import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux'
import { styles } from '../../../styles/HomeStyle'
import Cuisine from './Cuisine'

export default function Cuisines() {
    const [highLighted, setHighLighted] = useState(false)
    const { cuisines } = useSelector(state => state.restaurantReducer)
    const renderCuisine = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => selectCuisine(item.cuisineName)}>
                <Cuisine
                    image={item.image}
                    title={item.cuisineName}
                // highLighted={item.cuisineName === this.state.highLighted}
                />
            </TouchableOpacity>
        );

    }

    return (
        <FlatList
            contentContainerStyle={{ marginBottom: 20, marginLeft: 4 }}
            data={cuisines}
            ListHeaderComponent={() => (
                <>
                    <TouchableOpacity
                        style={[
                            styles.firstCuisine,
                            {
                                borderColor: !highLighted ? '#ff9900' : 'fff',
                            },
                        ]}
                        onPress={() => getApiData}
                    >
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