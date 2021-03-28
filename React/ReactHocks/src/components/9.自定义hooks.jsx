import React, { useState, useEffect, useCallback } from "react";

function useWinSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return size;
}

function CustomHooks() {
  const size = useWinSize();
  return (
    <div>
      <h2>自定义Hooks</h2>
      <div>
        页面的大小为：{size.width} * {size.height}
      </div>
    </div>
  );
}

export default CustomHooks;
