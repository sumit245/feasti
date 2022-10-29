import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import MaterialMapView from "./MaterialMapView";
import ManualEntry from "./ManualEntry";

const { width, height } = Dimensions.get("window");
export default class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView >
            <MaterialMapView style={styles.materialMapView}/>
            <ManualEntry
              address={this.props.address}
              entryMethod={this.props.entryMethod}
              editState={this.props.editState}
              editIndex={this.props.editIndex}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  materialMapView: {
    width: width,
    height: width / 1.4,
    elevation: -2,
  },
});
