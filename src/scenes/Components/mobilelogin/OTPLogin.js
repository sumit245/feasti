import React, { useState, useRef, useEffect } from 'react'
import styles from "../../styles/AuthStyle"
import OTPTextView from 'react-native-otp-textinput'
import CountDown from 'react-native-countdown-component'
import { LinearGradient } from 'expo-linear-gradient'
import { width } from '../../styles/AuthStyle'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import BackButton from '../utility/BackButton'
import Logo from '../Logo'
import Termsandconditions from './Termsandconditions'
import { Provider } from "react-native-paper"
import { signIn } from '../../../services/actions/actions'

export default function OTPLogin({ navigation }) {
    const otpRef = useRef()
    const { verificationId } = useSelector(state => state.reducer)
    const [verificationCode, setVerificationCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [terms, setTerms] = useState(false);
    const dispatch = useDispatch()
    const hideModal = () => {
        setTerms(false);
    };
    const _clear = () => { }
    const _signIn = async () => {
        setLoading(true)
        const statusCode = await dispatch(signIn(verificationId, verificationCode))
        console.log(statusCode)
        // if (statusCode === 200) {
        //     navigation.navigate('userdetails')
        // } else {
        //     navigation.navigate('home')
        // }
        setLoading(false)
    }
    return (
        <Provider>
            <ImageBackground source={require('../../../../assets/imagebackground.jpg')} style={{ width: '100%', height: '100%' }}>
                <SafeAreaView style={styles.container}>
                    <BackButton navigation={navigation} />
                    <Logo />
                    <View style={styles.mobin}>
                        <Text style={[styles.instructions, { marginTop: 5 }]}>
                            A 6-digit OTP has been sent to your registered mobile number +919649240944
                        </Text>
                        <View>
                            <OTPTextView
                                ref={otpRef}
                                handleTextChange={(text) => setVerificationCode(text)}
                                containerStyle={styles.textInputContainer}
                                textInputStyle={styles.roundedTextInput}
                                tintColor="#ff6600"
                                inputCount={6}
                                textInputProps={{
                                    returnKeyType: 'done',
                                    returnKeyLabel: 'Done',
                                    keyboardType: 'number-pad',
                                    selectionColor: '#ff6600',
                                }}
                                selectionColor="#ff6600"
                                returnKeyType="done"
                                inputCellLength={1}
                                keyboardType="numeric"

                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.instructions}>OTP valid for</Text>
                            <View>
                                <CountDown
                                    size={14}
                                    until={60}
                                    digitStyle={{
                                        marginLeft: -4,
                                        marginTop: -8,
                                    }}
                                    digitTxtStyle={{ color: '#fff' }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    timeLabels={{ s: null }}
                                    onFinish={() => {
                                        alert('Try again after some time!!!');
                                    }}
                                    timeToShow={['S']}
                                />
                            </View>
                            <Text
                                style={{
                                    color: '#fff',
                                    marginLeft: -6,
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                }}
                            >
                                seconds
                            </Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={[
                                    styles.btnOTP,
                                    { width: width / 2.5, height: 40, marginHorizontal: 10 },
                                ]}
                                onPress={_clear}
                            >
                                <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 18 }}>
                                    Clear
                                </Text>
                            </TouchableOpacity>
                            <LinearGradient
                                colors={['#ff9900', '#ff6600']}
                                style={[
                                    styles.btnOTP,
                                    {
                                        width: width / 2.5,
                                        height: 40,
                                        marginHorizontal: 10,
                                        borderColor: '#ff6600',
                                    },
                                ]}
                            >
                                <TouchableOpacity onPress={_signIn}>
                                    {
                                        !loading ?
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                                Submit
                                            </Text>
                                            : <ActivityIndicator size="small" color="#fff" animating />
                                    }
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                    <Text style={styles.termsCondition}>
                        By continuing, you agree to our{' '}
                        <Text
                            style={{ textDecorationLine: 'underline', color: '#226ccf' }}
                            onPress={() => setTerms(true)}
                        >
                            terms and conditions
                        </Text>
                    </Text>
                    <Termsandconditions visible={terms} hideModal={hideModal} />
                </SafeAreaView>
            </ImageBackground>
        </Provider>

    )
}
