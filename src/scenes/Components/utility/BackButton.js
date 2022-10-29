import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
export default function BackButton({ navigation }) {
  return (
    <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
      height: 28,
      width: 28,
      marginHorizontal: 4,
      borderRadius: 14,
    }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
