import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '@/screen/home'
import ClassifyPage from '@/screen/classify'
import CartIndexPage from '@/screen/cart'
import MineScreen from '@/screen/mine'


const Tab = createBottomTabNavigator();


export default <Tab.Navigator
    tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    }} >
    <Tab.Screen name="Home"
        component={Home}
        options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" size={size} color={color} />
            )
        }}
    />
    <Tab.Screen
        component={ClassifyPage}
        name="Settings" options={{
            tabBarLabel: '分类',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" size={size} color={color} />
            )
        }} />
    <Tab.Screen name="ShopCart"
        options={{
            tabBarLabel: '购物车',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-cart" size={size} color={color} />
            )
        }}
        component={CartIndexPage} />
    <Tab.Screen name="Mine"
        options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-person" size={size} color={color} />
            )
        }}
        component={MineScreen} />
</Tab.Navigator>