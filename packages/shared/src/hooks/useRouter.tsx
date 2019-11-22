import { useContext } from 'react';
import { __RouterContext } from 'react-router-dom';

export function useRouter() {
  return useContext(__RouterContext) as any;
}
