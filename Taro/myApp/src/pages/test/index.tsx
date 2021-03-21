import { Button, View } from "@tarojs/components";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./index.less";

const Test: React.FC<any> = () => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <View className={styles.boxWrapper}>
      <Button
        onClick={() => {
          setFlag(!flag);
        }}
      >
        点击
      </Button>
      <View className={classNames("box", { open: flag })} />
    </View>
  );
};

export default Test;
