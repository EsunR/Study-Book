import React, { useReducer } from "react";

function ReducerDemo() {
  const defaultState = {
    count: 0
  };
  const [state, dispatch] = useReducer((state, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action) {
      case "add":
        newState.count = state.count + 1;
        return newState;
      case "sub":
        newState.count = state.count - 1;
        return newState;
      default:
        return state;
    }
  }, defaultState);
  return (
    <div>
      <h2>现在的分数是{state.count}</h2>
      <button onClick={() => dispatch("sub")}>Decrement</button>
      <button onClick={() => dispatch("add")}>Increment</button>
    </div>
  );
}

export default ReducerDemo;
