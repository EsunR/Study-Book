import { View, Text } from "@tarojs/components";
import React, {
  Dispatch,
  LegacyRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IProductCard, IProductOrder } from "../interface";
import styles from "../index.less";
import { useDispatch, useSelector } from "react-redux";
import { CardListState, CardListStoreAction } from "../store/type";
import classNames from "classnames";
import { createSelectorQuery } from "@tarojs/taro";

const ProductCard: React.FC<{
  card: IProductCard;
  order: IProductOrder;
  color: string;
  closed: boolean;
  parentOffset: number | undefined;
}> = (props) => {
  const { card, color, closed, parentOffset, order } = props;
  const [pickedOffset, setPickedOffset] = useState<number>();
  const dispatch = useDispatch<Dispatch<CardListStoreAction>>();
  const { pickedCardId } = useSelector<CardListState, CardListState>(
    (state) => state
  );

  const picked = useMemo<boolean>(() => pickedCardId === card.code, [
    pickedCardId,
    card,
  ]);

  const handleOnCardClick = () => {
    if (pickedCardId === card.code) {
      // 如果当前生产卡已被 picked，点击生产卡后不执行操作
      return;
    }
    if (closed) {
      // 如果当前生产订单未展开，点击后展开生产订单
      dispatch({
        type: "UPDATE_EXPANDED_ORDER_ID",
        payload: order.code,
      });
    } else {
      dispatch({
        type: "UPDATE_PICKED_CARD_ID",
        payload: card.code,
      });
    }
  };

  // Effect
  useEffect(() => {
    if (picked && typeof parentOffset === "number") {
      createSelectorQuery()
        .select(`#product-card-${card.code}`)
        .boundingClientRect()
        .exec((layouts) => {
          const productCardTop = layouts[0].top;
          setPickedOffset(productCardTop + parentOffset);
        });
    } else {
      setPickedOffset(undefined);
    }
  }, [picked, card, parentOffset]);

  return (
    <View
      className={classNames(styles.productCard, "test", {
        [styles.closed]: closed,
        [styles.picked]: pickedCardId === card.code,
      })}
      style={{
        backgroundColor: color,
        transform:
          picked && typeof pickedOffset === "number"
            ? `translateY(${-pickedOffset}px)`
            : undefined,
      }}
      id={`product-card-${card.code}`}
      onClick={handleOnCardClick}
    >
      {/* 进度条 */}
      <View className="process-info">
        <Text>{card.code}</Text>
      </View>
      {/* 进度条 */}

      {/* 详情(折叠内容) */}
      <View className="content">
        <Text>详细信息</Text>
      </View>
      {/* 详情(折叠内容) */}
    </View>
  );
};

export default ProductCard;
