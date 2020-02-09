import React, { useContext } from "react";
import { ColorContext, UPDATE_COLOR } from "../color";

function Buttons() {
  const { dispatch } = useContext(ColorContext);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, payload: "red" });
        }}
      >
        红色
      </button>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, payload: "yellow" });
        }}
      >
        黄色
      </button>
    </div>
  );
}

export default Buttons;
