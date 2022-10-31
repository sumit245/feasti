import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScene from '../scenes/HomeScene';
import AccountScene from "../scenes/AccountScene"
import OrderScene from "../scenes/OrderScene"
import SubscriptionScene from "../scenes/SubscriptionScene"
import { Text } from 'react-native';

const Tab = createMaterialBottomTabNavigator()
export default function MaterialBottomNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Meals"
            activeColor="#ff6600"
            inactiveColor="#ff9900"
            labeled={true}
            barStyle={{
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                fontWeight: 'bold',
            }}
            tabBarOptions={{ labelStyle: { fontWeight: 'bold' } }}
        >
            <Tab.Screen
                name="Meals"
                component={HomeScene}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home-outline" color={color} size={24} />
                    ),

                    tabBarLabel: (
                        <Text style={{ fontWeight: 'bold', color: '#ff6600' }}>Home</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="My Orders"
                component={OrderScene}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="cart-outline" color={color} size={24} />
                    ),
                    tabBarLabel: (
                        <Text style={{ fontWeight: 'bold', color: '#ff6600' }}>
                            My Orders
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Subscriptions"
                component={SubscriptionScene}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-duplicate-outline" color={color} size={24} />
                    ),
                    tabBarLabel: (
                        <Text style={{ fontWeight: 'bold', color: '#ff6600' }}>
                            Subscriptions
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScene}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="person-circle-outline" color={color} size={24} />
                    ),
                    tabBarLabel: (
                        <Text style={{ fontWeight: 'bold', color: '#ff6600' }}>
                            Profile
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}