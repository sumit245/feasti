import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Dimensions,
    Platform,
    Alert,
    StatusBar,
} from "react-native";
import { IconButton, Provider } from "react-native-paper";
import BackButton from "../utility/BackButton";
import { useSelector, useDispatch } from "react-redux";
import * as MailComposer from "expo-mail-composer"
import axios from "axios";
import { MAIL_URL } from "../../../services/EndPoints";
const DARKGRAY = "#777";


export default function Contacts({ navigation }) {
    const { user } = useSelector(state => state.reducer)
    const [info, setInfo] = useState({
        receipient: "support@feasti.com",
        subject: "",
        user_name: "",
        user_id: "",
        email_id: "",
        phone: "",
        body: "",
    });

    const sendEmail = async () => {
        const mail = {
            sender: info.email_id,
            receipient: info.receipient,
            subject: info.subject,
            body: info.body,
            id: info.user_id,
            sender_name: info.user_name,
            phone: info.phone,
            label: "user",
        };
        const response = await axios.post(`${MAIL_URL}`, mail);
        MailComposer.composeAsync({
            subject: info.subject,
            recipients: [info.receipient],
            body: info.body
        })
        Alert.alert(
            `Delivered`,
            "Your message has been sent to the admin. They will contact you soon!!",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ])
    }
    const deleteMsg = () => {
        Alert.alert(
            "Are you Sure?",
            "Your message will be discarded",
            [{
                text: "Cancel",
                style: "cancel"
            },
            { text: "OK", onPress: () => navigation.goBack() }
            ])
    }
    useEffect(() => {
        let componentMount = true
        if (componentMount) {
            const { email_id, user_id, user_name, phone } = JSON.parse(user)
            setInfo(info => ({
                ...info,
                email_id,
                user_id,
                user_name,
                phone
            }))
        }
        return () => {
            componentMount = false
        }
    }, [user])

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 8,
                        elevation: 1,
                    }}
                >
                    <View style={{ marginLeft: 8, flexDirection: 'row', alignItems: "center" }}>
                        <BackButton navigation={navigation} />
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Compose</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            padding: 4,
                        }}
                    >

                        <IconButton icon="send" color="#126e72" onPress={sendEmail} />
                        <IconButton icon="delete" color="#ef2145" onPress={deleteMsg} />
                    </View>
                    {/* buttons */}
                </View>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        <View style={{ marginVertical: 4 }}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>From:</Text>
                                <Text
                                    style={[styles.inputContainer, { flex: 1, color: "#777" }]}
                                >
                                    {info.email_id}
                                </Text>
                            </View>
                        </View>
                        {/* From */}

                        <View style={{ marginVertical: 4 }}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>To:</Text>
                                <Text
                                    style={[
                                        styles.inputContainer,
                                        { flex: 1, marginLeft: "10%", color: "#777" },
                                    ]}
                                >
                                    {info.receipient}
                                </Text>
                            </View>
                        </View>
                        {/* To */}

                        <View style={{ marginVertical: 16 }}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Subject</Text>
                            </View>
                            <TextInput
                                value={info.subject}
                                selectionColor="#ff6600"
                                // underlineColorAndroid="#ff6600"
                                style={[styles.inputContainer, { marginTop: 12 }]}
                                onChangeText={(text) => setInfo({ ...info, subject: text })}
                            />
                        </View>
                        {/* Subject */}

                        <View style={{ marginVertical: 16 }}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Desciption</Text>
                            </View>
                            <TextInput
                                value={info.body}
                                placeholder="Write a description in maximum 250 characters"
                                placeholderTextColor="#777"
                                multiline
                                selectionColor="#ff6600"
                                textAlignVertical="top"
                                style={[
                                    styles.inputContainer,
                                    {
                                        textAlignVertical: "top",
                                        borderColor: "#777",
                                        borderWidth: 0.5,
                                        borderRadius: 2,
                                        height: 350,
                                        padding: 4,
                                    },
                                ]}
                                numberOfLines={10}
                                onChangeText={(text) => setInfo({ ...info, body: text })}
                            />
                        </View>
                        {/* Body */}
                    </View>
                </ScrollView>

            </SafeAreaView>
        </Provider>
    );
}
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 4,
        borderColor: "#777",
        borderWidth: 0.2,
        marginVertical: 2,
        padding: 4,
        borderRadius: 4,
        backgroundColor: "#fff",
    },

    container: {
        backgroundColor: "#FFF",
        padding: 2,
        flex: 1,
        height: "100%",
        justifyContent: "space-between",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 8
    },
    inputContainer: {
        borderBottomWidth: 0.2,
        borderBottomColor: DARKGRAY,
        fontSize: 16,
        marginHorizontal: "4%",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "4%",
        marginTop: 8,
        marginVertical: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
