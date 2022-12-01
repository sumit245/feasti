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
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/AuthStyle';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, updateUser } from '../services/actions/actions';
import HeaderSimple from './Components/home/headerTop/HeaderSimple';

export default function UserDetail({ navigation }) {
    const [uri, setUri] = useState("https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png")
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email_id: ""
    })
    const [id, setId] = useState("")
    const [editable, setEditable] = useState(false)
    let { user } = useSelector(state => state.reducer)
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
        if (!editable) {
            setEditable(true)
        }
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
        const response = await dispatch(editUser(id, dataToSend))
        setEditable(!editable)

    };

    useEffect(() => {
        user = JSON.parse(user)
        const { _id } = user
        setState(user)
        setId(_id)
    }, [])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: "#ffffff" }]}>
            <View style={{ marginVertical: 2, paddingVertical: 2 }}>
                <HeaderSimple title="Edit Account" navigation={navigation} />
                <Divider />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 4
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
                    {editable ? "SAVE" : "EDIT"}
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
                            editable={editable}
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
                            editable={editable}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.label}>
                                Mobile Number
                                <Text style={[styles.label, { color: '#f00' }]}>*</Text>
                            </Text>
                            <TextInput
                                onChangeText={(text) => setState({ ...state, phone: text })}
                                value={state.phone}
                                selectionColor="#ff6600"
                                style={styles.inputContainer}
                                placeholder="Doe"
                                editable={false}
                            />
                        </View>
                        {
                            editable && (

                                <Text style={{ color: "#ff6600", textDecorationLine: 'underline', position: 'absolute', right: 24 }}>Verified</Text>
                            )
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                editable={false}
                            />
                        </View>
                        {
                            editable && (

                                <Text style={{ color: "#ff6600", textDecorationLine: 'underline', position: 'absolute', right: 24 }}>Verified</Text>
                            )
                        }
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}