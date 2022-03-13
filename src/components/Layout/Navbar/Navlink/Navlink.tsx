import React from 'react';
import { Link, useHistory } from 'react-router-dom';

type PropType = {
  to: string;
};

const Navlink: React.FC<PropType> = function ({ children, to }) {
  const history = useHistory();

  return (
    <Link
      className={`${
        history.location.pathname.includes(to) ? 'active ' : ''
      }invisible-link`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Navlink;
