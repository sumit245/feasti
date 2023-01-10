import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import { Checkbox, TextInput, Colors } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../../styles/HomeStyle'
import CheckoutCard from "../checkout/CheckoutCards"
import PIC from "../../../../assets/wallet.png"
import HeaderSimple from "../home/headerTop/HeaderSimple"
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, updateWallet } from '../../../services/actions/actions'
import { placeAddOns } from '../../../services/actions/orderActions'

export default function PayForAddOn({ route, navigation }) {
    const { user } = useSelector(state => state.reducer)
    const { addOnTotal, orderID, updateID, add_on } = useSelector(state => state.orderReducer)
    const { title, recharging, isAddOn } = route.params
    const [value, setValue] = useState("0")
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ordering, setOrdering] = useState(false)
    const [balance, setBalance] = useState(0)
    const [userId, setUserId] = useState("")
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        const { wallet_balance, _id } = JSON.parse(user)
        setBalance(wallet_balance)
        setUserId(_id)
    }, [user])

    useEffect(() => {
        setTotal(addOnTotal)
    }, [addOnTotal, add_on, orderID, updateID])



    const recharge = async () => {
        setLoading(true)
        const wallet_balance = { wallet_balance: parseFloat(value) + parseFloat(balance) }
        const status = await dispatch(updateWallet(userId, wallet_balance))
        setLoading(false)
    }
    const onSubmit = async () => {
        if (balance < total) {
            Alert.alert('Warning', `Please recharge with minimum $${parseFloat(total - balance).toFixed(2)}`, [{ text: "OK" }])
        } else {
            let add_on_place = [...add_on]
            setOrdering(true)
            const msg = await dispatch(placeAddOns(orderID, updateID, add_on_place))
            await dispatch(updateUser(userId, { wallet_balance: parseFloat(balance - addOnTotal).toFixed(2) }))
            setOrdering(false)
            Alert.alert('Success', `${msg}`, [{ text: "OK", onPress: navigation.goBack() }])
        }
    }
    const onChangeText = (text) => { setValue(text) }
     const STRIPE_PUBLISHABLE_KEY = "pk_test_51LzlBnJVYvGgsh0M6EGvFyf65Dkrv2tjTr0S2yU34RknmgVubtttaxSKrAyv2Gcy8ccZundhUpDwqIVeQRTLTmHA0008eoEOXi"

    return (
        <SafeAreaView style={styles.container} >
            <HeaderSimple navigation={navigation} title={title} />
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} >
                    <View>
                        <View
                            style={{
                                padding: 10,
                                backgroundColor: "#fff",
                                marginVertical: 8,
                                marginHorizontal: 2,
                                elevation: 2,
                                borderRadius: 4,
                            }}
                        >
                            <View
                                style={{
                                    fontSize: 22,
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    color: "#000",
                                }}
                            >
                                <Image
                                    source={PIC}
                                    height={84}
                                    width={120}
                                    style={{ height: 124, maxHeight: 164, width: 120 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    ${parseFloat(balance).toFixed(2)}
                                </Text>
                            </View>
                            <Text style={{ textAlign: "center", padding: 16, fontSize: 18 }}>
                                Top-up Amount
                            </Text>
                            <View
                                style={{
                                    width: 200,
                                    height: 44,
                                    alignSelf: "center",
                                    backgroundColor: "#fff",
                                    padding: 8,
                                    borderRadius: 20,
                                    borderColor: "#cdcdcd",
                                    borderWidth: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        borderRightWidth: 1,
                                        borderRightColor: "#cdcdcd",
                                        fontWeight: "bold",
                                        color: "#000",
                                        paddingRight: 4,
                                        textAlignVertical: 'top'
                                    }}
                                >
                                    $
                                </Text>
                                <TextInput
                                    style={{
                                        height: 40,
                                        backgroundColor: "#fff",
                                        width: 132,
                                        borderBottomWidth: 0,
                                        justifyContent: "center",
                                        fontSize: 22,
                                        marginHorizontal: 8,
                                    }}
                                    selectionColor="#ff6600"
                                    placeholderTextColor="#ccc"
                                    underlineColor="transparent"
                                    placeholder="5.00"
                                    keyboardType="numeric"
                                    onChangeText={(text) => onChangeText(text)}
                                />
                            </View>
                        </View>
                        <CheckoutCard navigation={navigation} />
                        <View style={styles.optionCard}>
                            <Text>
                                1. Recharge of wallet amount of {value > 0 ? "$" : null}
                                {value} will be made using above credit card.
                            </Text>
                            <Text>
                                2. Wallet amount is non refundable and will not be refunded back.
                                You can use wallet amount to buy add-ons only.
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Checkbox.Android
                                    status={checked ? "checked" : "unchecked"}
                                    rippleColor="#ff6600"
                                    color="#ff6600"
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text>I agree to the terms and condition above.</Text>
                            </View>
                        </View>

                    </View>
                </StripeProvider>
            </ScrollView>
            <View style={{ flexDirection: "row", margin: 4 }}>
                {
                    recharging && (
                        <LinearGradient style={{
                            borderColor: "#000",
                            borderWidth: 1,
                            borderRadius: 24,
                            height: 48,
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            margin: 2,
                        }} colors={["#fff", "transparent"]}>
                            <TouchableOpacity
                                onPress={recharge}
                                disabled={!checked}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        size="small"
                                        animating={true}
                                        color={Colors.red900}
                                    />
                                ) : (
                                    <Text
                                        style={{
                                            textTransform: "uppercase",
                                            color: "#000",
                                            fontWeight: "bold",
                                            fontSize: 18,
                                        }}
                                    >
                                        Recharge Now
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </LinearGradient>
                    )
                }
                {isAddOn  ? (
                    <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
                        borderColor: "#ff6600",

                        borderRadius: 24,
                        padding: 10,
                        height: 48,
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        margin: 2,
                    }}>
                        <TouchableOpacity onPress={onSubmit}>
                            {ordering ? (
                                <ActivityIndicator
                                    size="small"
                                    animating={true}
                                    color={Colors.red900}
                                />
                            ) : (
                                <Text
                                    style={{
                                        textTransform: "uppercase",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 18,
                                    }}
                                >
                                    Pay ${total}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </LinearGradient>
                ) : null}
            </View>
        </SafeAreaView>
    )
}