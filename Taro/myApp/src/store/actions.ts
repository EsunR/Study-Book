import { ChangeLoginAction, CHANGE_LOGIN } from "./types";

export const changeLogin = (value: boolean): ChangeLoginAction => ({
  type: CHANGE_LOGIN,
  payload: value,
});
