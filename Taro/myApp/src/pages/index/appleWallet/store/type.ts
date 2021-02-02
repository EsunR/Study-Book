import { Action } from "redux";

export type CardListState = {
  pickedCardId: any;
  expandedOrderId: any; // 展开的订单ID
};

export type ActionType = "UPDATE_PICKED_CARD_ID" | "UPDATE_EXPANDED_ORDER_ID";

export interface CardListStoreAction extends Action {
  type: ActionType;
  payload: any;
}
