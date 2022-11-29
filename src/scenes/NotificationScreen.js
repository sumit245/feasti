import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Card } from "react-native-paper";
import HeaderSimple from "../scenes/Components/home/headerTop/HeaderSimple"

export default function NotificationScreen({ navigation }) {
    const [isSwitchOn, setSwitch] = useState(false)
    const onToggleSwitch = () => {
        setSwitch(!isSwitchOn)
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple navigation={navigation} title="Manage Notification" />
            <ScrollView style={styles.scrollView}>
                <Card style={styles.notifCard}>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <Text style={styles.notificationTitle}>Push Notifications</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: isSwitchOn ? "#ff9900" : "#525",
                                marginLeft: 80,
                                padding: 2,
                                alignItems: "center",
                                paddingHorizontal: 6,
                                borderRadius: 4,
                            }}
                            onPress={onToggleSwitch}
                        >
                            <Text style={{ fontSize: 16, color: "#fff" }}>{isSwitchOn ? "OFF" : "ON"}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.notificationSubTitle}>
                        Tap to enable notifications
                    </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        height: 50,
        elevation: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    appHeader: {
        fontWeight: "bold",
        fontSize: 20,
    },
    container: {
        backgroundColor: "#fefefe",
        flex: 1
    },
    notifCard: {
        marginVertical: 4,
        padding: 4,
        marginHorizontal: 4,
    },
    notificationTitle: {
        fontSize: 18,
        paddingHorizontal: 20,
        paddingTop: 4,
        fontWeight: "bold",
    },
    notificationSubTitle: {
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 4,
        color: "#777",
    },
    notificationFooter: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingTop: 4,
        justifyContent: "space-between",
        alignItems: "center",
    },
});
