import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import moment from "moment"
import { CHECKOUT_URL, ORDER_URL, PLACE_ORDER_URL, PROFIT_URL, SLOT_URL } from "../EndPoints"

export const SET_SELECTED_MEAL = "SET_SELECTED_MEAL"
export const SET_USER = "SET_USER" //user name
export const SET_PHONE = "SET_PHONE" //phone
export const SET_EMAIL_ID = "SET_EMAIL_ID"//email id
export const SET_SELECTED_ADDRESS = "SET_SELECTED_ADDRESS" //address
export const SET_SELECTED_CARD = "SET_SELECTED_CARD" //card
export const SET_USER_ID = "SET_USER_ID" //user id
export const SET_START_DATE = "SET_START_DATE" //start date
export const SET_END_DATE = "SET_END_DATE" //end date
export const SET_RESTAURANT_ID = "SET_RESTAURANT_ID" //restaurant ID
export const SET_RESTAURANT_NAME = "SET_RESTAURANT_NAME" // restaurant Name
export const SET_PLAN_NAME = "SET_PLAN_NAME" //plan name
export const SET_BASE_PRICE = "SET_BASE_PRICE" //Base  price
export const SET_CUSTOMER_PRICE = "SET_CUSTOMER_PRICE" //customer price
export const SET_TIP_AMOUNT = "SET_TIP_AMOUNT" //tip
export const SET_TOTAL_SERVICE = "SET_TOTAL_SERVICE" //service fee
export const SET_DELIVERY_FEE = "SET_DELIVERY_FEE" //delivery fee
export const SET_TOTAL_TAX = "SET_TOTAL_TAX" //tax
export const SET_SELECTED_SLOT = "SET_SELECTED_SLOT" //time
export const SET_TOTAL = "SET_TOTAL" //total
export const SET_NOTES = "SET_NOTES" //notes
export const SET_CATEGORY = "SET_CATEGORY" //category
export const SET_MEAL_TYPE = "SET_MEAL_TYPE" //meal_type
export const SET_DELIVERY_PICKUP = "SET_DELIVERY_PICKUP" //isDelivery
export const SET_RESATURANT_ADDRESS = "SET_RESTAURANT_ADDRESS"
export const SET_CURRENT_SLOT = "SET_CURRENT_SLOT"
export const SET_SERVICE_FEE = "SET_SERVICE_FEE"
export const SET_SERVICE_RATES = "SET_SERVICE_RATES"
export const SET_TAXES = "SET_TAXES"


export const getUser = () => async (dispatch) => {
    const user = await AsyncStorageLib.getItem('user')
    const { phone, first_name, last_name, email_id, user_id, addresses, cards } = JSON.parse(user)
    dispatch({ type: SET_USER, payload: first_name + ' ' + last_name })
    dispatch({ type: SET_PHONE, payload: phone })
    dispatch({ type: SET_EMAIL_ID, payload: email_id })
    dispatch({ type: SET_USER_ID, payload: user_id })
    dispatch({ type: SET_SELECTED_ADDRESS, payload: addresses[0] })
    dispatch({ type: SET_SELECTED_CARD, payload: cards[0] })
}
export const setRestaurantDetails = (id, name, address) => async (dispatch) => {
    await dispatch({ type: SET_RESTAURANT_ID, payload: id })
    await dispatch({ type: SET_RESTAURANT_NAME, payload: name })
    await dispatch({ type: SET_RESATURANT_ADDRESS, payload: address })
}
export const setMealDetails = (category, meal_type) => async (dispatch) => {
    await dispatch({ type: SET_CATEGORY, payload: category })
    await dispatch({ type: SET_MEAL_TYPE, payload: meal_type })
}
export const getSelectedPlan = (plan_name, base_price, customer_price, delivery_fee) => async (dispatch) => {
    const plan = await axios.get(PROFIT_URL)
    const plans = plan.data
    const thisPlan = plans.find((plan) => plan.plan_name === plan_name)
    const { duration } = thisPlan
    const selectedPlan = {
        plan_name: plan_name,
        base_price: base_price,
        customer_price: customer_price,
        duration: duration,
        delivery_fee: delivery_fee
    }
    dispatch({ type: SET_SELECTED_MEAL, payload: selectedPlan })
    dispatch({ type: SET_PLAN_NAME, payload: plan_name })
    dispatch({ type: SET_BASE_PRICE, payload: base_price })
}

export const setDuration = (start_date, end_date) => async (dispatch) => {
    dispatch({ type: SET_START_DATE, payload: moment(start_date).format('DD-MMM-YYYY') })
    dispatch({ type: SET_END_DATE, payload: moment(end_date).format('DD-MMM-YYYY') })
}

