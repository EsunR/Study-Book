import React, { useEffect, useState } from "react";
import { View, Text, Input, Button } from "@tarojs/components";
import "./index.less";

const Index: React.FC<any> = () => {
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Button type="primary">测试</Button>
    </View>
  );
};

export default Index;
