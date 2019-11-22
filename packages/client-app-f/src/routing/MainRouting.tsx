import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROUTER_ENDPOINTS } from './RouterEndpoints';
import { useRouter, useAppUserState } from '@foretell/shared';
import Dashboard from '../pages/Dashboard/Dashboard';
import EnableNotifications, { NOTIFICATIONS_KEY } from '../pages/EnableNotifications/EnableNotifications';
import AdvisorBalance from '../pages/AdvisorBalance/AdvisorBalance';
import AdvisorEditProfile from '../pages/AdvisorEditProfile/AdvisorEditProfile';

const MainRouting = () => {
  const { history, location } = useRouter();
  const { appUser } = useAppUserState();
  // TODO: Replace by checking is web push notifications allowed
  if (
    location.pathname !== ROUTER_ENDPOINTS.ENABLE_NOTIFICATIONS &&
    localStorage.getItem(NOTIFICATIONS_KEY) === 'true'
  ) {
    history.push(ROUTER_ENDPOINTS.ENABLE_NOTIFICATIONS);
    return null;
  }
  return (
    <Switch>
      <Route exact path={ROUTER_ENDPOINTS.ENABLE_NOTIFICATIONS} component={EnableNotifications} />
      <Route exact path={ROUTER_ENDPOINTS.DASHBOARD} component={Dashboard} />
      {appUser.id ? (
        <Switch>
          <Route exact path={ROUTER_ENDPOINTS.ADVISOR_BALANCE} component={AdvisorBalance} />
          <Route exact path={ROUTER_ENDPOINTS.ADVISOR_EDIT_PROFILE} component={AdvisorEditProfile} />
          <Redirect to={ROUTER_ENDPOINTS.DASHBOARD} component={Dashboard} />
        </Switch>
      ) : null}
      <Redirect to={ROUTER_ENDPOINTS.DASHBOARD} component={Dashboard} />
    </Switch>
  );
};

export default MainRouting;
