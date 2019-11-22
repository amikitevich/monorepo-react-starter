import React from 'react';
import cn from 'classnames';
import styles from './AppUserMenuItem.module.scss';
import { useOpenAppUserProfile } from '../../hooks/useOpenAppUserProfile';
import { ReactComponent as Arrow } from '../../../assets/svg_icons/go_arrorw.svg';
import { ReactComponent as EmptyAvatar } from '../../../assets/svg_icons/empty_avatar.svg';
import { useAppUserState } from '@foretell/shared';
const AppUserMenuItem = () => {
  const { appUser } = useAppUserState();
  const openProfile = useOpenAppUserProfile();
  return (
    <button className={cn('flat_btn', styles.wrapper)} onClick={openProfile}>
      <div className={styles.avatar}>
        {appUser.photoUrl ? <img src={appUser.photoUrl} alt="Profile Avatar" /> : <EmptyAvatar />}
      </div>
      <div className={styles.app_user_name}>{appUser.id ? appUser.name : 'Sign up or Log in'}</div>
      <div className={styles.go_icon}>
        <Arrow />
      </div>
    </button>
  );
};

export default AppUserMenuItem;
