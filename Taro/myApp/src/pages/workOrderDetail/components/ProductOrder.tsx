import { View, Text } from "@tarojs/components";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { IProductOrder } from "../types";
import styles from "../index.less";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { CardListState, CardListStoreAction } from "../store/type";
import classNames from "classnames";
import { createSelectorQuery, getSystemInfoSync } from "@tarojs/taro";
import DescriptionRow from "./DescriptionRow";
import { judgedIsDeepColor } from "../controller";

const WINDOW_HEIGHT = getSystemInfoSync().windowHeight;
const BOTTOM_HEIGHT = 100;

const ProductOrder: React.FC<{
  order: IProductOrder;
  index: number;
}> = props => {
  const { order, index } = props;
  const [cardOffset, setCardOffset] = useState<number>(); // 卡片堆叠时的位置偏移量
  const { pickedCardId } = useSelector<CardListState, CardListState>(
    state => state
  );
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<CardListStoreAction>>();

  // Memo
  // 生订单是否堆叠在下面
  const stacked = useMemo(() => pickedCardId !== undefined, [pickedCardId]);

  const isDeepColor = useMemo<boolean>(() => {
    return judgedIsDeepColor(order.color);
  }, [order]);

  // Handle
  const handleDesClick = () => {
    if (pickedCardId !== undefined) {
      // 当前有单独被 pick 的生产卡，点击订单时应该收起被 pick 的生产卡
      dispatch({
        type: "UPDATE_PICKED_CARD_ID",
        payload: undefined
      });
    } else {
      setExpanded(!expanded);
    }
  };

  // Effect
  useEffect(() => {
    if (pickedCardId !== undefined) {
      // 获取生产卡 layout 信息
      const currentCardDom = createSelectorQuery().select(
        `#product-order-${order.id}`
      );
      currentCardDom.boundingClientRect().exec(layouts => {
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
        [styles.closed]: !expanded
      })}
      style={{
        backgroundColor: order.color,
        transform:
          stacked && typeof cardOffset === "number"
            ? `translateY(${cardOffset}px)`
            : undefined
      }}
      id={`product-order-${order.id}`}
    >
      {/* 生产订总信息 */}
      <View
        className={classNames("desc-wrapper", { "dark-text": !isDeepColor })}
        onClick={handleDesClick}
      >
        <View className="order-title">
          <Text>D21012235-1-绿色</Text>
        </View>
        <View className="desc">
          <DescriptionRow
            details={[
              {
                title: "已完成/下单数量",
                content: `${5400}/${18000}`,
                unit: "米",
                span: 3
              },
              { title: "已发货数量", content: `${3000}`, unit: "米", span: 2 },
              { title: "库存数量", content: `${2400}`, unit: "米", span: 2 }
            ]}
          />
        </View>
      </View>
      {/* 生产订总信息 */}

      {/* 生产卡列表 */}
      <View className="product-card-wrapper">
        {order.productCard.map(item => (
          <ProductCard
            card={item}
            color={order.color}
            expanded={expanded}
            parentOffset={cardOffset}
            order={order}
            requestExpand={() => {
              setExpanded(true);
            }}
          />
        ))}
      </View>
      {/* 生产卡列表 */}
    </View>
  );
};

export default ProductOrder;
