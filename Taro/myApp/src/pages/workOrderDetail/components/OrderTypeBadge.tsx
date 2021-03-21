import { View } from "@tarojs/components";
import React from "react";
import { ProductType } from "../types";
import styles from "../index.less";

const OrderTypeBadge: React.FC<{
  type: ProductType;
  count?: number;
}> = ({ type, count }) => {
  return <View className={styles.orderTypeBadge}></View>;
};

export default OrderTypeBadge;
