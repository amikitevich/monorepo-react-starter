import { hasAuthRole, useAppUserState, useRouter, useGUIDispatch } from '@foretell/shared';
import { ROUTER_ENDPOINTS } from '../../routing/RouterEndpoints';

export function useOpenAppUserProfile() {
  const { appUser } = useAppUserState();
  const dispatch = useGUIDispatch();
  const { history } = useRouter();
  return hasAuthRole(appUser.role)
    ? () => history.push(ROUTER_ENDPOINTS.ADVISOR_EDIT_PROFILE)
    : e => {
        e.stopPropagation();
        dispatch({ type: 'OPEN_LOGIN' });
      };
}
