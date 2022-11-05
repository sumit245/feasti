import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { avatarSize, styles, width } from './styles/HomeStyle'
import HeaderTop from './Components/chefdetails/HeaderTop'
import Icon from "react-native-vector-icons/Ionicons"
import { TabView, TabBar } from "react-native-tab-view";
import MenuItem from "./Components/chefdetails/MenuItem";
import PlanChooser from './Components/chefdetails/PlanChooser'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByID } from '../services/actions/retaurantsAction'

export default function ChefDetails({ route, navigation }) {
    const { title, restaurant_id, item, promo, distance } = route.params
    const [review, setReview] = useState([]);
    const [index, setIndex] = useState(0)
    const [restaurant, setRestaurant] = useState({})
    const dispatch = useDispatch()
    const { tempRestaurant, nearByRestaurant } = useSelector((state) => state.restaurantReducer)
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
    const fetchReview = async () => {
        const response = await axios.get(
            "http://54.146.133.108:5000/api/review/"
        );
        const { data } = response;
        let review = data.filter((item) => item.restaurant_id === restaurant_id);
        setReview(review);
    };
    useEffect(() => {
        fetchReview();
    }, []);

    const getchefbynameandupdatemenucount = async (restaurant_id) => {
        let MENU_COUNT_URL =
            "http://54.146.133.108:5000/api/chefdashboard/getchefbynameandupdatemenucount/" +
            restaurant_id;
        const response = await axios.get(MENU_COUNT_URL);
    };

    const getChefByID = async () => {
        const restaurant = await getRestaurantByID(restaurant_id, nearByRestaurant)
        setRestaurant(restaurant)
    }

    useEffect(() => {
        getChefByID()
    }, [])


    useEffect(() => {
        getchefbynameandupdatemenucount(restaurant_id);

    }, [restaurant_id]);

    const {
        restaurant_name,
        meals,
        documents,
        rating,
        meal_type,
        category,
        about,
    } = item;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderTop navigation={navigation} title={title} id={restaurant_id} distance={distance} />
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
                    onPress={() =>
                        Actions.push("reviews", { restaurant_id: restaurant_id })
                    }
                    style={styles.ratingAndReviews}
                >
                    <Icon name="star" color="#ff6600" />
                    <Text
                        style={{
                            marginHorizontal: 2,
                            color: "#ff6600",
                            fontWeight: "bold",
                        }}
                    >
                        {rating || "5" + "/5 | "}
                        <Text style={{ color: "#226ccf", textDecorationLine: "underline" }}>
                            {" "}
                            Reviews ({review.length || 0})
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

                <PlanChooser navigation={navigation} restaurant_id={restaurant_id} />
                <Text style={styles.headerText}>About us </Text>
                <View style={styles.about}>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>{about}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}