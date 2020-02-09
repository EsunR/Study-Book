import React, { useState, useMemo } from "react";

function ChildComponent(props) {
  const { time1, time2 } = props;

  function parseTime(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date
      .toJSON()
      .substr(0, 19)
      .replace("T", " ");
  }

  //IIFE 函数获取结果
  // const parsedTime1 = (() => {
  //   console.log("parsing time1");
  //   return parseTime(time1);
  // })();

  // const parsedTime2 = (() => {
  //   console.log("parsing time2");
  //   return parseTime(time2);
  // })();

  const parsedTime1 = useMemo(() => {
    console.log("parsing time1");
    return parseTime(time1);
  }, [time1]);

  const parsedTime2 = useMemo(() => {
    console.log("parsing time2");
    return parseTime(time2);
  }, [time2]);

  return (
    <>
      <div>{parsedTime1}</div>
      <div>{parsedTime2}</div>
    </>
  );
}

function UseMemo() {
  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setTime1(new Date().getTime());
        }}
      >
        获取 time1
      </button>
      <button
        onClick={() => {
          setTime2(new Date().getTime());
        }}
      >
        获取 time2
      </button>
      <ChildComponent time1={time1} time2={time2}></ChildComponent>
    </div>
  );
}

export default UseMemo;
