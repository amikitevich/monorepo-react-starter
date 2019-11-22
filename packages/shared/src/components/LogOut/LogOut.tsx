import React from 'react';
import styles from './LogOut.module.scss';
import cn from 'classnames';
import { ReactComponent as Icon } from '../../assets/svg_icons/logout_icon.svg';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useAppUserDispatch } from '../../providers/AppUserProvider';
import { useRouter } from '../../hooks/useRouter';
import { GuidGeneratorService } from '../../utils/network';

const LOGOUT_USER_MUTATION = gql`
  mutation RemoveAccessToken($input: RemoveAccessTokenMutationInput!) {
    removeAccessToken(input: $input) {
      errors {
        key
        message
      }
    }
  }
`;

const LogOut = ({ redirectTo }: { redirectTo: string }) => {
  const [isLogOuting, setIsLogOuting] = React.useState(false);
  const [mutate] = useMutation(LOGOUT_USER_MUTATION);
  const dispatchUser = useAppUserDispatch();
  const { history } = useRouter();
  const handleLogOut = () => {
    if (isLogOuting) return;
    setIsLogOuting(true);
    mutate({
      variables: {
        input: {
          clientMutationId: GuidGeneratorService()
        }
      }
    }).then(response => {
      if (response.data.removeAccessToken.errors) {
        // TODO: Handle unAuth errors
      }
      setIsLogOuting(false);
      localStorage.removeItem('X-XSRF-TOKEN');
      history.push(redirectTo);
      dispatchUser({ type: 'LOGOUT' });
    });
  };
  return (
    <button className={cn('flat_btn', styles.logout_btn)} onClick={handleLogOut}>
      <Icon />
      <span className="a">Logout</span>
    </button>
  );
};

export default LogOut;
