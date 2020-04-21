import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';


import { API_HOME } from '@/api';
import { Screen } from '@/utils'
import { Colors, Dimens } from '../../config'




export default class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: [],
            menuData: [],
            offsetY: 0,
            loading: true
        };
        this.animateOpacity = new Animated.Value(1);
        // this.animateOpacity.addListener(event => {
        //     console.log(event,"valuevaluevalue")
        //     // this.setState({offset: event.value});
        //   });
    }

    componentDidMount() {

        this.fetchCategory();
    }

    fetchCategory = async () => {
        const res = await API_HOME.getCategory({ client_type: 'WAP' });

    }

    fetchFocus = async () => {
        this.setState({
            loading: true
        })
        const res = await API_HOME.getFocusPictures({ client_type: 'WAP' });
        const menuData = await API_HOME.getSiteMenu();
        // console.log(res, "resres")
        this.setState({
            focusData: res,
            menuData,
            loading: false
        })
    }

    _scrollY = (event) => {
        // console.log(event, "event")
        // console.log(event.nativeEvent, "event.nativeEvent")
        let { contentOffset: { y } } = event.nativeEvent;
        this.setState({
            offsetY: y
        })
        // console.log(y, "yyyyy")
    }


    render() {
        const { animateOpacity } = this;
        const { focusData, loading, menuData, offsetY } = this.state;

        return <View style={styles.container} >
            <View style={styles.def} >
                <Text style={styles.text} >
                    默认
                </Text>
            </View>
            <View style={styles.sales} >
                <Text style={styles.text} >
                    销量
                </Text>
                <View  style={styles.icon} >
                    <Ionicons name="ios-arrow-up" />
                    <Ionicons name="ios-arrow-down" />
                </View>

            </View>
            <View style={styles.price} >
                <Text style={styles.text} >
                    价格
                </Text>
            </View>
        </View>

        if (loading) {
            return <View style={styles.loading} >
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        }
        // console.log(menuData, "menuData ====")


    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth:1,
        borderBottomColor:Colors.borderColor,
        backgroundColor:Colors.white        
    },
    def: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    sales: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    price: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    icon:{
        marginLeft:5
    },
    text:{
        fontSize:16
    },
    loading: {
        height: Screen.sHeight - 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    }
});