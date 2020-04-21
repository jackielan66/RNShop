import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import FilterBar from './FilterBar';
import ContentList from './ContentList';

import { API_HOME } from '@/api';
import { Screen } from '@/utils'
import * as API_Goods from '../../api/good-api';

const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class GoodListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: [],
            menuData: [],
            offsetY: 0,
            loading: true,
            resData: {},
            resList: []
        };
    }

    componentDidMount() {
        // console.log(this.props, "this,props")
        this.fetch()
    }

    fetch = async () => {
        const { params } = this.props.route;
        this.setState({
            loading: true
        })
        let _params = {
            page_no: 1,
            cat: params.category_id,
        }
        const res = await API_Goods.getGoodsList(_params);
        console.log(res, '=====')
        this.setState({
            resData: res,
            resList: res.data,
            loading: false
        })
    }


    render() {
        const { animateOpacity } = this;
        const { focusData, loading, resList, resData } = this.state;
        // console.log(this.animateOpacity, "animateOpacity")
        // Animated.timing(this.animateOpacity, {
        //     toValue: 1,
        //     duration: 2000
        // }).start();
        // this.animateOpacity.interpolate({
        //     inputRange:[0,1],
        //     outputRange:[0,80],
        //     extrapolate:'clamp'
        // })
        // console.log('')
        // if (loading) {
        //     return <View style={styles.loading} >
        //         <ActivityIndicator size="large" color="#00ff00" />
        //     </View>
        // }
        return <View  >
            <FilterBar />
            <ContentList data={resList} />
        </View>


        // console.log(menuData, "menuData ====")


    }
}



const styles = StyleSheet.create({
    container: {

    },
    loading: {
        height: Screen.sHeight - 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    }
});