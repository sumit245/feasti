import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width, styles } from "./styles/HomeStyle"
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
import { getRestaurantByID } from '../services/actions/retaurantsAction';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setServiceCharges } from '../services/actions/checkoutAction';
export default function Checkout({ route, navigation }) {
  const { nearByRestaurant } = useSelector(state => state.restaurantReducer)
  const { selectedPlan, total } = useSelector(state => state.checkoutReducer)
  const order = useSelector(state => state.checkoutReducer)
  const dispatch = useDispatch()
  const [restaurant, setRestaurant] = useState({})
  const [loaded, setLoaded] = useState(false)
  const { restaurant_id, category } = route.params

  const getChefByID = async () => {
    const rest = await getRestaurantByID(restaurant_id, nearByRestaurant)
    await dispatch(getUser())
    await dispatch(setServiceCharges())
    setRestaurant(rest)
    setLoaded(true)
  }

  useEffect(() => {
    getChefByID()
  }, [])

  const [state, setState] = useState({
    loading: true,
    restaurant: {},
    user: {},
    address: {},
    plan: "",
    base_price: "",
    price: "",
    tip: 0,
    discount: 0,
    card: {},
    taxes: 0,
    delivery_fee: 0,
    service_fee: 0,
    promo_code: '',
  });

  const [isKeyboardOn, setKeyboardOn] = useState(false);
  const [isOrdering, setOrdering] = useState(false);
  const STRIPE_PUBLISHABLE_KEY = ""

  const orderNow = () => {
    setOrdering(true)
    setOrdering(false)
  }

  const keyboardShown = () => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOn(true));
  };
  const keyboardHidden = () => {
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOn(false));
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      keyboardShown();
      keyboardHidden();
    }
    return () => {
      componentMounted = false;
    };
  }, []);


  const { meal_type, documents, plan, isDelivery } = restaurant
  const { plan_name, customer_price } = selectedPlan
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
            source={{ uri: loaded ? documents[1].banner_image : null }}
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
              <Text style={styles.welcomeText}>{restaurant.restaurant_name}</Text>
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
                  {plan_name}
                </Text>
                <Text style={styles.mealText}>
                  {'$'}
                  {customer_price}
                </Text>
              </View>
            </View>
          </View>

          <PlanDuration />
          <DeliverySlots category={category} />
          <CheckoutAddress />
          <CheckoutCards />
          <DeliveryNotes />
          <TipOption />
          <PromoOptions />
          <DeliverySelector isDelivery={isDelivery} />
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
                ${total}
              </Text>
            </View>

            <TouchableOpacity onPress={orderNow}>
              <LinearGradient
                colors={['#ff9900', '#ff6600']}
                style={[styles.button, { flexDirection: 'row' }]}
              >
                {isOrdering && <ActivityIndicator size="small" color="#fff" animating />}
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