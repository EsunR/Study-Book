import React from "react";

interface IHelloWorldProps {
  message?: string;
}

const HelloWorld: React.FunctionComponent<IHelloWorldProps> = (props) => {
  return <h2>{props.message}</h2>;
};

// 为组件提供默认的 props
HelloWorld.defaultProps = {
  message: "Default Props",
};

export default HelloWorld;
