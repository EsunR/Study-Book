import React from 'react';
import { IMachineListItem } from '../components/MachineListView';

export interface ShippingMachineScreenState {
  machineList: IMachineListItem[]; // 定型机当前的基础信息
  // activeMachineIds: any[]; // 当前面板展示的定型机
  activeHeadId: any | undefined; // 头一个显示为 active 状态的定型机 id
}

export type ActionType = 'UPDATE_MACHINE_LIST' | 'UPDATE_ACTIVE_HEAD_ID';

export interface ShippingMachineScreenAction {
  type: ActionType;
  payload: any;
}

export const reducer: React.Reducer<
  ShippingMachineScreenState,
  ShippingMachineScreenAction
> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MACHINE_LIST':
      return {
        ...state,
        machineList: action.payload,
      };
    // case 'UPDATE_ACTIVE_MACHINE_IDS':
    //   return {
    //     ...state,
    //     activeMachineIds: action.payload,
    //   };
    case 'UPDATE_ACTIVE_HEAD_ID':
      return {
        ...state,
        activeHeadId: action.payload,
      };
    default:
      return state;
  }
};
