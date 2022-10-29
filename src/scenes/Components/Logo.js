import React, { Component } from "react";
import { View, Text } from "react-native";
export default class Logo extends Component {
  render() {
    return (
      
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
          }}
      >
              <Text style={{ color: "#fff", fontSize: 34, fontWeight: "bold" }}>
        Feasti
      </Text>
        </View>
    );
  }
}
