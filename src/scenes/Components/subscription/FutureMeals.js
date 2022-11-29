import React, { useState } from "react";
import { View } from 'react-native'
import { TabBar, TabView } from "react-native-tab-view";
import CurrentMeal from "./CurrentMeal";
import { width } from "../../styles/HomeStyle";
export default function FutureMeals({ meals, futuredays }) {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: "first", title: futuredays[0] },
        { key: "second", title: futuredays[1] },
        { key: "third", title: futuredays[2] },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{
                backgroundColor: "transparent",
                flex: 1,
                flexDirection: 'row'
            }}
            contentContainerStyle={{ flexDirection: 'row' }}
            tabStyle={{ width: '30%' }}
            activeColor="#ff6600"
            labelStyle={{ fontWeight: "bold", color: "#000" }}
            inactiveColor="#272727"
            indicatorStyle={{
                backgroundColor: "#ff9900",
                marginHorizontal: 2,
                marginVertical: 4,
            }}
        />
    );

    const renderScene = ({ item }) => <CurrentMeal meal={meals[0]} />;


    return (
        <View style={{ height: 280 }}>
            <TabView
                lazy
                swipeEnabled
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: width }}
            />
        </View>
    )
}