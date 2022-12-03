import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';
import DeliveryOptions from './DeliveryOptions';
import SearchComponent from './SearchComponent';
import SortAndFilter from './SortAndFilter';
import FavoritePicker from './FavoritePicker';
import { styles, width } from "../../../styles/HomeStyle"
export default function HeaderComponent({
    favCount = 10,
    navigation,
    applyfilter,
    clearfilter,
    searchTerm,
    filterCount }) {
    const [isSearching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const setSearch = (state) => {
        setSearching(state);
    };

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    };
    return (
        <View style={!isSearching ? styles.header : styles.headerWithSearch}>
            {!isSearching ? (
                <DeliveryOptions navigation={navigation} />
            ) : (
                <Searchbar
                    placeholder="Search..."
                    style={{
                        width: width - 100,
                        backgroundColor: "#ededed",
                        elevation: 0,
                    }}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    iconColor="#000"
                    selectionColor="#ff6600"
                    clearIcon={() => null}
                    onSubmitEditing={() => searchTerm(searchQuery)}
                />
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SearchComponent setSearch={setSearch} />
                <FavoritePicker favCount={favCount} navigation={navigation} />
                <SortAndFilter
                    applyFilter={applyfilter}
                    filterCount={filterCount}
                    clearfilter={clearfilter}
                />
            </View>
        </View>
    )
}