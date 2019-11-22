import React, { Dispatch } from 'react';
import { Action } from '../interfaces';

export interface GUIState {
  menu: {
    open: boolean;
  };
  loginModal: {
    show: boolean;
  };
}

const defaultState: GUIState = {
  menu: {
    open: false
  },
  loginModal: {
    show: false
  }
};
const GUIStateContext = React.createContext(defaultState);
const GUIDispatchContext = React.createContext(null);

function GUIReducer(state: GUIState, action: Action): GUIState {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return { ...state, menu: { open: !state.menu.open } };
    }
    case 'OPEN_LOGIN': {
      return { ...state, loginModal: { show: true } };
    }
    case 'CLOSE_LOGIN': {
      return { ...state, loginModal: { show: false } };
    }
    case 'CLOSE_LOGIN_AND_MENU': {
      return { ...state, loginModal: { show: false }, menu: { open: false } };
    }
    default: {
      console.log(`Unhandled action type: ${action.type}`);
      //throw new Error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

function GUIProvider({ children, LoginModal }: { children: JSX.Element; LoginModal: any }) {
  const [state, dispatch] = React.useReducer(GUIReducer, defaultState);
  return (
    <GUIStateContext.Provider value={state}>
      <GUIDispatchContext.Provider value={dispatch}>
        {children}
        {state.loginModal.show ? <LoginModal GUIDispatch={dispatch} /> : null}
      </GUIDispatchContext.Provider>
    </GUIStateContext.Provider>
  );
}

function useGUIState(): GUIState {
  const context: GUIState = React.useContext(GUIStateContext);
  if (context === undefined) {
    throw new Error('useGUIState must be used within a GUIProvider');
  }
  return context;
}

function useGUIDispatch() {
  const context = React.useContext(GUIDispatchContext);
  if (context === undefined) {
    throw new Error('useGUIDispatch must be used within a GUIProvider');
  }
  return context as Dispatch<Action>;
}

export { GUIProvider, useGUIState, useGUIDispatch };
