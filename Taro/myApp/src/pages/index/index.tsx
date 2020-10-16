import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";
import BmButton from "../../components/Button";

const Index: React.FC<any> = () => {
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <BmButton>测试</BmButton>
    </View>
  );
};

export default Index;
