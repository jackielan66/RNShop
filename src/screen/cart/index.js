import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'
import CartScene from './CartScene'


export default class CartIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
    }

    render() {

        return <View  >
            <CartScene />
        </View>
    }
}



const styles = StyleSheet.create({
    container: {

    }
});