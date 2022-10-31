import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import BackButton from './utility/BackButton';
import styles from "../styles/AuthStyle"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/actions';

export default function UserDetail({ navigation }) {
  const [uri, setUri] = useState("https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png")
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email_id: ""
  })
  const [id, setId] = useState("")
  const { user } = useSelector(state => state.reducer)
  const { _id } = user
  const dispatch = useDispatch()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      setUri(`data:image/jpg;base64,${result.base64}`)
    }
  };

  const _nextAction = async () => {
    const { first_name, last_name, email_id } = state;
    if (!first_name) {
      alert('First name is required');
      return;
    }
    if (!last_name) {
      alert('Last name is required');
      return;
    }
    if (!email_id) {
      alert('Email id is required');
      return;
    }
    const dataToSend = {
      first_name,
      last_name,
      email_id,
      profile_picture: uri
    };
    const response = await dispatch(updateUser(id, dataToSend))
    navigation.navigate('add_address')
  };

  useEffect(() => {
    setId(_id)
  }, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff" }]}>
      <BackButton />
      <Text style={styles.lightText}>We need some details to serve you better</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.profilepic}>
            <Image
              source={{
                uri: uri,
              }}
              style={styles.profileimg}
            />
          </View>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={pickImage}
          >
            <Icon name="camera-outline" size={28} color="#444" />
          </TouchableOpacity>
        </View>

        <Button onPress={_nextAction} color="#ff6600">
          Next
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollcontainer}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.label}>
              First Name
              <Text style={[styles.label, { color: '#f00' }]}>*</Text>
            </Text>
            <TextInput
              onChangeText={(text) => setState({ ...state, first_name: text })}
              selectionColor="#ff6600"
              value={state.first_name}
              style={styles.inputContainer}
              placeholder="John"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Last Name
              <Text style={[styles.label, { color: '#f00' }]}>*</Text>
            </Text>

            <TextInput
              onChangeText={(text) => setState({ ...state, last_name: text })}
              value={state.last_name}
              selectionColor="#ff6600"
              style={styles.inputContainer}
              placeholder="Doe"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Email <Text style={[styles.label, { color: '#f00' }]}>*</Text>
            </Text>

            <TextInput
              onChangeText={(text) => setState({ ...state, email_id: text })}
              value={state.email_id}
              selectionColor="#ff6600"
              style={styles.inputContainer}
              placeholder="abc@mail.net"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}