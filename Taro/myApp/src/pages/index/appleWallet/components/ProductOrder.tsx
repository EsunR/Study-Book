import { View, Text } from "@tarojs/components";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { IProductOrder } from "../interface";
import styles from "../index.less";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { CardListState, CardListStoreAction } from "../store/type";
import classNames from "classnames";
import { createSelectorQuery, getSystemInfoSync } from "@tarojs/taro";

const WINDOW_HEIGHT = getSystemInfoSync().windowHeight;

const BOTTOM_HEIGHT = 100;

const ProductOrder: React.FC<{
  order: IProductOrder;
  index: number;
}> = (props) => {
  const { order, index } = props;
  const [cardOffset, setCardOffset] = useState<number>(); // 卡片堆叠时的位置偏移量
  const { pickedCardId, expandedOrderId } = useSelector<
    CardListState,
    CardListState
  >((state) => state);
  const dispatch = useDispatch<Dispatch<CardListStoreAction>>();

  // Memo
  // 生订单是否堆叠在下面
  const stacked = useMemo(() => pickedCardId !== undefined, [pickedCardId]);

  // Handle
  const handleDesClick = () => {
    if (pickedCardId !== undefined) {
      // 当前有单独被 pick 的生产卡，点击订单时应该收起被 pick 的生产卡
      dispatch({
        type: "UPDATE_PICKED_CARD_ID",
        payload: undefined,
      });
    } else {
      // 当前没有单独被 pick 的生产卡，点击订单的时候应该展开该订单
      if (order.code === expandedOrderId) {
        dispatch({
          type: "UPDATE_EXPANDED_ORDER_ID",
          payload: undefined,
        });
      } else {
        dispatch({
          type: "UPDATE_EXPANDED_ORDER_ID",
          payload: order.code,
        });
      }
    }
  };

  // Effect
  useEffect(() => {
    if (pickedCardId !== undefined) {
      // 获取生产卡 layout 信息
      const currentCardDom = createSelectorQuery().select(
        `#product-order-${order.code}`
      );
      currentCardDom.boundingClientRect().exec((layouts) => {
        const top = layouts?.[0]?.top;
        if (typeof top === "number") {
          setCardOffset(WINDOW_HEIGHT - (BOTTOM_HEIGHT - index * 20) - top);
        } else {
          setCardOffset(undefined);
        }
      });
    } else {
      setCardOffset(undefined);
    }
  }, [pickedCardId, order]);

  return (
    <View
      className={classNames(styles.productOrder, {
        [styles.closed]: expandedOrderId !== order.code,
      })}
      style={{
        backgroundColor: order.color,
        transform:
          stacked && typeof cardOffset === "number"
            ? `translateY(${cardOffset}px)`
            : undefined,
      }}
      id={`product-order-${order.code}`}
    >
      <View className="desc-wrapper" onClick={handleDesClick}>
        <Text>{order.code}</Text>
      </View>

      {/* 生产卡列表 */}
      <View className="product-card-wrapper">
        {order.productCard.map((item) => (
          <ProductCard
            card={item}
            color={order.color}
            closed={expandedOrderId !== order.code}
            parentOffset={cardOffset}
            order={order}
          />
        ))}
      </View>
      {/* 生产卡列表 */}
    </View>
  );
};

export default ProductOrder;
