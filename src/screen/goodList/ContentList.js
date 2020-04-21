import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ActivityIndicator, Button,
    Animated, ScrollView, FlatList,
    Alert, Dimensions, PixelRatio, StatusBar, NativeModules, Image
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';


import { API_HOME } from '@/api';
import { Screen } from '@/utils'
import { Colors, Dimens } from '../../config'




export default class ContentList extends Component {
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


    }

    renderItem = ({ item }) => {
        let v = item;
        return <View key={v.goods_id} style={styles.item} >
            <Image source={{ uri: v.thumbnail }} style={styles.itemImage} />
            <View>
                <Text style={styles.itemTitle}  >{v.name}</Text>
                <Text style={styles.itemPrice}  >{v.price}</Text>
                <View>
                    <Text
                        style={styles['item_comment_text_single']}
                        allowFontScaling={false}>
                        {item.comment_num}条评论
            </Text>
                    <Text
                        style={styles['item_comment_text_single']}
                        allowFontScaling={false}>
                        {item.grade}%好评     </Text>
                    <Text
                        style={styles['item_comment_text_single']}
                        allowFontScaling={false}>
                        {item.buy_count}人已购买
              </Text>

                </View>
            </View>

        </View>
    }

    render() {
        const { data } = this.props;

        return <FlatList
            data={data}
            renderItem={this.renderItem}
        />
    }


}



const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // height: 50,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.borderColor,
        // backgroundColor: Colors.white
    },
    item: {
        flexDirection: 'row'
    },
    itemTitle: {

    },
    itemPrice: {
        color: Colors.red
    },
    itemImage: {
        width: 100,
        height: 100
    },

    item_comment_text_single: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    item_comment_text_double: {
        textAlign: 'center',
        alignSelf: 'center',
        paddingRight: 10,
    },
    sales: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 5
    },
    text: {
        fontSize: 16
    },

});