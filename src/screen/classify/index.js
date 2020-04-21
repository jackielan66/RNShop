import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules
} from 'react-native'
import { navigate } from '@/navigator/RootNavigation.js';

import { SearchHeader } from '@/components/index';
import RootList from './RootList';
import ContentList from './ContentList';


import { API_HOME } from '@/api';
import { Screen } from '@/utils'


const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const pixelRatio = PixelRatio.get()

export default class ClassifyPage extends Component {
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
            categories: [],
            categoryActivedId: null,
            current: {}
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
        this.fetch();
    }

    fetch = async () => {
        this.setState({
            loading: true
        })
        const categories = await API_HOME.getCategory();
        this.state.current = categories[0];
        this.setState({
            categories: categories,
            loading: false
        })

    }


    onSelectedCategoryItem = (item) => {

        this.setState({
            current: item
        })
        console.log(item, "itemitemitem")
        let params = {
            category_id: item.category_id
        }
        navigate('GoodList',params)

    }


    render() {
        const { animateOpacity } = this;
        const { focusData, loading, menuData, offsetY, resData, categories, current } = this.state;



        if (loading) {
            return <View style={styles.loading} >
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        }
        // console.log(menuData, "menuData ====")

        return <View  >
            <SearchHeader offsetY={offsetY} opacity={this.animateOpacity} navigate={navigate} />
            <View style={styles.wrap}  >
                <View style={styles.rootList} >
                    <RootList data={categories} onSelectedCategoryItem={this.onSelectedCategoryItem} current={current} />
                </View>
                <View style={styles.contentList} >
                    <ContentList data={current} />
                </View>
            </View>
        </View>
    }
}



const styles = StyleSheet.create({
    container: {

    },
    wrap: {
        flexDirection: 'row',
        paddingTop: 60
    },
    rootList: {
        width: 100
    },
    contentList: {
        flex: 1
    },
    loading: {
        height: Screen.sHeight - 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    }
});