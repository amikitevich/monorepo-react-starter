import { ReactElement, Key, ReactNode } from 'react';

declare module '@fotetell' {
  interface BackBtn extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
}
