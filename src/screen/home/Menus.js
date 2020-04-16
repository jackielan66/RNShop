import React, { Component, PureComponent } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView, Image,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import Swiper from 'react-native-swiper'
import { Screen } from '@/utils'
import { Colors, Dimens } from '@/config'

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

   


    render() {
        const { data } = this.props;
        const { focusData } = this.state;
 
        console.log(data, "data ==menuData==")
        let renderDom = null;
        if (data.length == 0) {
            return null
        }
        renderDom = data.map((v, index) => {
            return <View style={styles.item} key={index} >
                 <Image source={{ uri: v.image }}
                style={styles.itemImage} key={index} />
                <Text>{v.navigation_name }</Text>
            </View>
            
           
        })


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
        padding:10
    },
    item:{
        width: itemWidth,
        height: itemWidth,
        alignItems:'center'
    },
    itemImage: {
        width: itemWidth*0.6,
        height: itemWidth*0.6
    },
    itemText: {
        color:Colors.muted
    }
})