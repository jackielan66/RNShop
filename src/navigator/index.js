import React, { Component } from 'react';
import { Platform, StatusBar, Button, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { userActions } from '../redux/actions'
import uuidv1 from 'uuid/v1';
import Toast from 'react-native-root-toast';
import { colors } from '../config'


import { navigationRef } from './RootNavigation';
import TabBar from './TabBar';

import GoodListPage from '@/screen/goodList'
import { LoginScreen } from '../screen/auth'
import { SettingPage } from '../screen/settings'
import { MyAddress } from '../screen/miceScenes'
import { HeaderBack } from '../components';

const Stack = createStackNavigator();

function HomeTabs() {
    return TabBar
}

const headerCfg = {
    // headerMode: 'none',
    // headerLeft: <HeaderBack />,
    // headerRight: <View />,
    // gestureResponseDistance: {
    //     horizontal: 60,
    // },
    // headerBackTitle: null,
    // headerRight: () => (
    //     <Button
    //         onPress={() => alert('This is a button!')}
    //         title="Info"
    //         color="#fff"
    //     />
    // ),
    headerTitleStyle: {
        fontSize: 17,
        fontWeight: '400',
        color: colors.text,
        textAlign: 'center',
        flex: 1,
    },
    headerTintColor: colors.navigator_tint_color,
    headerStyle: {
        backgroundColor: colors.navigator_background,
        ...Platform.select({
            android: {
                // paddingTop: StatusBar.currentHeight,
                // height: 56 + StatusBar.currentHeight,
            },
        }),
    },
};

class NavigationWrap extends Component {

    constructor(props) {
        super(props);
        // 初始化uuid
        if (!this.props.uuid) {
            this.props.dispatch(userActions.setUUIDAction(uuidv1()));
        }
        this.state = {

        }
    }

    static getDerivedStateFromProps(nextProps) {
        const { type, message } = nextProps;

        if (message === null || message === undefined) {
            return null;
        }
        if (NavigationWrap.toast) {
            Toast.hide(NavigationWrap.toast);
        }
        NavigationWrap.toast = Toast.show(message, {
            type,
            shadow: false,
            position: Toast.positions.CENTER,
            duration: Toast.durations.SHORT
        });
        return null
    }

    render() {
        return <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={headerCfg}
            >
                <Stack.Screen options={{ headerShown: false }
                } name="TABBAR" component={HomeTabs} />
                <Stack.Screen name="GoodList" component={GoodListPage} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Setting" component={SettingPage} options={SettingPage.navigationOptions} />
                <Stack.Screen name="MyAddress" component={MyAddress} />
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
