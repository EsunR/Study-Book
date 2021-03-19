import { Reducer } from "redux";
import { initState } from "./initState";
import { CardListState, CardListStoreAction } from "./type";

const reducer: Reducer<CardListState, CardListStoreAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case "UPDATE_PICKED_CARD_ID":
      return {
        ...state,
        pickedCardId: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducer;
