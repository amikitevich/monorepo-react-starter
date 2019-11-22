import React from 'react';

export type ChildrenOnlyProps = {
  children: React.ReactNode;
};
export enum AppUserRoleEnum {
  guestClient = 'guestClient',
  guestAdviser = 'guestAdviser',
  client = 'client',
  adviser = 'adviser',
  admin = 'admin'
}

export interface Action {
  type: string;
  payload?: any;
}

export interface AppUser {
  id: '';
  name: string;
  email: string;
  photoUrl?: string;
  authType: 'f' | 'g';
  gender: 'm';
  photoId?: '';
  timezone: '';
  role: AppUserRoleEnum[];
}
export interface AppUserState {
  appUser: AppUser;
}
export interface FBLoginStatusResp {
  authResponse: {
    accessToken: string;
    userID: string;
    expiresIn: number;
    signedRequest: string;
    data_access_expiration_time: number;
  };
  status: 'connected' | 'not_authorized' | 'unknown';
}
