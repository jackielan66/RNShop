import React, { Component, PureComponent } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView, Image, TouchableOpacity,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules, DeviceEventEmitter
} from 'react-native'

import Swiper from 'react-native-swiper'
import { Screen } from '@/utils'
import { Colors, Dimens } from '@/config'
import { navigate } from '../../navigator/RootNavigation';

const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class Menus extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: []
        };
    }

    componentDidMount() {
        
    }

    _onPress = item => {
        // console.log(item)
        DeviceEventEmitter.emit('testlistername', { 'test': 1 })
        return;
        const { url } = item;
        if (/\/points-mall/.test(url)) {
            // 积分商城
            navigate('PointMall');
        } else if (/\/coupons/.test(url)) {
            // 领券
            navigate('Coupons');
        } else if (/\/group-buy/.test(url)) {
            // 团购
            navigate('GroupBuy');
        } else if (/\/goods\/\d/.test(url)) {
            // 具体某个商品
            const inputs = url.match(/\/goods\/(\d+)/);
            if (inputs && inputs[1]) {
                navigate('Goods', { id: inputs[1] });
            }
        } else {
            navigate('SingIn');
        }
    };

    menuItem = item => {
        return (
            <TouchableOpacity
                key={item.navigation_id}
                style={styles.item}
                onPress={() => {
                    this._onPress(item);
                }}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.item_text}>{item.navigation_name}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { data } = this.props;
        const { focusData } = this.state;

        // console.log(data, "data ==menuData==")
        let renderDom = null;
        if (data.length == 0) {
            return null
        }
        // renderDom = data.map((v, index) => {
        //     return <View style={styles.item} key={index} >
        //          <Image source={{ uri: v.image }}
        //         style={styles.itemImage} key={index} />
        //         <Text>{v.navigation_name }</Text>
        //     </View>


        // })
        renderDom = data.map(this.menuItem)



        return <View style={styles.container}>
            {renderDom}
        </View>

    }
}



const itemWidth = (Screen.width - 20) / 5;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    item: {
        width: itemWidth,
        height: itemWidth,
        alignItems: 'center'
    },
    itemImage: {
        width: itemWidth * 0.6,
        height: itemWidth * 0.6
    },
    itemText: {
        color: Colors.muted
    }
})