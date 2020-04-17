import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView, TouchableOpacity,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'

import { SearchHeader } from '@/components/index'

import { Colors } from '../../config';
import { Screen } from '@/utils';



const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class RootList extends Component {
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

    onItemTouch(item) {
        this.props.onSelectedCategoryItem && this.props.onSelectedCategoryItem(item)
    }


    render() {
        const { data, current } = this.props;
        const { offsetY, resData, categories } = this.state;


        

        const categoryItem = data.map(v => {
            return <TouchableOpacity
                onPress={this.onItemTouch.bind(this, v)}
                key={v.category_id} style={[styles.item, {
                    backgroundColor: current.category_id == v.category_id ? Colors.white : Colors.muted
                }]} >

                <Text>{v.name}</Text>
            </TouchableOpacity>
        })

        return <ScrollView  >
            {categoryItem}
        </ScrollView>
    }
}



const styles = StyleSheet.create({
    container: {

    },
    item: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        height: Screen.sHeight - 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    }
});