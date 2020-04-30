/**
 * Created by Andste on 2017/9/14.
 * 二维码页面
 */

import React, { PureComponent } from 'react';
import {
    View,
    Modal,
    Button,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class AddressList extends PureComponent {
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
        console.log(visible, "visible")
        return (
            <View style={{ marginTop: 100 }}>
                <Modal visible={visible} title="地址选择" animationType="slide" >
                    <View style={styles.header}  >

                        <Text>扫一扫</Text>
                        <View style={styles.header}  >
                            <Button
                                title="隐藏"
                                onPress={this._closeModal}
                            />
                        </View>
                    </View>
           
                </Modal>
            </View>
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
