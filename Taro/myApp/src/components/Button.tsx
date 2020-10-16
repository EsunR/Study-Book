import { Button } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import React from "react";

const BmButton: React.FC<Partial<ButtonProps>> = (props) => {
  return (
    // 兼容 QQ 小程序
    <Button appBundleid="" appConnectId="" appPackagename="" {...props}>
      {props.children}
    </Button>
  );
};

export default BmButton;
