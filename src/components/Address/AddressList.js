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
    Linking,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import * as API_Common from '../../api/common-api';

import { F16Text } from '../../widgets/Text'
import { ScrollView } from 'react-native-gesture-handler';

const PROVINCE = 0,
    CITY = 1,
    AREA = 2,
    TOWN = 3;

export default class AddressList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            resData: {},
            resList: []
        };
    }

    componentDidMount() {
        this.fetch()
    }

    async fetch() {

        const { type } = this.props;
        let id = "";
        if (type == "PROVINCE") {
            id = 0
        }
        const res = await API_Common.getRegionsById(id);
        // console.log(res, "res")
        this.setState({
            resList: res
        })

    }

    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    onChangeTab = (key) => {
        console.log('onChangeTab', key)
    }

    _renderItem = (v) => {
        return <View key={v.id} >
            <Text>{v.local_name}</Text>
        </View>
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        let { visible } = this.props;
        const { resList } = this.state;



        return (
            <ScrollView>
                <FlatList
                    data={resList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </ScrollView>

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
