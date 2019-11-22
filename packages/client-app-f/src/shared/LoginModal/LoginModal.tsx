import React, { Dispatch } from 'react';
import styles from './LoginModal.module.scss';
import { Action, AppUserRoleEnum, GuidGeneratorService, useAppUserDispatch, InPortal } from '@foretell/shared';
import cn from 'classnames';
import { ReactComponent as Icon } from '../../assets/svg_icons/close.svg';
import { ReactComponent as AppleIcon } from '../../assets/svg_icons/apl_logo.svg';
import { ReactComponent as GoogleIcon } from '../../assets/svg_icons/g_logo.svg';
import { ReactComponent as FBookIcon } from '../../assets/svg_icons/fb_logo.svg';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

type LoginModalProps = {
  GUIDispatch: Dispatch<Action>;
};

const GENERATE_ACCESS_TOKEN_MUTATION = gql`
  mutation GenerateAccessToken($input: GenerateAccessTokenMutationInput!) {
    generateAccessToken(input: $input) {
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
              photoId
              timezone
            }
          }
        }
      }
      errors {
        key
        message
      }
    }
  }
`;

const LoginModal = ({ GUIDispatch }: LoginModalProps) => {
  const [mutate] = useMutation(GENERATE_ACCESS_TOKEN_MUTATION);
  const [isLoading, setIsLoading] = React.useState(false);
  const [manualRender, setManualRerender] = React.useState(0);
  //@ts-ignore
  const [isGoogleReady, setIsGoogleReady] = React.useState(!!window.googleApiAuth2);
  //@ts-ignore
  const [isFBReady, setIsFBReady] = React.useState(!!window.fbApiInit);
  const dispatchUser = useAppUserDispatch();
  const googleBtnRef = React.useRef();
  const handleGoogleClick = () => {
    if (!isGoogleReady) return;
    setIsLoading(true);
  };
  const handleClose = () => {
    GUIDispatch({ type: 'CLOSE_LOGIN_AND_MENU' });
  };

  const handleAuthorizeSuccess = userResponse => {
    setIsLoading(false);
    // TODO: Error handling (understandable messages)
    const user = userResponse.generateAccessToken.viewer.scopes.user.userProfile;
    localStorage.setItem('X-XSRF-TOKEN', userResponse.generateAccessToken.viewer.xsrfToken);
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
    GUIDispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleFBLogin = () => {
    if (!isFBReady) return;
    setIsLoading(true);
    //@ts-ignore
    FB.login(
      function(response) {
        if (response.authResponse && response.authResponse.accessToken) {
          mutate({
            variables: {
              input: {
                clientMutationId: GuidGeneratorService(),
                authType: 'f',
                token: response.authResponse.accessToken
              }
            }
          })
            .then(({ data: userResponse }) => {
              handleAuthorizeSuccess(userResponse);
            })
            .catch(() => setIsLoading(false));
        } else {
          setIsLoading(false);
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  React.useLayoutEffect(() => {
    //@ts-ignore
    if (!googleBtnRef.current || !window.googleApiAuth2) return;
    //@ts-ignore
    window.googleApiAuth2.attachClickHandler(
      googleBtnRef.current,
      {},
      function(response) {
        mutate({
          variables: {
            input: {
              clientMutationId: GuidGeneratorService(),
              authType: 'g',
              token: response.getAuthResponse().id_token
            }
          }
        })
          .then(({ data: userResponse }) => {
            handleAuthorizeSuccess(userResponse);
          })
          .catch(() => setIsLoading(false));
      },
      function(error) {
        setIsLoading(false);
        console.log('User cancelled login or did not fully authorize.', error);
      }
    );
    // eslint-disable-next-line
  }, [dispatchUser, GUIDispatch, isGoogleReady]);

  React.useEffect(() => {
    if (isFBReady) return;
    let timeout;
    //@ts-ignore
    if (!window.fbApiInit) {
      setTimeout(() => setManualRerender(manualRender + 1), 250);
    } else {
      setIsFBReady(true);
    }
    return () => clearTimeout(timeout);
    //@ts-ignore
  }, [isFBReady, manualRender]);

  React.useEffect(() => {
    if (isGoogleReady) return;
    let timeout;
    //@ts-ignore
    if (!window.googleApiAuth2) {
      setTimeout(() => setManualRerender(manualRender + 1), 350);
    } else {
      setIsGoogleReady(true);
    }
    return () => clearTimeout(timeout);
    //@ts-ignore
  }, [isGoogleReady, manualRender]);
  return (
    <InPortal>
      <div className={cn('hover_page', styles.wrapper)}>
        <button className={cn('flat_btn', styles.close_btn)} onClick={() => GUIDispatch({ type: 'CLOSE_LOGIN' })}>
          <Icon />
        </button>
        <section className={styles.content}>
          <h2 className={styles.title}>Sign up or Log in</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <li className={styles.fb} onClick={handleFBLogin}>
                <FBookIcon />
                <span>Continue with Facebook</span>
              </li>
              <li className={styles.google} onClick={handleGoogleClick} ref={googleBtnRef}>
                <GoogleIcon />
                <span>Continue with Google</span>
              </li>
              <li className={styles.apple} onClick={handleGoogleClick}>
                <AppleIcon />
                <span>Continue with Apple</span>
              </li>
            </ul>
          )}
          <div className={styles.footer}>
            By signing up you agree to our{' '}
            <a
              href="https://foretell.net/terms-of-use/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              href="https://foretell.net/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
            >
              Privacy Policy
            </a>
          </div>
        </section>
      </div>
    </InPortal>
  );
};

export default LoginModal;
