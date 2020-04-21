/**
 * Created by Andste on 2019-01-17.
 */
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../config';
import { navigate } from '@/navigator/RootNavigation';

export default function () {
    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../../images/icon-cry-face.png')}
            />
            <Text style={styles.title}>您还未登录，不能查看购物车</Text>
            <TouchableOpacity>
                <Text>test</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btn}>
                <Text style={styles.btn_text}>去登录</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.transparent,
        paddingTop: 100,
    },
    icon: {
        width: 50,
        height: 50,
        tintColor: '#CCC',
    },
    title: {
        marginTop: 10,
        color: Colors.text,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 30,
        marginTop: 10,
        backgroundColor: Colors.main,
        borderRadius: 2,
    },
    btn_text: {
        color: '#FFF',
    },
});
