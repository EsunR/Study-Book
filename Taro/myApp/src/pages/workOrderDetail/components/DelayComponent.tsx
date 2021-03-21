import { View } from "@tarojs/components";
import React, { useEffect, useState } from "react";

const DelayComponent: React.FC<{ delay: number }> = ({ delay, children }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay);
  }, []);

  return show ? children : null;
};

export default DelayComponent;
