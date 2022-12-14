import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { avatarSize, styles, width } from './styles/HomeStyle'
import HeaderTop from './Components/chefdetails/HeaderTop'
import Icon from "react-native-vector-icons/Ionicons"
import { TabView, TabBar } from "react-native-tab-view";
import MenuItem from "./Components/chefdetails/MenuItem";
import PlanChooser from './Components/chefdetails/PlanChooser'
import { useDispatch, useSelector } from 'react-redux'
import { getMyReview } from '../services/actions/retaurantsAction'

export default function ChefDetails({ route, navigation }) {
    const { title, restaurant_id, item, distance, id, category } = route.params
    const { reviewCounts } = useSelector(state => state.restaurantReducer)
    const dispatch = useDispatch()
    const [reviewCount, setReviewCount] = useState(0)
    const [index, setIndex] = useState(0)
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [routes] = useState([{ key: "first", title: "Monday" },
    { key: "second", title: "Tuesday" },
    { key: "third", title: "Wednesday" },
    { key: "fourth", title: "Thursday" },
    { key: "fifth", title: "Friday" },
    { key: "sixth", title: "Saturday" },
    { key: "seventh", title: "Sunday" },
    ]);
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            tabStyle={{ width: width / 3 }}
            scrollEnabled
            style={{
                backgroundColor: "transparent",
            }}
            activeColor="#ff6600"
            labelStyle={{ fontWeight: "bold" }}
            inactiveColor="#272727"
            indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 2 }}
        />
    );
    const renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "second":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "third":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "fourth":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "fifth":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "sixth":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            case "seventh":
                return <MenuItem index={route.key} meals={meals.find((o) => o.day === route.title)} />;
            default:
                break;
        }
    };
    useEffect(() => {
        setLoading(false)
        setMeals(item.meals)
        setLoading(true)
    }, [id])
    const fetchReviews = async (id) => {
        const count = await dispatch(getMyReview(id))
        setReviewCount(count)
    }
    useEffect(() => {
        fetchReviews(id)
    }, [id, reviewCounts])



    const { documents, rating, about, isDelivery } = item;
    if (!loading) { return (<ActivityIndicator animating={true} size="large" />) }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderTop
                    navigation={navigation}
                    papers={item.papers}
                    title={title}
                    id={restaurant_id}
                    distance={distance} />
                <Image
                    source={{ uri: documents[1].banner_image }}
                    style={styles.headerImage}
                />
                <Image
                    source={{ uri: documents[0].restaurant_image }}
                    style={styles.avatarImage}
                    height={avatarSize}
                    width={avatarSize}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("chef_reviews", { restaurant_id: id })}
                    style={styles.ratingAndReviews}
                >
                    <Icon name="star" color="#ff6600" />
                    <Text style={styles.ratingText} >
                        {rating || "5" + "/5 | "}
                        <Text style={{ color: "#226ccf", textDecorationLine: "underline" }}>
                            {" "}
                            Reviews ({reviewCount})
                        </Text>
                    </Text>
                </TouchableOpacity>
                <View style={{ height: 300, flex: 1 }}>
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
                <PlanChooser
                    navigation={navigation}
                    restaurant_id={restaurant_id}
                    isDelivery={isDelivery}
                    category={category} 
                    coupon={item.promo} />
                <Text style={styles.headerText}>About us </Text>
                <View style={styles.about}>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{about}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}