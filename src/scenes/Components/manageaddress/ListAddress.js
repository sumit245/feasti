import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { getUser, saveUser } from '../../../services/user/getuser';
import axios from 'axios';
import { USER_URL } from '../../../services/EndPoints';
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list';
import { RadioButton } from 'react-native-paper';
import Trash from '../../../../assets/Trash.png';
import { LinearGradient } from 'expo-linear-gradient';

const ListEmptyContent = () => {
  return (
    <View style={styles.centerContent}>
      <Icon name="sad" size={80} color="#666" />
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        KNOCK KNOCK! WHO'S THERE?
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: '#666',
          paddingVertical: 10,
        }}
      >
        You didn't have any addresses saved.{'\n'}
        Saving addresses helps you checkout faster.
      </Text>
    </View>
  );
};

const AddressCard = ({ item, checked, changeSelector }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Icon
          name={
            item.address_type === 'home'
              ? 'home-outline'
              : item.address_type === 'office'
              ? 'business-outline'
              : 'earth-outline'
          }
          size={24}
          color="#777"
        />
        <Text style={styles.headerText}>{item.address_type}</Text>
      </View>
      <RadioButton.Android
        value={item._id}
        status={checked === item._id ? 'checked' : 'unchecked'}
        onPress={() => changeSelector(item._id)}
        color="#ff6600"
      />
    </View>
    <View style={[styles.cardBody, { borderBottomWidth: 0 }]}>
      <Text style={styles.content}>{item.flat_num},</Text>
      <Text style={styles.content}>{item.locality}</Text>
      <Text style={styles.content}>{item.city},</Text>
      <Text style={styles.content}>{item.postal_code}</Text>
      <Text style={styles.content}>{item.state}</Text>
    </View>
  </View>
);
export default class ListAddress extends Component {
  state = {
    address: [],
    checked: 'home',
    userid: '',
  };

  fetchUser = () => {
    getUser('user').then((res) => {
      let { _id } = res.data;
      axios.get(USER_URL + _id).then((res) => {
        this.setState({ address: res.data.addresses, userid: _id });
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchUser();
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  deleteAddress = async (id) => {
    let renderedAddress = [...this.state.address];
    let addresses = renderedAddress.filter((value) => value._id !== id);
    const response = await axios.put(USER_URL + this.state.userid, {
      addresses: addresses,
    });
    const { data } = response;

    let local = JSON.stringify(data);
    saveUser('user', local);
    this.setState({
      address: addresses,
    });
  };

  renderAddress = ({ item }, checked) => (
    <AddressCard
      item={item}
      checked={checked}
      changeSelector={this.changeSelector}
    />
  );

  changeSelector = (selected) => {
    if (this.props.checkout) {
      this.props.onAddressSelect(selected);
      Actions.pop({ refresh: {}, timeout: 1 });
    } else if (this.props.isHome) {
      Actions.push('home', { isAdded: true });
    }
    this.setState({ checked: selected });
  };

  render() {
    const { address, checked } = this.state;
    return (
      <View style={styles.container}>
        <SwipeableFlatList
          data={address}
          renderItem={(item) => this.renderAddress(item, checked)}
          keyExtractor={(item) => item._id}
          extraData={this.changeSelector}
          ListEmptyComponent={() => {
            return <ListEmptyContent />;
          }}
          renderRightActions={({ item }) => (
            <SwipeableQuickActions
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SwipeableQuickActionButton
                style={{ backgroundColor: '#ff2244', padding: 8, height: 80 }}
                textStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                  padding: 4,
                }}
                onPress={() => {
                  this.deleteAddress(item._id);
                }}
                imageSource={Trash}
                imageStyle={{ height: 20, width: 20, alignSelf: 'center' }}
              />
            </SwipeableQuickActions>
          )}
        />
        <LinearGradient style={styles.button} colors={['#ff9900', '#ff6600']}>
          <TouchableOpacity
            onPress={() => {
              Actions.push('manageAddress');
            }}
          >
            <Text style={styles.confirmLocation}>ADD NEW ADDRESS</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
    padding: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: '#979797',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
    paddingVertical: 2,
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    textTransform: 'capitalize',
    padding: 2,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    color: '#777',
    paddingRight: 4,
  },
  cardBody: {
    flexDirection: 'row',
    marginHorizontal: 12,
    padding: 12,
    alignItems: 'baseline',
    borderBottomWidth: 0.2,
    borderBottomColor: '#979797',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ff6600',
    marginBottom: 20,
    marginHorizontal: '20%',
    padding: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLocation: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 26,
  },
});
