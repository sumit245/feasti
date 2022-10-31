import React, { useEffect, useState, useRef } from 'react'
import {
    ImageBackground, View, SafeAreaView, Text, Alert
} from 'react-native'
import ReactNativePinView from 'react-native-pin-view';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../utility/BackButton';
import styles, { height } from '../../styles/AuthStyle'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalUser, loginWithPin } from '../../../services/actions/actions';

export default function PinLogin({ navigation }) {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [showCompletedButton, setShowCompletedButton] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [pin, setPin] = useState('');
    const isLoggedIn = useSelector(state => state.reducer)
    const dispatch = useDispatch()

    useEffect(() => {
        enteredPin.length > 0
            ? setShowRemoveButton(true)
            : setShowRemoveButton(false);

        enteredPin.length === 4
            ? setShowCompletedButton(true)
            : setShowCompletedButton(false);
    }, [enteredPin]);

    const resetPin = () => {
        navigation.pop();
    };
    
    const login = async () => {
        const loggedin = await dispatch(loginWithPin())
        if (!loggedin) {
            Alert.alert("Please Signup", "You need to signup first!", [{ text: "OK", onPress: () => navigation.navigate('auth') }])
        } else {
            navigation.navigate('home')
        }
    }

    const unlock = () => {
        setConfirmation(true);
        if (confirmation) {
            if (pin === enteredPin) {
                pinView.current.clearAll()
                login()
                setConfirmation(false)
            } else {
                alert('Confirmation and Entered PIN code does not match');
            }
        }
        else {
            setPin(enteredPin);
            pinView.current.clearAll();
        }
    }

    return (
        <ImageBackground source={require('../../../../assets/imagebackground.jpg')} style={{ width: '100%', height: '100%' }} >

            <SafeAreaView style={styles.container}>

                <View style={styles.mapBackPosition}>
                    <BackButton navigation={navigation} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 0.12 * height }}>
                    <View style={styles.pinMsgView}>
                        {confirmation ?
                            <Text style={styles.pinMsg}>Confirm PIN Code</Text>
                            :
                            <Text style={styles.pinMsg}>Create a PIN code for your account</Text>
                        }
                        <Text style={styles.pinMsg}>Enter 4 Digits PIN</Text>
                    </View>
                    <ReactNativePinView
                        inputSize={32}
                        ref={pinView}
                        pinLength={4}
                        buttonSize={60}
                        onValueChange={(value) => setEnteredPin(value)}
                        buttonAreaStyle={{
                            marginTop: 32,
                        }}
                        inputAreaStyle={styles.pinInputAreaStyle}
                        inputViewEmptyStyle={styles.pinInputViewEmptyStyle}
                        inputViewFilledStyle={{
                            backgroundColor: '#FFFFFF',
                        }}
                        buttonViewStyle={{
                            borderWidth: 4,
                            borderColor: '#ffffff',
                        }}
                        buttonTextStyle={{
                            color: '#F5EFEF',
                            fontWeight: 'bold'
                        }}
                        onButtonPress={(key) => {
                            if (key === 'custom_left') {
                                pinView.current.clear();
                            }
                            if (key === 'custom_right') {
                                unlock();
                            }
                        }}
                        customLeftButton={
                            showRemoveButton ? (
                                <Icon name={'ios-backspace'} size={36} color="#FBECEC" />
                            ) : null
                        }
                        customRightButton={
                            showCompletedButton ? (
                                <Icon name={'ios-lock-open'} size={36} color="#FBECEC" />
                            ) : null
                        }
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 0.03 * height }}>
                    <Text style={styles.forgot_button} onPress={() => navigation.push('auth')}>
                        Login with OTP
                    </Text>
                    <Text style={styles.forgot_button} onPress={() => resetPin()}>
                        Forgot Pin? Reset Here
                    </Text>
                </View>

            </SafeAreaView>
        </ImageBackground>
    )
}