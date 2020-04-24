import { Dimensions, PixelRatio } from 'react-native';

export const width: Number = Dimensions.get('window').width;
export const height: Number = Dimensions.get('window').height;
export const sWidth: Number = Dimensions.get('screen').width;
export const sHeight: Number = Dimensions.get('screen').height;

// 屏幕最小像素
export const onePixel = 1 / PixelRatio.get();