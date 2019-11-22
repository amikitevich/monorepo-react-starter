import React, { Dispatch } from 'react';
import { Action, AppUserRoleEnum, AppUserState } from '../interfaces';

export const authRole = [AppUserRoleEnum.client, AppUserRoleEnum.adviser, AppUserRoleEnum.admin];
export const hasAuthRole = (userRoles: AppUserRoleEnum[]) => userRoles.some(role => authRole.includes(role));
const defaultState: AppUserState = {
  appUser: {
    id: '',
    name: '',
    email: '',
    authType: 'f',
    gender: 'm',
    timezone: '',
    photoUrl: '',
    role: [AppUserRoleEnum.guestClient]
  }
};
const AppUserStateContext = React.createContext(defaultState);
const AppUserDispatchContext = React.createContext(null);

function appUserReducer(state: AppUserState, action: Action) {
  switch (action.type) {
    case 'UPDATE': {
      return { appUser: { ...action.payload } };
    }
    case 'LOGOUT': {
      return { ...defaultState };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppUserProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = React.useReducer(appUserReducer, defaultState);
  return (
    <AppUserStateContext.Provider value={state}>
      <AppUserDispatchContext.Provider value={dispatch}>{children}</AppUserDispatchContext.Provider>
    </AppUserStateContext.Provider>
  );
}

function useAppUserState(): AppUserState {
  const context: AppUserState = React.useContext(AppUserStateContext);
  if (context === undefined) {
    throw new Error('useAppUserState must be used within a AppUserProvider');
  }
  return context;
}

function useAppUserDispatch() {
  const context = React.useContext(AppUserDispatchContext);
  if (context === undefined) {
    throw new Error('useAppUserDispatch must be used within a AppUserProvider');
  }
  return context as Dispatch<Action>;
}

export { AppUserProvider, useAppUserState, useAppUserDispatch, AppUserRoleEnum };
