import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '@/screen/home'
import ClassifyPage from '@/screen/classify'


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
    <Tab.Screen name="ShopCart" component={Home} />
    <Tab.Screen name="Mine" component={Home} />
</Tab.Navigator>