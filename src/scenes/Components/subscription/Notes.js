import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../styles/HomeStyle"

export default function Notes({ note }) {
    const [notes, setNotes] = useState(note);
    const [pulled, setPulled] = useState(false);
    const noteHandler = () => { }
    return (
        <View style={styles.optionCard}>
           
            <View style={styles.optionrow}>
                <TextInput
                    autoFocus={pulled}
                    value={notes}
                    multiline
                    placeholder="Place the delivery at door"
                    onChangeText={setNotes}
                    onEndEditing={() => noteHandler(notes)}
                />
                <Icon
                    name={pulled ? "save" : "edit-2"}
                    size={24}
                    onPress={() => setPulled(!pulled)}
                />
            </View>
        </View>
    )
}