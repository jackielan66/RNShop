import React, { Component, PureComponent } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,Image,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import Swiper from 'react-native-swiper'
import { Screen } from '@/utils'

const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class Focus extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: []
        };
        this.animateOpacity = new Animated.Value(1);
        // this.animateOpacity.addListener(event => {
        //     console.log(event,"valuevaluevalue")
        //     // this.setState({offset: event.value});
        //   });
    }

    componentDidMount() {
        // Animated.timing(this.animateOpacity,
        //     {
        //         toValue: 1,                        // 透明度最终变为1，即完全不透明
        //         duration: 10000,                   // 让动画持续一段时间
        //     }
        // ).start();
        this.fetchFocus();
    }

    fetchFocus = async () => {
        // const res = await API_HOME.getFocusPictures({client_type:'WAP'});
        // console.log(res, "resres")
        // this.setState({
        //     focusData: res
        // })
    }

    _scrollY = (event) => {
        console.log(event, "event")
        console.log(event.nativeEvent, "event.nativeEvent")
    }


    render() {
        const { data } = this.props;
        const { focusData } = this.state;
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
        // console.log(data, "data ====")
        let renderDom = null;
        if(data.length == 0){
            return null
        }
        renderDom = data.map(v=>{
            return <Image source={{uri: v.pic_url}}
            style={styles.image} key={v.id} />
        })


        return <Swiper style={styles.container} showsButtons={false}>
            {renderDom}
        </Swiper>

    }
}




const styles = StyleSheet.create({
    container:{
        height: 180
    },
    image:{
        width: Screen.width, height: 180
    },
    wrapper: {}
})