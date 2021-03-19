import { View, Text } from "@tarojs/components";
import React, { Dispatch, useEffect, useMemo, useState } from "react";
import { IProductCard, IProductOrder } from "../types";
import styles from "../index.less";
import { useDispatch, useSelector } from "react-redux";
import { CardListState, CardListStoreAction } from "../store/type";
import classNames from "classnames";
import { createSelectorQuery, getSystemInfoSync } from "@tarojs/taro";
import DescriptionRow from "./DescriptionRow";
import Process from "./Process";
import DelayComponent from "./DelayComponent";
import { judgedIsDeepColor } from "../controller";

const WINDOW_WIDTH = getSystemInfoSync().windowWidth;

const ProductCard: React.FC<{
  card: IProductCard;
  order: IProductOrder;
  color: string;
  expanded: boolean;
  parentOffset: number | undefined;
  requestExpand: () => void;
}> = props => {
  const { card, color, expanded, parentOffset, requestExpand } = props;
  const [pickedOffset, setPickedOffset] = useState<number>();
  const dispatch = useDispatch<Dispatch<CardListStoreAction>>();
  const { pickedCardId } = useSelector<CardListState, CardListState>(
    state => state
  );

  // Memo
  const picked = useMemo<boolean>(() => pickedCardId === card.id, [
    pickedCardId,
    card
  ]);

  const isDeepColor = useMemo<boolean>(() => {
    return judgedIsDeepColor(color);
  }, [color]);

  // Handle
  const handleOnCardClick = () => {
    if (pickedCardId === card.id) {
      // 如果当前生产卡已被 picked，点击生产卡后不执行操作
      return;
    }
    if (!expanded) {
      // 如果当前生产订单未展开，点击后展开生产订单
      requestExpand();
    } else {
      dispatch({
        type: "UPDATE_PICKED_CARD_ID",
        payload: card.id
      });
    }
  };

  // Effect
  useEffect(() => {
    if (picked && typeof parentOffset === "number") {
      createSelectorQuery()
        .select(`#product-card-${card.id}`)
        .boundingClientRect()
        .exec(layouts => {
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
        [styles.closed]: !expanded,
        [styles.picked]: pickedCardId === card.id
      })}
      style={{
        backgroundColor: color,
        transform:
          picked && typeof pickedOffset === "number"
            ? `translateY(${-pickedOffset}px)`
            : undefined
      }}
      id={`product-card-${card.id}`}
      onClick={handleOnCardClick}
    >
      {/* 卡号 & 进度条 & Badge */}
      <View
        className={classNames("process-info", { "dark-text": !isDeepColor })}
      >
        {/* Code */}
        <View className='at-col at-col-4'>
          <Text>{card.code}</Text>
        </View>
        {/* Code */}
        {/* Progress */}
        <View className='at-col at-col-8'>
          <View className='at-row at-row__align--center'>
            <Text className='at-col at-col-3' style={{ textAlign: "right" }}>
              {5}/{9}
            </Text>
          </View>
        </View>
        {/* Progress */}
        {/* Badge */}
        {/* <View className="at-col at-col-2">
          <View className="at-row at-row__justify--end">
            <Text>回</Text>
          </View>
        </View> */}
        {/* Badge */}
      </View>
      {/* 卡号 & 进度条 & Badge */}

      {/* 详情(折叠内容) */}
      <View className={classNames("content", { "dark-text": !isDeepColor })}>
        {/* 一级折叠内容 */}
        <View className={classNames("chart-desc-area", { picked })}>
          <View className={classNames("chart-wrapper", { centered: picked })}>
            {picked ? <DelayComponent delay={900}></DelayComponent> : null}
          </View>

          <DescriptionRow
            textAlign='center'
            style={{
              width: WINDOW_WIDTH * 0.7
            }}
            className={classNames("description", { hide: picked })}
            details={[
              { title: "成品入库数量", content: "1800", unit: "米", span: 6 },
              { title: "投坯数量", content: "2118", unit: "米", span: 6 }
            ]}
          />
        </View>
        {/* 一级折叠内容 */}
        {/* 二级折叠内容 */}
        <View
          className={classNames("work-card-detail-area", { expanded: picked })}
        >
          <DescriptionRow
            className='work-card-detail-desc'
            textAlign='center'
            details={[
              { title: "生产卡数量", content: "1800", unit: "米" },
              { title: "入库数量", content: "-" },
              { title: "投坯数量", content: "2118", unit: "米" }
            ]}
          />
          <DescriptionRow
            style={{ marginTop: 40 }}
            className='work-card-detail-desc'
            textAlign='center'
            details={[
              { title: "出库数量", content: "-" },
              { title: "缩率", content: "-" },
              { title: "当前工序停留", content: "8.4", unit: "小时" }
            ]}
          />
          <View className='process-wrapper'>
            <Process
              prev={{ name: "染色", time: "02-02 14:30" }}
              current={{ name: "染色" }}
              next={{ name: "染色" }}
              isDarkText={!isDeepColor}
            />
          </View>
        </View>
        {/* 二级折叠内容 */}
      </View>
      {/* 详情(折叠内容) */}
    </View>
  );
};

export default ProductCard;
