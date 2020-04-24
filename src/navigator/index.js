import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { userActions } from  '../redux/actions'
import uuidv1 from 'uuid/v1';




import { navigationRef } from './RootNavigation';
import TabBar from './TabBar';

import GoodListPage from '@/screen/goodList'
import { LoginScreen } from '../screen/auth'

const Stack = createStackNavigator();

function HomeTabs() {
    return TabBar
}

class NavigationWrap extends Component {

    constructor(props) {
        super(props);
        // 初始化uuid
        if (!this.props.uuid) {
            this.props.dispatch(userActions.setUUIDAction(uuidv1()));
        }
    }

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

const select = state => {
    return {
        ...state.message,
        uuid: state.user.uuid,
    };
};
export default connect(select)(NavigationWrap);
