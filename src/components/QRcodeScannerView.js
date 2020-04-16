/**
 * Created by Andste on 2017/9/14.
 * 二维码页面
 */

import React, { PureComponent } from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRcodeScannerView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }


    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    _closeModal = () => {
        this.props.cancelModal && this.props.cancelModal()
    }

    render() {
        let { visible } = this.props;
        // console.log(visible, "visible")
        return (
            <Modal visible={visible} title=""  >

                <StatusBar barStyle="light-content" />
                <View style={styles.header}  >
                    <TouchableOpacity
                        style={[styles.icon]  ,[styles.back]}
                        onPress={this._closeModal}
                        hitSlop={{ top: 100, left: 100, right: 100, bottom: 100 }}>
                        <Icon name="ios-arrow-back" size={44} />
                    </TouchableOpacity>
                    <Text>扫一扫</Text>
                    <TouchableOpacity />
                </View>
                <QRCodeScanner
                    onRead={this.onSuccess}
                />
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    back: {
        width: 44,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.transparent,
    },

});
