// const BASE_URL = "http://192.168.1.3:5000" //local IP address 
const BASE_URL = "http://18.117.246.192"   //aws IP address

// user related links
export const USER_URL = BASE_URL + '/api/users/';
export const ADD_CARD_URL = BASE_URL + '/api/users/addcard/'
export const ADDRESS_URL = BASE_URL + '/api/users/addaddress/';
export const CHANGE_ADDRESS_URL = BASE_URL + '/api/users/changeaddress/';
export const ADD_TO_FAVORITE = BASE_URL + '/api/users/addfavorite/'
export const GET_FAVORITE_RESTAURANT = BASE_URL + '/api/users/getfavorite/'
export const PLACE_ORDER_URL = BASE_URL + "/api/orders/"

// Restaurant Links
export const CUISINE_URL = BASE_URL + '/api/cuisine';
export const RESTAURANT_URL = BASE_URL + '/api/newrest/category/';
export const ACTIVE_RESTAURANT_URL = BASE_URL + '/api/newrest/active/';
export const GET_PICKUP_RESTAURANT = BASE_URL + '/api/newrest/filterpickup/'
export const PROFIT_URL = BASE_URL + '/api/plans';
export const SLOT_URL = BASE_URL + '/api/slots'
export const MEALS_URL = BASE_URL + "/api/meals/"
export const COUPON_URL = BASE_URL + '/api/coupon';
export const ADMIN_COUPON_URL = BASE_URL + '/api/admin-coupon/'
export const CUISINE_TYPE_URL = BASE_URL + '/api/newrest/cuisine_type/';
export const SEARCH_BY_CITY = BASE_URL + '/api/newrest/searchbycity/'
export const VEG_NON_VEG = BASE_URL + '/api/newrest/meal_type/';
export const GET_CHEF_FROM_BANNER = BASE_URL + '/api/newrest/getchefbyId/'


// Calculation Links
export const CHECKOUT_URL = BASE_URL + '/api/checkout/6088240787ea8208fcb85863';
export const GET_PRICE_URL = BASE_URL + '/api/pricing/'

// Orders and subscription Links
export const GET_ORDER_DETAILS = BASE_URL + '/api/orders/getOrderByID/'
export const ORDER_URL = BASE_URL + '/api/orders/getorderbyuser/';
export const ORDER_UPDATE = BASE_URL + '/api/orders/'
export const SUBSCRIPTION_URL = BASE_URL + '/api/orders/getsubscription/'
export const BANNER_URL = BASE_URL + '/api/promo/active'
export const BANNER_UPDATE_URL = BASE_URL + '/api/promo/getchefbyidandupdatebannercount/'
export const RATING_URL = BASE_URL + '/api/review'
export const CHECK_RATING_URL = BASE_URL + '/api/review/getreviewByUser/'