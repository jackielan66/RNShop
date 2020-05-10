/**
 * Created by Andste on 2017/9/14.
 * 二维码页面
 */

import React, { PureComponent } from 'react';
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';

import { F16Text } from '../../widgets/Text'
import AddressListContainer from './AddressListContainer'

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
        // console.log(visible, "visible")
        return (
            <Modal isOpen={visible} onClosed={() => this._closeModal()}
                style={[styles.modal]} position={"bottom"} backdropPressToClose={true}
            //  backdropContent={BContent}
            >
                <View style={[styles.header]} >
                    <TouchableOpacity onPress={this._closeModal} >
                        <F16Text>返回</F16Text>
                    </TouchableOpacity>
                    <F16Text>确认</F16Text>
                </View>

                <AddressListContainer />

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 300,
        zIndex: 9999999
        // flex: 1,
        // backgroundColor: '#000000',
    },
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40
    },
    back: {
        width: 44,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.transparent,
    },
    wrapper: {
        paddingTop: 50,
        flex: 1
    },






    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});
