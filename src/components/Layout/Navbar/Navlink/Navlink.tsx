import React from 'react';
import { Link, useHistory } from 'react-router-dom';

type PropType = {
  to: string;
  checkUrl?: string;
};

const Navlink: React.FC<PropType> = function ({ children, checkUrl, to }) {
  const history = useHistory();

  if (!checkUrl) checkUrl = to;

  return (
    <Link
      className={`${
        history.location.pathname.startsWith(checkUrl) ? 'active ' : ''
      }invisible-link`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Navlink;
