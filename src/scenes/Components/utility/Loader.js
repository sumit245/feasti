import React from "react";
import { View, Text, Image } from "react-native";

export default function Loader({ msg }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../../../assets/Loader.gif")}
        style={{ height: 200, width: 200 }}
      />
      <Text style={{ fontSize: 18, color: "#777", textAlign: "center" }}>
        {msg}
      </Text>
    </View>
  );
}
