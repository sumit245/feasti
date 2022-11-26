import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from "../../styles/HomeStyle"
import BackButton from '../utility/BackButton'
import Icon from "react-native-vector-icons/Ionicons"

export default function HeaderTop({ navigation, title, papers, distance }) {
    return (
        <View style={styles.header} >
            <BackButton navigation={navigation} />
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.headerText, { padding: 0 }]}>{title}</Text>
                <Text style={{ fontSize: 12 }}> <Icon name="location-outline" />{parseFloat(distance).toFixed(1)} km away</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("documents", { papers: papers }) }}>
                <Icon
                    name="images-outline"
                    size={24}
                    style={{ margin: 2, marginRight: 5 }}
                />
            </TouchableOpacity>
        </View>
    )
}