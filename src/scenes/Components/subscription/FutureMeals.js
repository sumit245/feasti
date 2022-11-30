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
            tabStyle={{ width: width / 3 }}
            scrollEnabled
            style={{
                backgroundColor: "transparent",
                flexDirection: 'row'
            }}
            contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}
            activeColor="#ff6600"
            labelStyle={{ fontWeight: "bold" }}
            inactiveColor="#272727"
            indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 2 }}
        />
    );

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "second":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "third":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "fourth":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "fifth":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "sixth":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            case "seventh":
                return <CurrentMeal index={route.key} meal={meals.find((o) => o.day === route.title)} />;
            default:
                break;
        }
    }


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