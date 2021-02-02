import React from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";
import BmButton from "../../components/Button";

const Index: React.FC<any> = () => {
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <BmButton
        onClick={() => {
          Taro.navigateTo({ url: "/pages/index/appleWallet/index" });
        }}
      >
        Apple 卡包
      </BmButton>
    </View>
  );
};

export default Index;
