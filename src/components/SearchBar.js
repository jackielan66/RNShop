import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Dimens } from '@/config'
import { Screen } from '@/utils/index'


export default class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            modal: {
                visible: false
            }
        };
    }

    onShowQr = () => {
        this.setState({
            modal: {
                visible: true
            }
        })
    }

    onCancel = () => {
        this.setState({
            modal: {
                visible: false
            }
        })
    }


    render() {
        const { modal } = this.state;
        const { opacity } = this.props;

        return <TouchableOpacity style={styles.container} >
            <Icon style={styles.iconSize} name="ios-search" />
            <Text style={styles.textSize}>客官您要搜点什么？</Text>
        </TouchableOpacity>
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Screen.width - 88,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 6
    },
    textSize: {
        fontSize: Dimens.textInSearchBar,
        marginLeft:2

    },
    iconSize: {
        fontSize: Dimens.iconInSearchBar,
        
    },
});
