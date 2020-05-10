import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
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
import { BaseDialog } from "react-native-pickers";
import { Button } from "react-native-elements";
import DrawableIndex from "../res/DrawableIndex";
import ScrollAbleView from "react-native-scrollable-tab-view";
import Api from "../util/api";
import {
  getPrinceList,
  getCityList,
  getAreaList,
  getTownList
} from "../pages/const/URL";
import AddressListProvice from "./AddressList";
import AddressListCity from "./AddressList";
import AddressListArea from "./AddressList";
import AddressListTown from "./AddressList";
///   省、市、区、城镇
const PROVINCE = 0,
  CITY = 1,
  AREA = 2,
  TOWN = 3;

export default class CustomerDialogSheet extends BaseDialog {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  _getContentPosition() {
    return { justifyContent: "flex-end", alignItems: "center" };
  }

  show(text) {
    super.show(null, { text: text });
  }

  renderContent() {
    return (
      <View
        style={{
          width: this.mScreenWidth,
          backgroundColor: "#f8f8f8",
          minHeight: screenH * 0.6
        }}
      >
        <AddressContainer
          onAddressObjSelected={local => {
            // console.log("打印输出-onAddressObjSelected", local);
            this.props.onAddressObjSelected(local);
            this.dismiss();
          }}
        />
      </View>
    );
  }
}

///地址选择-地址容器
class AddressContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      province: { name: null, id: null }, //省份
      city: { name: null, id: null }, //市
      area: { name: null, id: null }, //区
      town: { name: null, id: null } //乡镇
    };
  }

  _onChangeIndex = index => {
    // console.log("打印输出-_onChangeIndex", index);
  };

  componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollAbleView
          style={{
            height: scaleSizeH(80),
            backgroundColor: "white"
          }}
          scrollWithoutAnimation={true}
          tabBarActiveTextColor="#666666"
          tabBarInactiveTextColor="#FFFFFF"
          tabBarUnderlineStyle={{ height: 0 }}
          onChangeTab={({ i }) => this._onChangeIndex(i)}
          locked={true}
          renderTabBar={({ tabs, activeTab, goToPage }) => {
            this.goToPage = goToPage; //引用
            return (
              <DefaultAreaTabBar
                tabs={tabs}
                activeTab={activeTab}
                goToPage={goToPage}
              />
            );
          }}
        >
          <AddressListProvice
            province={this.state.province}
            doneSelect={this._done}
            key={PROVINCE}
            onPress={res => this._onItemClicked(res)}
            tabLabel={this.state.province.name || "请选择"}
            type={PROVINCE}
            paramId={{}}
            contentURL={getPrinceList}
          />
          {this.state.province.name && (
            <AddressListCity
              city={this.state.city}
              doneSelect={this._done}
              key={CITY}
              onPress={res => this._onItemClicked(res)}
              tabLabel={this.state.city.name || "请选择"}
              type={CITY}
              paramId={{ province_id: this.state.province.id }}
              contentURL={getCityList}
            />
          )}
          {this.state.city.name && (
            <AddressListArea
              area={this.state.area}
              doneSelect={this._done}
              key={AREA}
              onPress={res => this._onItemClicked(res)}
              tabLabel={this.state.area.name || "请选择"}
              type={AREA}
              paramId={{ city_id: this.state.city.id }}
              contentURL={getAreaList}
            />
          )}
          {this.state.area.name && (
            <AddressListTown
              town={this.state.town}
              doneSelect={this._done}
              key={TOWN}
              onPress={res => this._onItemClicked(res)}
              tabLabel={this.state.town.name || "请选择"}
              type={TOWN}
              paramId={{ area_id: this.state.area.id }}
              contentURL={getTownList}
            />
          )}
        </ScrollAbleView>
      </View>
    );
  }

  ///地址选择结束-并回调到方法：onAddressObjSelected
  _done = () => {
    this.props.onAddressObjSelected({
      province: this.state.province,
      city: this.state.city,
      area: this.state.area,
      town: this.state.town
    });
  };

  _onItemClicked(item) {
    switch (item.type) {
      case PROVINCE:
        this._setProvince(item);
        break;
      case CITY:
        this._setCity(item);
        break;

      case AREA:
        this._setArea(item);
        break;

      case TOWN:
        this._setTown(item);
        break;
    }
  }
  ///选中省份时候-赋值状态值
  _setProvince = province => {
    this.setState({
      show: true,
      province: province, //省份
      city: {}, //市
      area: {}, //区
      town: {} //乡镇
    });

    setTimeout(() => {
      this.goToPage(1);
    }, 1);
  };
  ///选中市时候-赋值状态值
  _setCity = city => {
    this.setState({
      city: city, //市
      area: {}, //区
      town: {} //乡镇
    });
    setTimeout(() => {
      this.goToPage(2);
    }, 1);
  };
  ///选中区域时候-赋值状态值
  _setArea = area => {
    this.setState({
      area: area, //区
      town: {} //乡镇
    });
    setTimeout(() => {
      this.goToPage(3);
    }, 1);
  };
  ///选中城镇时候-赋值状态值
  _setTown = town => {
    this.setState({
      town: town //乡镇
    });
  };
}

///定义地址选择的bar
const DefaultAreaTabBar = props => {
  let { goToPage, activeTab, tabs } = props;
  return (
    <View style={styles.tabContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={{ height: scaleSizeH(80), backgroundColor: "white" }}
      >
        {tabs.map((name, index) => {
          return (
            <View key={index} style={styles.tabItem}>
              <TouchableOpacity
                onPress={() => {
                  goToPage(index);
                }}
                style={styles.item}
              >
                <Text
                  style={{
                    color: activeTab == index ? "#D6382F" : "#666666",
                    fontSize: setSpText(28)
                  }}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: scaleSizeH(80),
    backgroundColor: "white",
    marginLeft: scaleSizeW(33)
  },
  text: {
    color: "white",
    fontSize: setSpText(30)
  },
  tabContainer: {
    height: scaleSizeH(80),
    backgroundColor: "#EDEDED",
    marginBottom: 1
  },
  tabItem: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "#0000"
  }
});