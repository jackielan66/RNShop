import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import QRcodeScannerView from './QRcodeScannerView'
import SearchBar from './SearchBar'
import { Screen } from '@/utils/index'
import { Colors, Dimens } from '@/config'

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
        const { opacity } = this.props;

        return <View style={styles.wrap} >
            <View style={styles.container} >
                <View style={styles.leftArea} >
                    <TouchableOpacity style={[styles.touchable]} onPress={this.onShowQr} activeOpacity={0.3} >
                        <Icon name="ios-qr-scanner" style={[styles.icon]} />
                        <Text style={[styles.icon_text]}>扫一扫</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <SearchBar />
                </View>
                <View>
                    <TouchableOpacity style={styles.touchable} activeOpacity={0.3} >
                        <Icon name="ios-person" style={[styles.icon]} />
                        <Text style={[styles.icon_text]} >我的</Text>
                    </TouchableOpacity>
                </View>
                <QRcodeScannerView cancelModal={this.onCancel} visible={modal.visible} />
            </View>
        </View>


    }
}



const styles = StyleSheet.create({
    wrap: {
        // position: 'absolute',
        top: 0,
        left: 0,
        width: Screen.width,
        height: 56,
        zIndex: 99990,
        backgroundColor: Colors.primary
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
        alignContent: 'center',
    },
    touchable: {
        width: 40,
        height: 40,
        alignItems: 'center',
    }
});
