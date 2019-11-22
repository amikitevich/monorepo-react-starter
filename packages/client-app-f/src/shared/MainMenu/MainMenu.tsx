import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MainMenu.module.scss';
import AppUserMenuItem from './AppUserMenuItem/AppUserMenuItem';
import { ROUTER_ENDPOINTS } from '../../routing/RouterEndpoints';
import { useRouter, useGUIDispatch, useGUIState } from '@foretell/shared';

function scrollBoundaries(el) {
  let prevTouch;
  const saveTouchStart = e => {
    prevTouch = e.changedTouches[0];
  };
  const preventTouchMove = e => {
    if (!prevTouch) {
      return;
    }
    // Element already scrolled to top && we are trying to scroll to top
    if (el.scrollTop <= 0 && prevTouch.pageY <= e.changedTouches[0].pageY) {
      e.preventDefault();
      return;
    }
    // Element already scrolled to bottom && we are trying to scroll to bottom
    if (el.scrollTop + el.clientHeight >= el.scrollHeight && prevTouch.pageY > e.changedTouches[0].pageY) {
      e.preventDefault();
    }
  };
  const allowTouchScrollOnlyForElement = () => {
    document.addEventListener('touchstart', saveTouchStart, { passive: false });
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
  };
  const removeBoundaries = () => {
    document.removeEventListener('touchstart', saveTouchStart);
    document.removeEventListener('touchmove', preventTouchMove);
  };
  return {
    removeBoundaries,
    setBoundaries: allowTouchScrollOnlyForElement
  };
}

const MainMenu: React.FC = () => {
  const menuRef = React.useRef();
  const { location } = useRouter();
  const { menu } = useGUIState();
  const dispatch = useGUIDispatch();
  React.useLayoutEffect(() => {
    if (!menu.open) return;
    const { setBoundaries, removeBoundaries } = scrollBoundaries(menuRef.current);
    setBoundaries();
    return () => {
      removeBoundaries();
    };
  }, [menu.open]);
  const getClass = (endpoint: string) => cn({ [styles.current]: location.pathname === endpoint });
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };
  return (
    <aside className={cn(styles.menu_wrapper, { [styles.opened]: menu.open })} ref={menuRef} onClick={handleClose}>
      <div className={styles.menu}>
        <AppUserMenuItem />
        <nav>
          <ul className={styles.navigation}>
            <li>
              <div className="divider" />
            </li>
            <li className={getClass(ROUTER_ENDPOINTS.DASHBOARD)}>
              <Link to={ROUTER_ENDPOINTS.DASHBOARD}>Dashboard</Link>
            </li>
            <li className={getClass(ROUTER_ENDPOINTS.ADVISOR_BALANCE)}>
              <Link to={ROUTER_ENDPOINTS.ADVISOR_BALANCE}>Balance</Link>
            </li>

            <li className={styles.spacer} />
            <li className={getClass(ROUTER_ENDPOINTS.ADVISOR_CUSTOMER_SUPPORT)}>
              <Link to={ROUTER_ENDPOINTS.ADVISOR_CUSTOMER_SUPPORT}>Customer Support</Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MainMenu;
