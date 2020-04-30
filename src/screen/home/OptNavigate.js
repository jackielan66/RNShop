/**
 * Created by Andste on 2018/9/30.
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Foundation } from '../../utils';
import { navigate } from '../../navigator/RootNavigation';

export default class OptNavigate extends PureComponent {
    _onPress = () => {
        const { data: block } = this.props;
        let type, param;
        if (block.operation_type) {
            type = block.operation_type;
            param = block.operation_param;
        } else {
            type = block.opt_type;
            param = block.opt_value;
        }
        console.log(data,"data");
        console.log(block,"block");
        return;
        switch (type) {
            case 'URL':
                if (param.indexOf('/') === 0) {
                    if (param.lastIndexOf('/') !== 0) {
                        const __key = Foundation.firstUpperCase(
                            param.substring(1, param.lastIndexOf('/')),
                        );
                        const __param = param.substring(
                            param.lastIndexOf('/') + 1,
                            param.length,
                        );
                        navigate(__key, { id: __param });
                    } else {
                        const __key = Foundation.firstUpperCase(
                            param.substring(1, param.length),
                        );
                        navigate(__key);
                    }
                }
                navigate('WebView', { param });
                break;
            case 'KEYWORD':
                navigate('GoodsList', { keyword: param });
                break;
            case 'GOODS':
                navigate('Goods', { id: param });
                break;
            case 'SHOP':
                navigate('Shop', { id: param });
                break;
            case 'CATEGORY':
                navigate('GoodsList', { cat_id: param });
                break;
            default:
                break;
        }
    };

    render() {
        const { children, opacity = 0.2, ...props } = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                {...props}>
                {children}
            </TouchableOpacity>
        );
    }
}