export const setDeliverySlots = (category) => async (dispatch) => {
    const response = await axios.get(SLOT_URL)
    const slots = response.data
    const currentSlot = category === "Lunch" ? slots[0].lunchSlots : slots[0].dinnerSlots
    dispatch({ type: SET_CURRENT_SLOT, payload: currentSlot })
}

export const setDeliverySlot = (value) => async (dispatch) => {
    dispatch({ type: SET_SELECTED_SLOT, payload: value })
}

export const notesHandler = (value) => async (dispatch) => {
    await dispatch({ type: SET_NOTES, payload: value })
}
export const tipHandler = (value) => async (dispatch) => {
    dispatch({ type: SET_TIP_AMOUNT, payload: value })
}
export const setDeliveryPickup = (value) => async (dispatch) => {
    dispatch({ type: SET_DELIVERY_PICKUP, payload: value })
}

export const setServiceCharges = () => async (dispatch) => {
    const response = await axios.get(CHECKOUT_URL)
    const { service_fee, taxes } = response.data
    dispatch({ type: SET_SERVICE_FEE, payload: service_fee })
    dispatch({ type: SET_SERVICE_RATES, payload: service_fee })
    dispatch({ type: SET_TAXES, payload: taxes })
}

export const calculateTotal = (price, serviceFee, tax, isDelivery, delivery_fee, total) => async (dispatch) => {
    dispatch({ type: SET_CUSTOMER_PRICE, payload: price })
    dispatch({ type: SET_TOTAL_SERVICE, payload: serviceFee })
    dispatch({ type: SET_TOTAL_TAX, payload: tax })
    isDelivery ? dispatch({ type: SET_DELIVERY_FEE, payload: delivery_fee }) :
        dispatch({ type: SET_DELIVERY_FEE, payload: 'N/A' })
    dispatch({ type: SET_TOTAL, payload: total })
}

export const placeOrder = (order) => async (dispatch) => {
    const response = await axios.post(PLACE_ORDER_URL,
        {
            orderToPlace:
            {
                ...order,
                order_time: new Date().toISOString(),
                expiry_time: moment().add(15, 'minutes')
            }
        })
    const { data, msg, status } = response.data
    return { data, status }
}
// const orderNow = async () => {
  //   setOrdering(true);
  //   const {
  //     user,
  //     restaurant,
  //     address,
  //     card,
  //     total,
  //     plan,
  //     tip,
  //     discount,
  //     delivery_fee,
  //     service_fee,
  //     taxes,
  //     base_price,
  //     price,
  //     start_date,
  //     end_date,
  //     notes,
  //     time,
  //     category,
  //     meal_type,
  //     promo_id,
  //     promo_code,
  //   } = state;

  //   const result = await getCreditCardToken(card);
  //   if (result.error) {
  //     setOrdering(false);
  //     alert(result.error.message);
  //   } else {
  //     stripeTokenHandler(
  //       result.id,
  //       parseFloat(total),
  //       user.user_id,
  //       restaurant_id,
  //       plan
  //     )
  //       .then((resp) => {
  //         const { paid } = resp;
  //         if (paid) {
  //           const { user_id, email_id, first_name, last_name, phone } = user;
  //           const newOrder = {
  //             time: time,
  //             user_id: user_id,
  //             restaurant_id: restaurant_id,
  //             email_id: email_id,
  //             promo_id: promo_id,
  //             promo_code: promo_code,
  //             user_name: first_name + ' ' + last_name,
  //             address,
  //             card: card,
  //             category: category,
  //             meal_type: meal_type,
  //             phone: phone,
  //             restaurant,
  //             plan,
  //             base_price,
  //             price,
  //             discount,
  //             delivery_fee,
  //             service_fee,
  //             taxes,
  //             total,
  //             tip,
  //             start_date,
  //             end_date,
  //             notes,
  //             ,
  //             ,
  //           };
  //           axios
  //             .post(ORDER_URL, newOrder)
  //             .then((response) => {
  //               setOrdering(false);
  //               const { data } = response;
  //               Actions.push('thankyou', { id: data.data._id, msg: data.msg });
  //               sendPushNotification(token, 'Order Placed 🍜', data.msg);
  //             })
  //             .catch((err) => {
  //               setOrdering(false);
  //               console.log(err);
  //               alert('Error ordering food');
  //             });
  //         }
  //       })
  //       .catch((err) => {
  //         setOrdering(false);
  //         alert('Error in stripe');
  //       });
  //   }
  // };

  // const response = await getUser('user');
    // const user = await response.data;
    // const { addresses, cards } = user;
    // if (user !== null) {
    //   setState({
    //     ...state,
    //     user: user,
    //     loading: false,
    //     address: addresses[0],
    //     card: cards[0],
    //   });
    //   setAddressLoading(false);
    // } else {
    //   alert('Please login or register to proceed');
    //   Actions.jump('auth');
    // }

