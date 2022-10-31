import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView, View
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AuthStyle from '../../styles/AuthStyle';
import MaterialMapView from './MaterialMapView';
import ManualEntry from './ManualEntry';
import { useDispatch } from 'react-redux';
import { getReadableAddress, setAdrressFromMap } from '../../../services/actions/addressactions';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AddAddress({ navigation }) {
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        states: "",
        country: "",
        postal_code: "",
        location: {}
    })
    const [loaded, setLoaded] = useState(false)

    const getAddress = async () => {
        const address = await dispatch(getReadableAddress())
        setAddress(address)
        setLoaded(true)
    }

    const changeMarkerAddress = async (location) => {
        const address = await dispatch(setAdrressFromMap(location))
        setAddress(address)
    }
    useEffect(() => {
        getAddress()
    }, [])

    return (
        loaded ?
            <SafeAreaView style={AuthStyle.container}>
                <MaterialMapView changeMarkerAddress={changeMarkerAddress} />
                <ScrollView >
                    {address !== null && <ManualEntry address={address} navigation={navigation} geometry={address.location} />}
                </ScrollView>
            </SafeAreaView>
            : <SafeAreaView style={AuthStyle.container}>
                <View style={{ alignItems: "center", justifyContent: 'center' }}>
                    <ActivityIndicator size="small" animating />
                </View>
            </SafeAreaView>
    )
}