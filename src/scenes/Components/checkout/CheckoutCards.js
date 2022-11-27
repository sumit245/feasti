import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { PaymentIcon } from "react-native-payment-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { styles } from "../../styles/HomeStyle"
import { trimmer } from "../../../services/actions/cardActions";

export default function CheckoutCards({ navigation }) {
    const [hasCard, setHasCard] = useState(false)
    const { user } = useSelector(state => state.reducer)
    const [card, setCard] = useState({})
    const { cards } = JSON.parse(user)
    const getAndSetCard = () => {
        if (cards.length > 0) {
            setCard(cards[0])
            setHasCard(true)
        } else {
            setHasCard(false)
        }

    }
    useEffect(() => {
        let componentMounted = true
        if (componentMounted) {
            getAndSetCard()
        }

        return () => {
            componentMounted = false
        }
    }, [card])

    const _nextAction = () => {
        navigation.navigate('checkout_card')
    }
    return (
        hasCard ? (
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
                            <PaymentIcon type={
                                card.brand === "master-card"
                                    ? "mastercard"
                                    : card.brand
                            }
                                width={50} />
                        </View>
                        <View>
                            <Text style={styles.optionsLabels}>{trimmer(card.number)}</Text>
                            <Text>{card.card_holder}</Text>
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
        ) : (
            <TouchableOpacity style={styles.optionCard} onPress={_nextAction}>
                <View style={styles.optionrow}>
                    <Text style={styles.optionsLabels}>{"Add a card"}</Text>
                    <Icon name="chevron-forward" color="#444" size={20} />
                </View>
            </TouchableOpacity>
        )
    )
}