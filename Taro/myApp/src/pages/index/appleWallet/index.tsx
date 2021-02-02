import { ScrollView } from "@tarojs/components";
import React, { useState } from "react";
import { Provider } from "react-redux";
import ProductOrder from "./components/ProductOrder";
import styles from "./index.less";
import { IProductOrder } from "./interface";
import store from "./store";

const mockCardList: IProductOrder[] = [
  {
    code: "1",
    color: "#579B52",
    productCard: [
      {
        code: "1-1",
      },
      {
        code: "1-2",
      },
      {
        code: "1-3",
      },
    ],
  },
  {
    code: "2",
    color: "#E47B5D",
    productCard: [
      {
        code: "2-1",
      },
      {
        code: "2-2",
      },
      {
        code: "2-3",
      },
    ],
  },
  {
    code: "3",
    color: "#333B71",
    productCard: [
      {
        code: "3-1",
      },
      {
        code: "3-2",
      },
      {
        code: "3-3",
      },
    ],
  },
  {
    code: "4",
    color: "pink",
    productCard: [
      {
        code: "4-1",
      },
      {
        code: "4-2",
      },
      {
        code: "4-3",
      },
    ],
  },
];

const AppleWallet: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <ScrollView className={styles.container}>
        {mockCardList.map((item, index) => (
          <ProductOrder order={item} index={index} />
        ))}
      </ScrollView>
    </Provider>
  );
};

export default AppleWallet;
