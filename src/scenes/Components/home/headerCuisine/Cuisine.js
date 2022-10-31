import { View, Text, Image } from "react-native";
import { styles } from "../../../styles/HomeStyle";
import React from "react";

export default function Cuisine({ image, title, highLighted }) {
    return (
        <View style={styles.cuisine}>
            <Image
                source={{ uri: image }}
                style={[
                    styles.cuisineContent,
                    { borderColor: highLighted ? "#ff6600" : "#fff" },
                ]}
                resizeMode="contain"
            />
            <Text
                style={[
                    styles.cuisine_name,
                    { fontWeight: highLighted ? "bold" : "normal", color: highLighted ? "#ff6600" : "#000" },
                ]}
            >
                {title}
            </Text>
        </View>
    );
}
