import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import QRcodeScannerView from './QRcodeScannerView'
import SearchBar from './SearchBar'
import { Screen } from '@/utils/index'
import { Colors, Dimens } from '../config'

export default class SearchHeader extends Component {
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
        const { opacity, offsetY } = this.props;

        let wrapBackgroundColor = offsetY < 50 ? Colors.transparent : Colors.primary
        let textColor = offsetY < 50 ? Colors.white : Colors.black
        let textColorStyle = {
            color: textColor
        }

        let _ionicStyle = { ...styles.icon, ...textColorStyle };
        let _textStyle = { ...styles.icon_text, ...textColorStyle };

        return <Animated.View style={[styles.wrap,{opacity:opacity}]} >
            <View style={styles.container} >
                <View style={styles.leftArea} >
                    <TouchableOpacity style={[styles.touchable]} onPress={this.onShowQr} >
                        <Icon name="ios-qr-scanner" style={_ionicStyle} />
                        <Text style={_textStyle}>扫一扫</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <SearchBar />
                </View>
                <View>
                    <TouchableOpacity style={styles.touchable} >
                        <Icon name="ios-person" style={_ionicStyle} />
                        <Text style={_textStyle} >我的</Text>
                    </TouchableOpacity>
                </View>
                <QRcodeScannerView cancelModal={this.onCancel} visible={modal.visible} />
            </View>
        </Animated.View>
    }
}



const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Screen.width,
        height: 56,
        zIndex: 99990
        // backgroundColor:'trant'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    leftArea: {
        // fontSize:20
    },
    icon: {
        fontSize: 25
    },
    icon_text: {
        fontSize: 10,
        // alignContent: 'center',
    },
    touchable: {
        width: 40,
        height: 40,
        alignItems: 'center',
    }
});
