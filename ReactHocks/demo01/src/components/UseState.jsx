import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("产生副作用，类似于 ComponentDidUpdate 与 ComponentDidMount");
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点我
      </button>
    </div>
  );
}

export default Example;
