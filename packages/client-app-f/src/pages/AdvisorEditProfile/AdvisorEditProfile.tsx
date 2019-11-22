import React from 'react';
import styles from './AdvisorEditProfile.module.scss';
import cn from 'classnames';

import { ROUTER_ENDPOINTS } from '../../routing/RouterEndpoints';
import { BackBtn, LogOut, PageHeader } from '@foretell/shared';

const AdvisorEditProfile = () => {
  return (
    <div className={cn('page white_back', styles.wrapper)}>
      <PageHeader left={<BackBtn />}>Edit Profile</PageHeader>
      <div className={styles.form_wrapper}>Edit Form</div>
      <div>
        <LogOut redirectTo={ROUTER_ENDPOINTS.DASHBOARD} />
        <div className={styles.terms}>
          <a href="https://foretell.net/terms-of-use/" target="_blank" rel="noopener noreferrer">
            Terms of Use
          </a>
          {', '}
          <a href="https://foretell.net/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvisorEditProfile;
