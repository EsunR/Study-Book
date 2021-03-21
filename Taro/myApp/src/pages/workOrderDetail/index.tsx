import { ScrollView, View } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import ProductOrder from "./components/ProductOrder";
import styles from "./index.less";
import { IProductOrder } from "./types";
import store from "./store";
import { getSystemInfoSync } from "@tarojs/taro";
import { CardListState } from "./store/type";

const mockCardList: IProductOrder[] = [
  {
    id: 1,
    code: "1",
    color: "#56B946",
    productCard: [
      {
        id: 11,
        code: "S211324",
        type: "normal"
      },
      {
        id: 12,
        code: "S211326",
        type: "return"
      },
      {
        id: 13,
        code: "S211325",
        type: "wait"
      }
    ]
  },
  {
    id: 2,
    code: "2",
    color: "#E47B5D",
    productCard: [
      {
        id: 21,
        code: "2-1",
        type: "normal"
      },
      {
        id: 22,
        code: "2-2",
        type: "expected"
      },
      {
        id: 23,
        code: "1-3",
        type: "expected"
      }
    ]
  },
  {
    id: 3,
    code: "3",
    color: "#333B71",
    productCard: [
      {
        id: 31,
        code: "3-1",
        type: "expected"
      },
      {
        id: 32,
        code: "3-2",
        type: "wait"
      },
      {
        id: 33,
        code: "3-3",
        type: "return"
      }
    ]
  },
  {
    id: 4,
    code: "4",
    color: "#E3EBF5",
    productCard: [
      {
        id: 41,
        code: "4-1",
        type: "normal"
      },
      {
        id: 42,
        code: "4-2",
        type: "normal"
      },
      {
        id: 43,
        code: "4-3",
        type: "normal"
      }
    ]
  }
];

const WINDOW_HEIGHT = getSystemInfoSync().windowHeight;

const WorkOrderDetailContent: React.FC<any> = () => {
  const [scrollable, setScrollable] = useState<boolean>(true);
  const { pickedCardId } = useSelector<CardListState, CardListState>(
    state => state
  );

  useEffect(() => {
    if (pickedCardId === undefined) {
      setScrollable(true);
    } else {
      setScrollable(false);
    }
  }, [pickedCardId]);

  return (
    <ScrollView
      className={styles.container}
      scrollY={scrollable}
      style={{ height: WINDOW_HEIGHT }}
    >
      <View className='scroll-content-wrapper'>
        {mockCardList.map((item, index) => (
          <ProductOrder order={item} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

const WorkOrderDetail: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <WorkOrderDetailContent />
    </Provider>
  );
};

export default WorkOrderDetail;
