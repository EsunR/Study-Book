export interface SystemState {
  login: boolean;
}

export interface State {
  system: SystemState;
}

const initialState: State = {
  system: {
    login: false,
  },
};

export default initialState;
