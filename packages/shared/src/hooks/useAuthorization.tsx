import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AppUserRoleEnum, useAppUserDispatch } from '../providers/AppUserProvider';

const USER_PROFILE_QUERY = gql`
  query Viewer {
    viewer {
      xsrfToken
      scopes {
        user {
          userProfile {
            id
            authType
            email
            gender
            name
            timezone
          }
        }
      }
    }
  }
`;

export function useAuthorization() {
  const dispatchUser = useAppUserDispatch();
  const { loading, data } = useQuery(USER_PROFILE_QUERY, {
    skip: !localStorage.getItem('X-XSRF-TOKEN')
  });
  if (loading) return false;
  if (data) {
    const user = data.viewer.scopes.user.userProfile;
    localStorage.setItem('X-XSRF-TOKEN', data.viewer.xsrfToken);
    dispatchUser({
      type: 'UPDATE',
      payload: {
        id: user.id,
        authType: user.authType,
        email: user.email,
        gender: user.gender,
        name: user.name,
        photoId: user.photoId,
        timezone: user.timezone,
        role: [AppUserRoleEnum.client]
      }
    });
  }
  return true;
}
