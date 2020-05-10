/**
 * Created by Andste on 2017/9/14.
 * 二维码页面
 */

import React, { PureComponent } from 'react';
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import * as API_Common from '../../api/common-api';
import AddressList from './AddressList'

import { F16Text } from '../../widgets/Text'

export default class AddressListContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    componentDidMount() {
        this.fetch()
    }

    async fetch() {
        const res = await API_Common.getRegionsById();
        console.log(res, "res")
    }

    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    onChangeTab = (key) => {
        console.log('onChangeTab', key)
    }

    render() {
        let { visible } = this.props;

        return (


            <ScrollableTabView renderTabBar={() => <ScrollableTabBar />} >
                <AddressList tabLabel="React" type="PROVINCE"/>
                {/* <View tabLabel="Vue"><AddressList type="CITY"/></View>
                <View tabLabel="node"><AddressList /></View> */}
            </ScrollableTabView>




        );
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 300,
        zIndex: 9999999
        // flex: 1,
        // backgroundColor: '#000000',
    },
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40
    },
    back: {
        width: 44,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.transparent,
    },
    wrapper: {
        paddingTop: 50,
        flex: 1
    },






    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});
