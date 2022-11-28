import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    ImageBackground,
    View,
    TouchableOpacity,
} from "react-native";
import { styles } from "../../styles/HomeStyle";
import HeaderTwo from "../home/headerTop/HeaderTwo";



export default function Thankyou({ route, navigation }) {
    const { plan_name, start_date, category, time } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <HeaderTwo navigation={navigation} title="Order Placed!" />
            <ImageBackground
                source={require("../../../../assets/order_placed.gif")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
            >
                <View>
                    <Text style={styles.title}>
                        Thank you for ordering!!!
                    </Text>
                    <Text style={{ textAlign: "center", lineHeight: 20 }}>
                        Do not look into your kitchen, we will provide meals till your
                        subscription.
                    </Text>
                    <Text
                        style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", lineHeight: 20, marginTop: 12 }}
                    >
                        {plan_name}subscription will start from
                        {"\n" + start_date}.
                    </Text>
                    <Text
                        style={{ color: "#777", fontWeight: "bold", textAlign: "center", marginTop: 8 }}
                    >
                        We have assigned delivery executive to your orders. Your{" "}
                        {category} will be delivered to you by {time} every
                        Monday-Sunday
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}