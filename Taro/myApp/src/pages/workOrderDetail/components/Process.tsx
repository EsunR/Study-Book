import { View, Text } from "@tarojs/components";
import React from "react";
import classNames from "classnames";
import styles from "../index.less";

type ProcessItemProps = {
  name: string;
  time?: string;
};

const Icon: React.FC<{ isDarkText: boolean }> = ({ isDarkText }) => {
  return <View className='icon-container'></View>;
};

const ProcessItem: React.FC<ProcessItemProps & {
  currentProcess: "已完成" | "进行中" | "待进行";
}> = ({ currentProcess, ...processItemProps }) => {
  return (
    <View
      className={classNames("process-item", {
        active: currentProcess === "进行中"
      })}
    >
      <View className='ball'>{processItemProps.name}</View>
      {currentProcess === "进行中" ? <View className='outer-ball' /> : null}
      <View className='process-desc'>
        <View>{currentProcess}</View>
        {processItemProps.time ? (
          <View className='time'>{processItemProps.time}</View>
        ) : null}
      </View>
    </View>
  );
};

const Process: React.FC<{
  prev: ProcessItemProps;
  current: ProcessItemProps;
  next: ProcessItemProps;
  className?: string;
  isDarkText?: boolean;
}> = ({ prev, current, next, className, isDarkText = false }) => {
  return (
    <View
      className={classNames(styles.process, className, {
        [styles.darkText]: isDarkText
      })}
    >
      <Icon isDarkText={isDarkText} />
      <ProcessItem {...prev} currentProcess='已完成' />
      <Icon isDarkText={isDarkText} />
      <ProcessItem {...current} currentProcess='进行中' />
      <Icon isDarkText={isDarkText} />
      <ProcessItem {...next} currentProcess='待进行' />
      <Icon isDarkText={isDarkText} />
    </View>
  );
};

export default Process;
