import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Portal, Modal } from 'react-native-paper';

export default function ({ visible, hideModal, discount, promo_code, isDelivery }) {

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.contentContainerStyle}
            >
                <TouchableOpacity style={styles.closeBtn} onPress={hideModal}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginHorizontal: 4,
                        justifyContent: 'center',
                        padding: 4,
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.discountText}>
                        {isDelivery ? discount + '%' : discount}
                        <Text style={styles.discountTrailing}> OFF</Text>
                    </Text>
                    <Text>{isDelivery ? `Get your next delivery at ${discount}% OFF` : `Enjoy ${discount} off on your next order`}</Text>
                    <Text style={styles.couponText}>
                        Use coupon code{' '}
                        <Text style={{ color: '#ffa500' }}>{promo_code}</Text>
                    </Text>
                    <Text style={styles.terms}>* Terms and conditions applied</Text>
                </View>
            </Modal>
        </Portal>
    );
}
const styles = StyleSheet.create({
    contentContainerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 18,
        borderRadius: 4,
    },
    closeBtn: {
        position: 'absolute',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        top: -12,
        right: -12,
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    closeText: { fontWeight: 'bold', fontSize: 18, color: '#f00' },
    discountText: {
        fontSize: 48,
        textAlign: 'center',
        color: '#FFA500',
        marginVertical: 4,
    },
    discountTrailing: {
        fontSize: 24,
        paddingHorizontal: 4,
        marginLeft: 16,
    },
    terms: { fontSize: 16, marginVertical: 4 },
    couponText: { fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
});
