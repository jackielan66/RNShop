import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import { navigationRef } from './RootNavigation';
import TabBar from './TabBar';

import GoodListPage from '@/screen/goodList'
import { LoginScreen } from '../screen/auth'

const Stack = createStackNavigator();

function HomeTabs() {
    return TabBar
}

export default class NavigationWrap extends Component {

    render() {

        return <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }

                } name="TABBAR" component={HomeTabs} />
                <Stack.Screen name="GoodList" component={GoodListPage} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    }
}
