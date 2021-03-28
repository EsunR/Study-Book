import React, { useContext } from "react";
import { ColorContext } from "../color";

function ShowArea() {
  const { state } = useContext(ColorContext);
  return <div style={{ color: state.color }}>字体的颜色为 {state.color}</div>;
}

export default ShowArea;
