import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '../../utility/BackButton'

export default function HeaderTwo({ navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 48, justifyContent: 'space-between', marginHorizontal: 2 }}>
            <BackButton navigation={navigation} />
            <Text style={{ textAlign: 'center', fontSize: 20, color: "#000", fontWeight: 'bold' }}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                <Text
                    style={{
                        textTransform: "uppercase",
                        color: "#FF6600",
                        fontWeight: "bold",
                        marginRight: 8
                    }}
                >
                    Done{" "}
                </Text>

            </TouchableOpacity>
        </View>
    )
}