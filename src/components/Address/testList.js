import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  DeviceEventEmitter
} from "react-native";
import {
  screenW,
  screenH,
  scaleSizeW,
  scaleSizeH,
  __IOS__,
  setSpText
} from "../util/screenUtil";
import DrawableIndex from "../res/DrawableIndex";
import Api from "../util/api";
///   省、市、区、城镇
const PROVINCE = 0,
  CITY = 1,
  AREA = 2,
  TOWN = 3;

///地址列表 —— TAB下的列表
export default class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressList: []
    };
  }

  componentDidMount() {
    // console.log("打印输出-componentDidMount", this.props.type);
    ///请求省、市、区、乡镇数据列表
    this.requestAddressList(addresses => {
      if (addresses && addresses.length > 0) {
        this.setState({ addressList: addresses });
      } else {
        ///选择地址完成
        this.props.doneSelect();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log("打印输出-componentWillReceiveProps", nextProps);
    // if (nextProps.id != this.props.id) {
    //   ///请求省、市、区、乡镇数据列表
    //   this.requestAddressList(addresses => {
    //     this.setState({ addressList: addresses });
    //   });
    // }
  }

  componentWillUnmount() {
    // console.log("打印输出-componentWillUnmount")
  }

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "white",
          borderColor: "#EDEDED",
          borderTopWidth: 1
        }}
        data={this.state.addressList}
        renderItem={this._renderItem}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <Linegap />}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => this._onChangeIndex(item)}
        style={{
          height: scaleSizeH(80),
          width: "100%",
          alignItems: "center",
          paddingHorizontal: scaleSizeW(33),
          justifyContent: "space-between",
          flexDirection: "row"
        }}
      >
        <Text
          style={{
            fontSize: setSpText(28),
            color: item.isSelected ? "#D6382F" : "#666666"
          }}
        >
          {item.name}
        </Text>
        {item.isSelected ? (
          <Image
            style={{
              width: scaleSizeW(30),
              height: scaleSizeW(18),
              marginLeft: 25
            }}
            source={DrawableIndex.public.ic_public_selected}
          />
        ) : (
          <Image
            style={{
              width: scaleSizeW(30),
              height: scaleSizeW(18),
              marginLeft: 25
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  _onChangeIndex = item => {
    let newList = this.state.addressList.map((newItem, newIndex) => {
      if (newItem.id == item.id) {
        newItem.isSelected = true;
        item = newItem;
        item.type = this.props.type;
      } else {
        newItem.isSelected = false;
      }

      return newItem;
    });
    this.props.onPress(item);
    if (this.props.type == TOWN) {
      ///选择地址完成
      setTimeout(() => {
        this.props.doneSelect();
      }, 3);
    }
  };

  ///请求-省份、市、区、乡镇数据列表
  requestAddressList(callBack) {
    let { contentURL, paramId, type, province, city, area, town } = this.props;
    Api.post(contentURL, paramId, res => {
      if (res.code == 200) {
        let list = res.data;
        newList = list.map((item, index) => {
          item.isSelected = false;
          if (province && Object.is(PROVINCE, type)) {
            if (item.id == province.id) {
              item.isSelected = true;
            }
          } else if (city && Object.is(CITY, type)) {
            if (item.id == city.id) {
              item.isSelected = true;
            }
          } else if (area && Object.is(AREA, type)) {
            if (item.id == area.id) {
              item.isSelected = true;
            }
          } else if (town && Object.is(TOWN, type)) {
            if (item.id == town.id) {
              item.isSelected = true;
            }
          }

          return item;
        });

        callBack(newList);
      }
    });
  }
}

//自定义组件 —— 底线
const Linegap = props => {
  return (
    <View
      style={{
        height: scaleSizeH(1),
        width: screenW,
        backgroundColor: "#F2F2F2"
      }}
    />
  );
};