/**
 * Created by Andste on 2019-02-14.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/utils';
import { Dimens } from '../../config'

export default function Card({ children, style }) {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Screen.width - Dimens.paddingScreen * 2,
        height: 90,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#CCC',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1,
        height: 'auto',
        flexWrap: 'wrap',
    },
});
