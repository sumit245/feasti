import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import PIC from "../../../../assets/wallet.png"
export default function WalletCard({ navigation, wallet_balance }) {
    return (
        <View style={styles.walletContainer}>
            <View style={styles.walletWrapper} >
                <Image
                    source={PIC}
                    height={84}
                    width={120}
                    style={{ height: 124, maxHeight: 164, width: 120 }}
                />
                <Text style={styles.walletBalance}>
                    ${parseFloat(wallet_balance).toFixed(2)}
                </Text>
                <Text
                    style={styles.rechargeButton}
                    onPress={() => navigation.navigate("place_add_on", { recharging: true, title: "Recharge" })} >Recharge</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    walletContainer: {
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 8,
        marginHorizontal: 2,
        elevation: 2,
        borderRadius: 4,
        borderColor: "#c9c9c9",
        borderWidth: 0.5,
        marginBottom: 16
    },
    walletWrapper: {
        fontSize: 22,
        alignItems: "center",
        fontWeight: "bold",
        color: "#000",
    },
    walletBalance: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    rechargeButton: {
        color: "#226ccf",
        textDecorationLine: "underline",
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 12
    }

})