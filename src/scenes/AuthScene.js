import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import MobileLogin from './Components/mobilelogin/MobileLogin';
import Logo from './Components/Logo';
import styles from './styles/AuthStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider } from 'react-native-paper';
import Termsandconditions from './Components/mobilelogin/Termsandconditions';
import Icon from 'react-native-vector-icons/Ionicons';
import { width } from './styles/AuthStyle';

export default function AuthScene({ navigation }) {
  const [terms, setTerms] = useState(false);

  const hideModal = () => {
    setTerms(false);
  };
  return (
    <Provider>
      <ImageBackground source={require('../../assets/imagebackground.jpg')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={styles.container}>
          <LinearGradient colors={['#ff9900', '#ff6600']} style={styles.skip}>
            <TouchableOpacity onPress={() => navigation.navigate('home', { logintype: '' })} >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Logo />
          <MobileLogin navigation={navigation} />
          <View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>
            {/* Or */}
            <TouchableOpacity
              style={[styles.btnOTP, { width: width - 48, alignSelf: 'center' }]}
              onPress={() => navigation.navigate('pin_login')}
            >
              <Icon name="keypad-outline" color="#ff6600" size={26} />
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -40 }}>
                Continue with PIN
              </Text>
            </TouchableOpacity>
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
  );
}
