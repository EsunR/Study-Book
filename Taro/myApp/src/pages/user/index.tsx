import BmButton from "@/components/Button";
import { changeLogin } from "@/store/actions";
import { State } from "@/store/initialState";
import { View, Text } from "@tarojs/components";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserCenterIndex: React.FC<any> = () => {
  const login = useSelector<State>((state) => state.system.login);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <Fragment>
      <View>
        <Text>用户中心</Text>
      </View>
      <View>
        <Text>当前登录状态：{login ? "已登录" : "未登录"}</Text>
      </View>

      <BmButton
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => {
          dispatch(changeLogin(true));
        }}
      >
        用户登录
      </BmButton>

      <BmButton
        style={{ marginTop: 20 }}
        onClick={() => {
          dispatch(changeLogin(false));
        }}
      >
        用户注销
      </BmButton>
    </Fragment>
  );
};

export default UserCenterIndex;
