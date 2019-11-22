import React from 'react';
import { ReactComponent as Icon } from '../../../../assets/svg_icons/burger.svg';
import { useGUIDispatch } from '../../../../providers/GUIProvider';

const OpenMenuHamburger = () => {
  const dispatch = useGUIDispatch();
  const handleClick = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };
  return (
    <button className="page_header_action" onClick={handleClick}>
      <Icon />
    </button>
  );
};

export default OpenMenuHamburger;
