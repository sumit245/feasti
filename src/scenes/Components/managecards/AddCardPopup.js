import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Portal, Modal, Button, } from 'react-native-paper'
import { LiteCreditCardInput } from 'react-native-credit-card-input'

export default function AddCardPopup({ visible, title, setVisible }) {
    const [card_holder, setCardHolder] = useState("")
    const cardAdd = () => { }
    const _onChange = () => { }
    const hideModal = () => {
        setVisible(false)
    }
    return (
        <Portal>
            <Modal
                visible={visible}
                contentContainerStyle={styles.addCreditCardContainer}
                style={{ paddingBottom: 120 }}
                onDismiss={hideModal}
            >
                <View style={styles.creditCardHeader}>
                    <Text style={styles.title}>{title}</Text>
                    <Button mode='text' onPress={cardAdd} >Edit card</Button>
                </View>
                <LiteCreditCardInput
                    requiresCVC
                    inputStyle={styles.input}
                    validColor={"#228822"}
                    invalidColor={"#aa2222"}
                    onChange={_onChange}
                    addtionalInputsProps={{
                        number: {
                            defaultValue: "123456778812",
                        }
                    }}
                />
                <View style={{ marginHorizontal: 8, marginVertical: 20 }}>
                    <Text
                        style={styles.title}
                    >
                        Cardholder's Name
                    </Text>
                    <TextInput
                        placeholder="Name"
                        selectionColor="#ff6600"
                        defaultValue={card_holder}
                        style={styles.inputContainer}
                        onChangeText={(text) => setCardHolder(text)}
                    />
                </View>
            </Modal>
        </Portal>
    )
}
const styles = StyleSheet.create({
    addCreditCardContainer: {
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 4,
    },
    creditCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 2,
        borderColor: "#ccc",
        borderWidth: 0.2,
    },
    btnText: {
        fontSize: 12,
        color: "#ff6600",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    inputContainer: {
        borderBottomColor: "#777",
        borderBottomWidth: 0.5,
    },
})