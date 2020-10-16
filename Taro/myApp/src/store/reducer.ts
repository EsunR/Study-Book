import initialState, { State } from "./initialState";
import { ActionTypes } from "./types";

const clone = <T>(value: T): T => {
  if (typeof value === "object") {
    return JSON.parse(JSON.stringify(value));
  } else {
    return value;
  }
};

export default (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case "CHANGE_LOGIN":
      const cpState = clone(state);
      cpState.system.login = action.payload;
      return cpState;
    default:
      return state;
  }
};
