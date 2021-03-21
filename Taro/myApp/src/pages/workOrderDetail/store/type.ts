import { Action } from "redux";

export type CardListState = {
  pickedCardId: any;
};

export type ActionType = "UPDATE_PICKED_CARD_ID";

export interface CardListStoreAction extends Action {
  type: ActionType;
  payload: any;
}
