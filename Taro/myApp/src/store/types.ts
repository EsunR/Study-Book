export const CHANGE_LOGIN = "CHANGE_LOGIN";

export interface ChangeLoginAction {
  type: typeof CHANGE_LOGIN;
  payload: boolean;
}

export type ActionTypes = ChangeLoginAction;
