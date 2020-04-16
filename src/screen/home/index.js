import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import { SearchHeader } from '../../components/index'
import Focus from './Focus';
import Menus from './Menus'

import Test from '../../components/test'
import { API_HOME } from '../../api';
import { Screen } from '../../utils'


const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: [],
            menuData: [],
            loading: true
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
        console.log(event, "event")
        console.log(event.nativeEvent, "event.nativeEvent")
    }


    render() {
        const { animateOpacity } = this;
        const { focusData, loading,menuData } = this.state;
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

        if (loading) {
            return <View style={styles.loading} >
                <ActivityIndicator size="large" color="#00ff00" />
            </View>



        }
        console.log(menuData, "menuData ====")

        return <View  >
            <SearchHeader opacity={this.animateOpacity} />
            <ScrollView
                scrollEventThrottle={100}
                onScroll={this._scrollY}
            >
                <Focus data={focusData} />
                <Menus data={menuData} />
                
                {/* <Test /> */}
                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>
                <View />
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

                <Text>pixelRatio{pixelRatio}</Text>
                <Button
                    title="Left button"
                    onPress={() => Alert.alert('Left button pressed')}
                />
                <ActivityIndicator size="small" color="#00ff00" />
                {/* <Test /> */}
                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>
                <View />
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

                <Text>pixelRatio{pixelRatio}</Text>
                <Button
                    title="Left button"
                    onPress={() => Alert.alert('Left button pressed')}
                />
                <ActivityIndicator size="small" color="#00ff00" />
                {/* <Test /> */}
                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>
                <View />
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

                <Text>pixelRatio{pixelRatio}</Text>
                <Button
                    title="Left button"
                    onPress={() => Alert.alert('Left button pressed')}
                />
                <ActivityIndicator size="small" color="#00ff00" />
                {/* <Test /> */}
                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>
                <View />
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

                <Text>pixelRatio{pixelRatio}</Text>
                <Button
                    title="Left button"
                    onPress={() => Alert.alert('Left button pressed')}
                />
                <ActivityIndicator size="small" color="#00ff00" />
            </ScrollView>

        </View>
    }
}



const styles = StyleSheet.create({
    container: {

    },
    loading: {
        flex: 1,
        height: Screen.heigth,
        alignItems: 'center',
        justifyContent: 'center'
    }
});