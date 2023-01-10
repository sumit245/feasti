import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import firebase from '../../../_firebase';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../../styles/AuthStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { sendOTP } from '../../../services/actions/actions';
import { useDispatch } from 'react-redux';

export default function MobileLogin({ navigation }) {
  const recaptchaVerifier = useRef()
  const [phoneNumber, setPhoneNumber] = useState()
  const dispatch = useDispatch()
  const firebaseConfig = firebase.default.app().options
  const _sendVerificationCode = async () => {
    await dispatch(sendOTP(phoneNumber, recaptchaVerifier.current))
    navigation.navigate('otplogin')

  }
  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={false} />
      <View style={styles.mobin}>
        <PhoneInput
          placeholder="Enter Mobile Number"
          defaultCode="CA"
          textInputProps={{
            returnKeyType: 'done',
            returnKeyLabel: 'Done',
            keyboardType: 'number-pad',
            selectionColor: '#ff6600',
          }}
          containerStyle={styles.btnOTP}
          textContainerStyle={{
            borderColor: '#fff',
            height: 48,
            padding: 0,
            borderRadius: 5,
          }}
          textInputStyle={{ fontSize: 18, marginTop: -6 }}
          codeTextStyle={{ marginTop: -6 }}
          onChangeFormattedText={(text) => setPhoneNumber(text)}
        />
        <LinearGradient colors={['#ff9900', '#ff6600']} style={styles.btnOTP}>
          <TouchableOpacity onPress={_sendVerificationCode} disabled={!phoneNumber} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </>
  )
}