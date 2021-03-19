import React, { CSSProperties } from "react";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import styles from "../index.less";

const DescriptionRow: React.FC<{
  details: { title: string; content: string; span?: number; unit?: string }[];
  textAlign?: "center" | "left" | "right";
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  unitStyle?: CSSProperties;
  className?: string;
}> = ({
  details,
  textAlign = "left",
  style,
  className,
  titleStyle,
  contentStyle,
  unitStyle
}) => {
  return (
    <View
      className={`${styles.descriptionRow} ${className}`}
      style={{ ...style }}
    >
      {details.map(item => (
        <View className='detail-item' style={{ flex: item.span || 1 }}>
          <View
            className={classNames("item-title")}
            style={{ textAlign, ...titleStyle }}
          >
            {item.title}
          </View>
          <View
            className={classNames("item-content")}
            style={{ textAlign, ...contentStyle }}
          >
            {item.content}
            {item.unit ? (
              <Text className='unit' style={unitStyle}>
                {item.unit}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
};

export default DescriptionRow;
