import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Chip, } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { addAddressToDatabase } from "../../../services/actions/addressactions";
import { height } from "../../styles/AuthStyle";

export default function ManualEntry({ address, navigation, geometry }) {
  const { user } = useSelector(state => state.reducer)
  const [id, setId] = useState("")
  const [state, setState] = useState(address)
  const [address_type, setAddressType] = useState("home")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const selectChip = (chip) => {
    setAddressType(chip)
  }
  useEffect(() => {
    setLoading(false)
    setState(address)
    setLoading(true)
  }, [address])

  useEffect(() => {
    setId(user._id)
  }, [])


  const _confirmLocation = async () => {
    let { location } = geometry
    let address = {
      ...state,
      address_type: address_type,
      geo: {
        latitude: location.lat,
        longitude: location.lng
      }

    }
    const response = await dispatch(addAddressToDatabase(id, address))
    response === 200 ? navigation.navigate('pin_login') : null
  }

  return (
    loading ?
      <View style={styles.container}>
        <View>
          <Text style={[styles.headerText, { color: "#ff6600", paddingVertical: 16 }]}>Add an Address</Text>

          <View style={{ marginTop: 8 }}>
            <Text style={styles.headerText}>
              Address line 1
              <Text style={[styles.headerText, { color: "#f00" }]}>*</Text>
            </Text>
            <TextInput
              defaultValue={state.addressLine1}
              onChangeText={(text) => setState({ ...state, flat_num: text })}
              style={styles.inputContainer}
              mode="flat"
              placeholder=" 23475 Glacier View Dr"
              activeUnderlineColor="#ff6600"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="home-outline"
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Text style={styles.headerText}>Address line 2</Text>
            <TextInput
              onChangeText={(text) => setState({ ...state, locality: text })}
              style={[styles.inputContainer, { marginBottom: 8 }]}
              mode="flat"
              placeholder="Eagle River, Alaska"
              activeUnderlineColor="#ff6600"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              defaultValue={state.addressLine2}
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="ios-map-outline"
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
          </View>

          <View style={styles.rowInputContainer}>
            <Text style={styles.headerText}>
              City
              <Text style={[styles.headerText, { color: "#f00" }]}>*</Text>
            </Text>
            <Text style={[styles.headerText, { marginLeft: "36%" }]}>
              State
              <Text style={[styles.headerText, { color: "#f00" }]}>*</Text>
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              onChangeText={(text) => setState({ ...state, city: text })}
              style={[styles.inputContainer, { width: "46%" }]}
              mode="flat"
              defaultValue={state.city}
              placeholder="Eagle River"
              activeUnderlineColor="#ff6600"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="location-outline"
                      style={{ marginTop: 4 }}
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
            <TextInput
              onChangeText={(text) => setState({ ...state, postal_code: text })}
              style={[styles.inputContainer, { width: "46%" }]}
              mode="flat"
              defaultValue={state.states}
              activeUnderlineColor="#ff6600"
              placeholder="Alaska (AK)"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="ios-map-outline"
                      style={{ marginTop: 4 }}
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
          </View>

          <View style={styles.rowInputContainer}>
            <Text style={styles.headerText}>
              Country
              <Text style={[styles.headerText, { color: "#f00" }]}>*</Text>
            </Text>
            <Text style={[styles.headerText, { marginLeft: "30%" }]}>
              Postal/Zip Code
              <Text style={[styles.headerText, { color: "#f00" }]}>*</Text>
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              onChangeText={(text) => setState({ ...state, city: text })}
              style={[styles.inputContainer, { width: "46%" }]}
              mode="flat"
              defaultValue={state.country}
              placeholder="USA"
              activeUnderlineColor="#ff6600"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="location-outline"
                      style={{ marginTop: 4 }}
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
            <TextInput
              onChangeText={(text) => setState({ ...state, postal_code: text })}
              style={[styles.inputContainer, { width: "46%" }]}
              mode="flat"
              defaultValue={state.postal_code}
              activeUnderlineColor="#ff6600"
              placeholder="99577"
              outlineColor="#ff6600"
              activeOutlineColor="#ff6600"
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="ios-map-outline"
                      style={{ marginTop: 4 }}
                      size={18}
                      color="rgba(155,155,155,1)"
                    />
                  )}
                />
              }
            />
          </View>

          <View style={styles.chipContainer}>
            <Chip
              icon="home"
              selected={address_type === "home" ? true : false}
              mode="outlined"
              onPress={() => selectChip("home")}
              style={{ borderColor: address_type == "home" ? "#ff6600" : "#ededed", borderWidth: 1 }}
            >
              Home
            </Chip>
            <Chip
              icon="office-building"
              selected={address_type === "work" ? true : false}
              mode="outlined"
              onPress={() => selectChip("work")}
              style={{ borderColor: address_type == "work" ? "#ff6600" : "#ededed", borderWidth: 1 }}
            >
              Work
            </Chip>
            <Chip
              icon="globe-model"
              selected={address_type === "other" ? true : false}
              mode="outlined"
              onPress={() => selectChip("other")}
              style={{ borderColor: address_type == "other" ? "#ff6600" : "#ededed", borderWidth: 1 }}
            >
              Others
            </Chip>
          </View>
        </View>

        <LinearGradient style={[styles.button, { marginHorizontal: "28%" }]} colors={["#ff9900", "#ff6600"]}>
          <TouchableOpacity
            onPress={_confirmLocation}
          >
            <Text style={styles.confirmLocation}>Save & proceed</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      : <View />
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: "#FFF",
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 24,
    marginTop: 48,
  },
  chips: {
    borderColor: "#777",
  },
  selectAddress: {
    fontSize: 16,
    color: "#000",
    padding: 6,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingVertical: 0,
    marginHorizontal: 8,
    height: 40,
    textAlignVertical: "center",
  },
  headerText: {
    fontSize: 16,
    textAlign: "left",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ff6600",
    padding: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmLocation: {
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  rowInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 8,
  }
});