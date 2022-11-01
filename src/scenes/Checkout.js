import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Keyboard,
  LogBox,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width, styles } from "./styles/HomeStyle"
import moment from 'moment';
import BackButton from "./Components/utility/BackButton"
import PlanDuration from './Components/checkout/PlanDuration';
import DeliverySlots from './Components/checkout/DeliverySlots';
import CheckoutAddress from './Components/checkout/CheckoutAddress';
import CheckoutCards from './Components/checkout/CheckoutCards';
import DeliveryNotes from './Components/checkout/DeliveryNotes';
import TipOption from "./Components/checkout/TipOption"
import PromoOptions from './Components/checkout/PromoOptions';
import DeliverySelector from './Components/checkout/DeliverySelector';
import BillingTable from "./Components/checkout/BillingTable"
export default function Checkout({ route, navigation }) {
  const { restaurant,
    restaurant_id,
    base_price,
    price,
    plan,
    documents,
    meal_type,
    category,
    promo } = route.params
  const [state, setState] = useState({
    loading: true,
    restaurant: restaurant,
    meal_type: meal_type,
    category: category,
    user: {},
    address: {},
    plan: plan,
    base_price: base_price,
    price: price,
    tip: 0,
    discount: 0,
    card: {},
    taxes: 0,
    delivery_fee: 0,
    service_fee: 0,
    total: 0,
    promo_code: '',
  });
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51KammvB9SdGdzaTpAZcPCcQVMesbuC5qY3Sng1rdnEfnfo2geOUP8CQ27sw0WBjpiMpdYBRoAQ1eX8czY8BEEWdO00teqn55mD';
  const uri = documents[1].banner_image;
  const [addressLoading, setAddressLoading] = useState(true);
  const [isKeyboardOn, setKeyboardOn] = useState(false);
  const [isOrdering, setOrdering] = useState(false);
  const [token, setToken] = useState('');

  const orderNow = async () => {
    setOrdering(true);
    const {
      user,
      restaurant,
      address,
      card,
      total,
      plan,
      tip,
      discount,
      delivery_fee,
      service_fee,
      taxes,
      base_price,
      price,
      start_date,
      end_date,
      notes,
      time,
      category,
      meal_type,
      promo_id,
      promo_code,
    } = state;

    const result = await getCreditCardToken(card);
    if (result.error) {
      setOrdering(false);
      alert(result.error.message);
    } else {
      stripeTokenHandler(
        result.id,
        parseFloat(total),
        user.user_id,
        restaurant_id,
        plan
      )
        .then((resp) => {
          const { paid } = resp;
          if (paid) {
            const { user_id, email_id, first_name, last_name, phone } = user;
            const newOrder = {
              time: time,
              user_id: user_id,
              restaurant_id: restaurant_id,
              email_id: email_id,
              promo_id: promo_id,
              promo_code: promo_code,
              user_name: first_name + ' ' + last_name,
              address,
              card: card,
              category: category,
              meal_type: meal_type,
              phone: phone,
              restaurant,
              plan,
              base_price,
              price,
              discount,
              delivery_fee,
              service_fee,
              taxes,
              total,
              tip,
              start_date,
              end_date,
              notes,
              order_time: new Date().toISOString(),
              expiry_time: moment().add(15, 'minutes'),
            };
            axios
              .post(ORDER_URL, newOrder)
              .then((response) => {
                setOrdering(false);
                const { data } = response;
                Actions.push('thankyou', { id: data.data._id, msg: data.msg });
                sendPushNotification(token, 'Order Placed 🍜', data.msg);
              })
              .catch((err) => {
                setOrdering(false);
                console.log(err);
                alert('Error ordering food');
              });
          }
        })
        .catch((err) => {
          setOrdering(false);
          alert('Error in stripe');
        });
    }
  };
  const getchefbynameandupdatecartcount = async (restaurant_id) => {
    let MENU_COUNT_URL =
      'http://54.146.133.108:5000/api/chefdashboard/getchefbynameandupdatecartcount/' +
      restaurant_id;
    const response = await axios.get(MENU_COUNT_URL);
  };

  useEffect(() => {
    getchefbynameandupdatecartcount(restaurant_id);
    getNotificationToken();
  }, []);

  const dateHandler = (startDate, endDate) => {
    setState({ ...state, start_date: startDate, end_date: endDate });
  };
  const couponHandler = (promo, discount, id, isAdmin) => {
    discount = isAdmin
      ? parseFloat(
        parseFloat(state.price) * 0.01 * parseFloat(discount)
      ).toFixed(2)
      : parseFloat(discount).toFixed(2);

    setState({
      ...state,
      promo_id: id,
      promo_code: promo,
      discount: discount,
    });
  };
  const noteHandler = (notes) => {
    setState({ ...state, notes: notes });
  };
  const tipHandler = (tip_amount) => {
    tip_amount = parseFloat(tip_amount);
    setState({ ...state, tip: tip_amount });
  };
  const slotHandler = (delivery_slot) => {
    setState({ ...state, time: delivery_slot.slot_time });
  };
  const cardHandler = (card) => {
    let { cards } = state.user;
    let currentCard = cards.filter((item) => item.number === card);
    setState({ ...state, card: currentCard[0] });
  };
  const addressHandler = (address) => {
    setAddressLoading(true);
    let { addresses } = state.user;
    let currentAddress = addresses.filter((item) => item._id === address);
    setState({ ...state, address: currentAddress[0] });
    setAddressLoading(false);
  };
  const totalHandler = (total, delivery_fee, service_fee, taxes) => {
    setState({
      ...state,
      total: total,
      taxes: taxes,
      delivery_fee: delivery_fee,
      service_fee: service_fee,
    });
  };

  const stripeTokenHandler = async (token, amount, id, restaurant, plan) => {
    const paymentData = {
      token: token,
      amount: amount,
      user_id: id,
      restaurant_id: restaurant,
      plan_name: plan,
    };
    const response = await axios.post(
      'https://feasti.com/api/stripe/pay',
      paymentData
    );
    return response.data;
  };

  const getCreditCardToken = (creditCardData) => {
    const card = {
      'card[number]': creditCardData.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.expiry.split('/')[0],
      'card[exp_year]': creditCardData.expiry.split('/')[1],
      'card[cvc]': creditCardData.cvc,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      method: 'post',
      body: Object.keys(card)
        .map((key) => key + '=' + card[key])
        .join('&'),
    }).then((response) => response.json());
  };



  const fetchUser = async () => {
    const response = await getUser('user');
    const user = await response.data;
    const { addresses, cards } = user;
    if (user !== null) {
      setState({
        ...state,
        user: user,
        loading: false,
        address: addresses[0],
        card: cards[0],
      });
      setAddressLoading(false);
    } else {
      alert('Please login or register to proceed');
      Actions.jump('auth');
    }
  };

  const keyboardShown = () => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOn(true));
  };
  const keyboardHidden = () => {
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOn(false));
  };
  const getNotificationToken = async () => {
    const token = await AsyncStorage.getItem('notificationToken');
    console.log(token);
    setToken(token);
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchUser();
      keyboardShown();
      keyboardHidden();
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log('====================================');
    console.log(restaurant_id);
    console.log('====================================');
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <View
          style={{
            position: 'absolute',
            left: 5,
            top: 48,
            zIndex: 1000,
            height: 30,
            width: 30,
            justifyContent: 'center',
          }}
        >
          <BackButton navigation={navigation} />
        </View>
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: uri }}
            style={{ width: width, height: 170, resizeMode: 'cover' }}
            height={150}
          />
          <View style={styles.restaurantHeader}>
            <View style={styles.restaurantTitle}>
              <Icon
                style={{ margin: 2, marginTop: 6 }}
                name="stop-circle"
                color={
                  meal_type === 'veg' || meal_type === 'Veg'
                    ? '#2aaf21'
                    : '#cc2224'
                }
                size={16}
              />
              <Text style={styles.welcomeText}>{restaurant}</Text>
            </View>
            <View style={{ marginTop: 2 }}>
              <View style={styles.subheader}>
                <Text style={[styles.mealText, { color: '#777' }]}>
                  Subscription
                </Text>
                <Text style={[styles.mealText, { color: '#777' }]}>Price</Text>
              </View>
              <View style={styles.subheader}>
                <Text style={styles.mealText}>
                  {plan === 'thirtyPlan'
                    ? ' 30 Meals'
                    : plan === 'fifteenPlan'
                      ? ' 15 Meals'
                      : ' 2 Meals'}
                </Text>
                <Text style={styles.mealText}>
                  {'$'}
                  {price}
                </Text>
              </View>
            </View>
          </View>

          <PlanDuration plan={plan} />
          <DeliverySlots category={category} />
          <CheckoutAddress />
          <CheckoutCards />
          <DeliveryNotes />
          <TipOption />
          <PromoOptions coupons={promo} price={price} />
          <DeliverySelector/>
          <BillingTable />
        </ScrollView>

        {!isKeyboardOn && (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={styles.totalCount}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                ${state.total}
              </Text>
            </View>

            <TouchableOpacity onPress={orderNow}>
              <LinearGradient
                colors={['#ff9900', '#ff6600']}
                style={[styles.button, { flexDirection: 'row' }]}
              >
                {isOrdering && <ActivityIndicator size="small" color="#fff" />}
                <Text
                  style={[
                    styles.btnText,
                    {
                      fontSize: isOrdering ? 16 : 18,
                      marginLeft: isOrdering ? 10 : 26,
                    },
                  ]}
                >
                  PROCEED TO PAY
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </StripeProvider>
    </SafeAreaView>
  )
}