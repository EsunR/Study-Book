import React, { useRef } from "react";

function UseRefDemo() {
  // 创建引用
  const inputEl = useRef(null);

  // 设置点击事件，点击后，input被填入文字
  const handleButtonClick = () => {
    inputEl.current.value = "Hello World";
  };

  return (
    <div>
      <input type="text" ref={inputEl} />
      <button onClick={handleButtonClick}>在input中展示文字</button>
    </div>
  );
}

export default UseRefDemo;
