import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import AboutUs from "./Components/about/AboutUs";
import Terms from "./Components/about/Terms";
import HeaderSimple from "./Components/home/headerTop/HeaderSimple";

export default function About({ navigation }) {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        {
            key: "tnc",
            title: "Terms & Conditions",
        },
        {
            key: "privacy",
            title: "Privacy",
        },
    ]);
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            style={{
                marginBottom: 8,
                backgroundColor: "transparent",
            }}
            activeColor="#ff6600"
            labelStyle={{ fontWeight: "bold" }}
            inactiveColor="#272727"
            indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 12 }}
        />
    );
    const renderScene = ({ route }) => {
        switch (route.key) {
            case "tnc":
                return <Terms />
            case "privacy":
                return (
                    <AboutUs />
                );
            default:
                break;
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderSimple navigation={navigation} title="About Us" />
            <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
}