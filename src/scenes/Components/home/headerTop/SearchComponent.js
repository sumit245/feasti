import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchComponent({ search, setSearch }) {
    const [searching, setSearching] = useState(true);
    const isSearching = () => {
        setSearching(!searching);
        setSearch(searching);

    };
    return (
        <View>
            {searching ? (
                <TouchableOpacity onPress={isSearching}>
                    <Icon name="search" size={24} color="#000" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={isSearching}>
                    <Icon name="close" size={24} color="#ff6c22" />
                </TouchableOpacity>
            )}
        </View>
    );
}
