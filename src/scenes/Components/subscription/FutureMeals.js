import React, { useState, useEffect } from "react";
import {
    Animated,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Text
} from 'react-native'
import { TabView } from 'react-native-tab-view';
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
    }, [])
    useEffect(() => {
        console.log('====================================');
        console.log(index);
        console.log('====================================');
    }, [index])


    const _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            style={[styles.tabItem, { borderBottomWidth: index === i ? 2 : 0, borderBottomColor: index === i ? "#ff6600" : "#000" }]}
                            onPress={() => setIndex(i)}>
                            <Animated.Text style={[styles.tabbarLabel, { opacity, color: index === i ? "#ff6600" : "#000" }]}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }


    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <CurrentMeal meal={data.find((o) => o.day === futuredays[0])} />
            case "second":
                return <CurrentMeal meal={data.find((o) => o.day === futuredays[1])} />
            case "third":
                return <CurrentMeal meal={data.find((o) => o.day === futuredays[2])} />
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
                renderTabBar={_renderTabBar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 4,
    },
    tabbarLabel: {
        color: "#000",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 16
    }
})