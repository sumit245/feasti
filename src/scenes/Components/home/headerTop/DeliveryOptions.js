import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../../styles/HomeStyle';

export default function DeliveryOptions({ props }) {
    const [state, setState] = useState({
        address: 'Select address',
        addresses: [],
    });
    const [visible, setVisible] = useState(false);

    const setAddress = async (address) => { };

    async function fetchandsave() { }
    useEffect(() => {
        fetchandsave();
    }, [state.addresses]);
    return (
        <>
            <View style={styles.sortView}>
                <Modal
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                    onDismiss={() => setVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.sortView}
                        activeOpacity={1}
                        onPressOut={() => setVisible(false)}
                    >
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={() => setVisible(false)}
                            >
                                <Icon name="close-sharp" color="red" size={18} />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <ScrollView
                                    style={{ height: 120 }}
                                    showsVerticalScrollIndicator={true}
                                >
                                    {state.addresses.map((data, key) => (
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row',
                                                paddingVertical: 2,
                                                borderBottomColor: '#979797',
                                                borderBottomWidth: 0.3,
                                                borderBottomStartRadius: 30,
                                                width: 200,
                                            }}
                                            key={key}
                                            onPress={() => {
                                                setAddress(data.address_type);
                                            }}
                                        >
                                            <Icon
                                                name={
                                                    data.address_type === 'home'
                                                        ? 'ios-home-outline'
                                                        : data.address_type === 'office'
                                                            ? 'business-outline'
                                                            : 'earth-outline'
                                                }
                                                size={16}
                                                style={styles.modalText}
                                                color="#979797"
                                            />
                                            <View>
                                                <Text style={styles.modalText}>
                                                    {data.address_type}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.modalText,
                                                        { fontSize: 12, fontWeight: 'normal' },
                                                    ]}
                                                >
                                                    {(data.flat_num || '') +
                                                        ',' +
                                                        (data.locality || '') +
                                                        ' ' +
                                                        (data.city || '')}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <Text
                                style={[
                                    styles.modalText,
                                    { fontWeight: 'bold', color: '#ff6600' },
                                ]}
                                onPress={() => {
                                    setVisible(false);
                                    Actions.push('listAddress', { isHome: true });
                                }}
                            >
                                <Icon name="add-sharp" size={20} color="#ff6600" />
                                Add Address
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>

            <View>
                <Text
                    onPress={() => setVisible(true)}
                    style={{ textAlignVertical: 'center' }}
                >
                    DELIVER TO{' '}
                    <Icon name="chevron-down-outline" size={20} color="#ff6600" />
                </Text>
                <Text
                    style={{
                        top: 2,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    {state.address}
                </Text>
            </View>
        </>
    );
}
