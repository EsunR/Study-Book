import React, { createContext, useReducer } from "react";

export const ColorContext = createContext();

export const UPDATE_COLOR = "UPDATE_COLOR";

const reducer = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case UPDATE_COLOR:
      newState.color = action.payload;
      return newState;
    default:
      return state;
  }
};

export function Color(props) {
  const [state, dispatch] = useReducer(reducer, { color: "blue" });
  return (
    <ColorContext.Provider value={{ state, dispatch }}>
      {/* props.children 为当前组件内包含的子组件，相当于插槽 */}
      {props.children}
    </ColorContext.Provider>
  );
}
