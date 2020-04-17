import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView, TouchableOpacity,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules, Image
} from 'react-native'

import { SearchHeader } from '@/components/index'


import { Screen } from '../../utils'
import { Colors } from '../../config';



export default class ContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            opacity: 0,
            focusData: [],
            menuData: [],
            offsetY: 0,
            loading: true,
            resData: [],
            categories: []
        };

    }

    componentDidMount() {

    }


    render() {
        const { data } = this.props;
        const { offsetY, resData, categories } = this.state;

        // console.log(data, "data ContentList ====")

    

        const contentDom = data.brand_list.map(v => {
            return <View key={v.brand_id} style={styles.item} >
                <TouchableOpacity>
                    <Image source={{ uri: v.logo }} style={styles.itemImage} />
                    <Text style={styles.itemText} >{v.name}</Text>
                </TouchableOpacity>
            </View>
        })

        return <ScrollView >
            <View>
                <Text style={styles.header} >{data.name}</Text>
            </View>
            <View style={styles.container} >
                {contentDom}
            </View>
        </ScrollView>
    }
}


const CONTENT_WIDTH = Screen.width - 100
const SINGLE_ITEM_WIDTH = CONTENT_WIDTH / 4

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: Colors.white
    },
    header:{
        padding:10,
        fontSize:14,
        borderLeftColor:Colors.primary,
        borderLeftWidth:1,
    },
    item: {
        width: SINGLE_ITEM_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    itemText: {
        color: Colors.muted,
        fontSize: 10,
        alignSelf: 'center',
        paddingTop: 5
    },
    itemImage: {
        width: SINGLE_ITEM_WIDTH * 0.6,
        height: SINGLE_ITEM_WIDTH * 0.6,
    },
});