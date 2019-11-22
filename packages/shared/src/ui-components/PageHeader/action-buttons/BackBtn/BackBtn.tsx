import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from '../../../../hooks/useRouter';
// import { ReactComponent as Icon } from '../../../../assets/svg_icons/back_btn.svg';
// import { useRouter } from '../../../../hooks/useRouter';

const BackBtn = () => {
  const { history } = useRouter();
  // const history = useHistory();
  // const location = useLocation();
  // console.log(history);
  useLocation();

  const handleClick = () => {
    history.goBack();
  };
  return (
    <button className="page_header_action" onClick={handleClick}>
      {/* <Icon width={10} height={22} /> */}
    </button>
  );
};

export default BackBtn;
