import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { styles } from "../../styles/HomeStyle"

export default function DeliveryNotes() {
    const [notes, setNotes] = useState("");
    const [pulled, setPulled] = useState(false);
    const dispatch = useDispatch()
    const noteHandler = async () => {
        await dispatch(notes)
    }
    return (
        <View style={styles.optionCard}>
            <View style={styles.optionrow}>
                <Text style={styles.optionsLabels}>Add a note</Text>
                <Icon
                    name={pulled ? "chevron-down" : "chevron-forward"}
                    size={24}
                    onPress={() => setPulled(!pulled)}
                />
            </View>
            {pulled && (
                <TextInput
                    autoFocus
                    value={notes}
                    multiline
                    placeholder="Place the delivery at door"
                    onChangeText={setNotes}
                    onEndEditing={() => noteHandler(notes)}
                />
            )}
        </View>
    )
}