import { createContext, Dispatch } from 'react';
import {
  ShippingMachineScreenAction,
  ShippingMachineScreenState,
} from './reducer';

export const defaultState: ShippingMachineScreenState = {
  machineList: [],
  // activeMachineIds: [],
  activeHeadId: undefined,
};

const ShippingMachineScreenContext = createContext<{
  state: ShippingMachineScreenState;
  dispatch: Dispatch<ShippingMachineScreenAction>;
}>({ state: defaultState, dispatch: () => {} });

export default ShippingMachineScreenContext;
