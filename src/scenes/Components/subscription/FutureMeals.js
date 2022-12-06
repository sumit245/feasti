import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native'
import { TabBar, TabView } from "react-native-tab-view";
import CurrentMeal from "./CurrentMeal";
import { width } from "../../styles/HomeStyle";
export default function FutureMeals({ meals, futuredays }) {
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([])

    const [routes] = useState([
        { key: "first", title: futuredays[0] },
        { key: "second", title: futuredays[1] },
        { key: "third", title: futuredays[2] }

    ]);

    useEffect(() => {
        setLoading(false)
        setData(meals)
        setLoading(true)
    }, [meals,loading])


    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ width: width / 3.3, flexDirection: 'row' }}
            scrollEnabled
            style={{
                backgroundColor: "transparent",
                //   flexDirection: 'row',

            }}
            indicatorContainerStyle={{ flexDirection: 'row' }}
            contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
            activeColor="#ff6600"
            labelStyle={{ fontWeight: "bold" }}
            inactiveColor="#272727"
            indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 2 }}
        />
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <CurrentMeal index={route.key} meal={data.find((o) => o.day === route.title)} />;
            case "second":
                return <CurrentMeal index={route.key} meal={data.find((o) => o.day === route.title)} />;
            case "third":
                return <CurrentMeal index={route.key} meal={data.find((o) => o.day === route.title)} />;
            default:
                break;
        }
    }
    if (!loading) { return (<Text>...</Text>) }
    return (
        <View style={{ height: 300 }}>
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