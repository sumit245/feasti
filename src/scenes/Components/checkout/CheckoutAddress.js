import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/HomeStyle"
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

export default function CheckoutAddress() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        address_type: "Home",
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
    });
    const { currentAddress } = useSelector(state => state.checkoutReducer)
    const getAndSetCurrentAddress = async () => {
        setAddress(currentAddress)
        setLoading(false)
    }

    useEffect(() => {
        getAndSetCurrentAddress()
    }, [loading])


    const onAddressSelect = () => { }

    const _nextAction = () => { }
    return (
        loading ?
            (
                <TouchableOpacity style={styles.optionCard} onPress={_nextAction} >
                    <View style={styles.optionrow}>
                        <Text style={styles.optionsLabels}>{"Add new address"}</Text>
                        <Icon name="chevron-forward" color="#444" size={20} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.optionCard}>
                    <View style={styles.optionrow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 2,
                                    borderColor: "#ff6600",
                                    borderWidth: 0.8,
                                    marginRight: 4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    name={
                                        address.address_type === "home"
                                            ? "home-outline"
                                            : address.address_type === "office"
                                                ? "ios-business-outline"
                                                : "ios-earth-outline"
                                    }
                                    size={30}
                                    color="#777"
                                />
                            </View>
                            <View>
                                <Text style={styles.optionsLabels}>
                                    Deliver to{" "}
                                    <Text style={{ textTransform: "capitalize" }}>
                                        {address.address_type}
                                    </Text>
                                </Text>
                                <Text>
                                    {address.addressLine1}
                                </Text>
                                <Text>
                                    {address.city} -{address.postal_code}
                                </Text>
                            </View>
                        </View>
                        <Button
                            mode="text"
                            color="#ff6600"
                            style={{ marginRight: -20 }}
                            onPress={_nextAction}
                        >
                            change
                        </Button>
                    </View>
                </View>
            )
    )
}