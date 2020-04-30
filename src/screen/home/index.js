import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import { SearchHeader } from '../../components/index'
import Focus from './Focus';
import Menus from './Menus'

import AddressList from '../../components/Address/AddressList'
import { API_HOME } from '@/api';
import { Screen } from '@/utils'


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
            offsetY: 0,
            loading: true,
            offset: 0,
            _show: false
        };
        this.animateOpacity = new Animated.Value(1);
        this.animateOpacity.addListener(event => {
            // console.log(event,"valuevaluevalue")
            this.setState({ offset: event.value });
        });

    }

    componentDidMount() {
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
        // console.log(event, "event")
        // console.log(event.nativeEvent, "event.nativeEvent")
        let { contentOffset: { y } } = event.nativeEvent;
        this.setState({
            offsetY: y
        })
        // console.log(y, "yyyyy")
    }


    render() {
        const { focusData, loading, menuData, offsetY } = this.state;
        this.animateOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80],
            extrapolate: 'clamp'
        })

        let animateEvent = Animated.event(
            [{
                nativeEvent: {
                    contentOffset: {
                        y: this.animateOpacity
                    }
                }
            }],
            { useNativeDriver: false })


        if (loading) {
            return <View style={styles.loading} >
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        }
        // console.log(menuData, "menuData ====")

        return <View  >
            <SearchHeader opacity={this.animateOpacity} />
            <ScrollView
                scrollEventThrottle={100}
                onScroll={animateEvent}
            >
                <Focus data={focusData} />
                <Menus data={menuData} />

                {/* <Test /> */}
                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>
           
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

              
       
                <Text>height pixel{height * pixelRatio + StatusBarManager.HEIGHT * pixelRatio}</Text>
                <Text>width pixel{width * pixelRatio}</Text>

                <Text>pixelRatio{pixelRatio}</Text>
                <Button
                    title="显示地址"
                    onPress={() => this.setState({ _show: true })}
                />
                <ActivityIndicator size="small" color="#00ff00" />
                {/* <Test /> */}

                <Text>height{height}</Text>
                <Text>width{width}</Text>
                <Text>StatusBarManager.HEIGHT{StatusBarManager.HEIGHT}</Text>


                <ActivityIndicator size="small" color="#00ff00" />
                <AddressList visible={this.state._show} cancelModal={() => this.setState({ _show: false })} />
            </ScrollView>

        </View>
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