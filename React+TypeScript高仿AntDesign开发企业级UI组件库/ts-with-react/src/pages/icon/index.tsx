import React from "react";
import Icon from "../../components/Icon";

const IconDemo: React.FC<any> = () => {
  return (
    <>
      <Icon icon="coffee" theme="danger" size="10x" />
      <Icon icon="comment-check" theme="danger" size="lg" />
    </>
  );
};

export default IconDemo;
