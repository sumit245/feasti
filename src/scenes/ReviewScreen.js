import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { avatarify } from "./Components/utility/helpers";
import { width } from "./styles/HomeStyle";
import { RATING_URL } from "../services/EndPoints";
import HeaderSimple from "./Components/home/headerTop/HeaderSimple"
const ReviewItem = ({ title, avatar, review }) => {
    let stars = [];
    for (let index = 0; index < parseInt(review.rating); index++) {
        stars.push(index);
    }
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <View
                    style={{
                        height: 48,
                        width: 48,
                        borderRadius: 24,
                        backgroundColor: "purple",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 8,
                    }}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
                        {avatarify(review.user_name)}
                    </Text>
                </View>

                <View>
                    <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                        {review.user_name}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: width - 100,
                            justifyContent: "space-between",
                            marginLeft: 5,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 4,
                                maxWidth: "60%",
                            }}
                        >
                            {stars.map((x, i) => (
                                <Icon
                                    name="star"
                                    color="#ff6600"
                                    size={18}
                                    style={{ padding: 2 }}
                                    key={i}
                                />
                            ))}
                        </View>

                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "#000",
                                fontSize: 12,
                                textAlign: "right",
                            }}
                        >
                            {moment(review.createdAt).format("DD MMM, YYYY")}
                        </Text>
                    </View>

                    <Text
                        style={{
                            marginLeft: -48,
                            marginVertical: 6,
                            maxWidth: width - 48,
                            textAlign: "justify",
                            flexShrink: 1,
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                        }}
                        numberOfLines={7}
                    >
                        {review.details}
                    </Text>

                    {review.comments.length > 0 ? (
                        <View
                            style={{
                                marginVertical: 16,
                                backgroundColor: "#ededed",
                                padding: 8,
                                maxWidth: "90%",
                                borderRadius: 6,
                                marginLeft: -6,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 12, marginRight: 4 }}
                                >
                                    {review.comments[0].restaurant_name}
                                </Text>
                                <View
                                    style={{
                                        paddingHorizontal: 4,
                                        padding: 1,
                                        backgroundColor: "#4464b7",
                                        borderRadius: 14,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginHorizontal: 2,
                                    }}
                                >
                                    <Text
                                        style={{ color: "#fff", fontSize: 10, textAlign: "center" }}
                                    >
                                        Replied ✔
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={{
                                    marginVertical: 6,
                                    maxWidth: "98%",
                                    flexShrink: 1,
                                    flexWrap: "wrap",
                                    alignItems: "flex-start",
                                }}
                                numberOfLines={7}
                            >
                                {review.comments[0].body}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

export default function Rewards({ route, navigation }) {
    const { restaurant_id } = route.params
    const [review, setReview] = useState([]);

    const fetchReview = async (id) => {
        const response = await axios.get(`${RATING_URL}/getmyreview/${id}`);
        const review = response.data;
        review.reverse();
        setReview(review);
    };
    useEffect(() => {
        fetchReview(restaurant_id);
    }, [restaurant_id]);
    const stars = ["1", "2", "3", "4", "5"];
    const ListHeader = () => (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                padding: 20,
                marginVertical: 12,
            }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 12 }}>
                5.0
            </Text>
            <View style={{ flexDirection: "row" }}>
                {stars.map((item, key) => (
                    <Icon
                        name="star"
                        color="#ff6600"
                        size={18}
                        style={{ padding: 2 }}
                        key={key}
                    />
                ))}
            </View>

            <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 12 }}>
                based on {review.length} reviews
            </Text>
        </View>
    );
    const renderItem = ({ item }) => <ReviewItem review={item} />;
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple title="Reviews" navigation={navigation} />
            <FlatList
                data={review}
                ListHeaderComponent={ListHeader}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    item: {
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 2,
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
    },
});
