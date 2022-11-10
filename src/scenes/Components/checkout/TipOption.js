import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/HomeStyle"
import { useDispatch } from "react-redux";
import { tipHandler } from "../../../services/actions/checkoutAction";

const tipOptions = [
    {
        id: 1,
        option: "1",
    },
    {
        id: 2,
        option: "5",
    },
    {
        id: 3,
        option: "10",
    },
    {
        id: 4,
        option: "Other",
    },
];

export default function TipOption() {
    const dispatch = useDispatch()

    const [isSelected, setIsSelected] = useState(false);
    const [tip, setTip] = useState(false);
    const [tip_amount, setTipAmt] = useState("");
    const selectTip = (tip) => {
        if (tip === "Other") {
            setTip(true);
            setTipAmt(tip);

        } else {
            setTip(false);
            setTipAmt(tip);
        }
    };
    const handler = async (tip) => {
        selectTip(tip);
        await dispatch(tipHandler(tip))
    };
    const renderItem = ({ item }, tip_amount) => {
        return (
            <TouchableOpacity onPress={() => handler(item.option)}>
                <LinearGradient colors={tip_amount === item.option ? ["#ff9900", "#ff6600"] : ["#fff", "transparent"]} style={styles.tipBox}>
                    <Text
                        style={{
                            color: tip_amount === item.option ? "#FFF" : "#777",
                            padding: 1,
                            fontWeight: "bold",
                        }}
                    >
                        {item.id !== 4 && "$"}
                        {item.option}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        );
    };
    return (
        <View style={styles.optionCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="gift-outline" size={24} color="#ff6600" />
                <Text
                    style={[styles.optionsLabels, { marginHorizontal: 4, fontSize: 16 }]}
                >
                    Tip your hunger saviour{" "}

                </Text>
            </View>
            <Text style={styles.tipText}>
                Thank your delivery partner for helping you stay safe indoors. Support
                them through these tough times with a tip.
            </Text>
            <FlatList
                horizontal
                contentContainerStyle={{
                    margin: 12,
                    marginHorizontal: 20,
                    alignItems: "center",
                }}
                data={tipOptions}
                renderItem={(item) => renderItem(item, tip_amount)}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectTip}
            />
            {tip && (
                <TextInput
                    style={{ backgroundColor: "#fff", marginHorizontal: 20 }}
                    value={parseInt(tip_amount) || 0}
                    activeOutlineColor="#ff6600"
                    outlineColor="#ff6600"
                    underlineColor="#ff6600"
                    activeUnderlineColor="#ff6600"
                    defaultValue={0}
                    dense
                    returnKeyType="done"
                    keyboardType="numeric"
                    autoFocus={tip}
                    onChangeText={(text) => setTipAmt(text)}
                    onEndEditing={() => handler(tip_amount)}
                />
            )}
        </View>
    )
}